import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  getCandyMachineState,
  mintOneToken,
} from "providers/Solana/services/candyMachine";
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { useAppDispatch } from "app/hooks";
import { newSnackbar } from "features/global/globalSlice";
import { getAtaForMint } from "providers/Solana/services/utils";
import { toDate } from "./mintConnectionActionsUtils";

export interface IConnectionProps {
  candyMachineId: PublicKey;
  rpcHost: string;
  connection: Connection;
}

const useMintConnectionActions = (data: IConnectionProps) => {
  // *************** CONSTANTS *************** //
  const { candyMachineId, connection, rpcHost } = data;
  const txTimeoutInMilliseconds = 30000;

  const wallet = useWallet();
  const dispatch = useAppDispatch();
  // *************** STATE VALUES *************** //
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [isActive, setIsActive] = useState(false);
  const [endDate, setEndDate] = useState<Date>();
  const [itemsRemaining, setItemsRemaining] = useState<number>();
  const [isWhitelistUser, setIsWhitelistUser] = useState(false);
  const [isPresale, setIsPresale] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<anchor.BN>();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }

    if (candyMachineId) {
      try {
        const cndy = await getCandyMachineState(
          anchorWallet,
          candyMachineId,
          connection
        );
        let active =
          cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000;
        let presale = false;
        // whitelist mint?
        if (cndy?.state.whitelistMintSettings) {
          // is it a presale mint?
          if (
            cndy.state.whitelistMintSettings.presale &&
            (!cndy.state.goLiveDate ||
              cndy.state.goLiveDate.toNumber() > new Date().getTime() / 1000)
          ) {
            presale = true;
          }
          // is there a discount?
          if (cndy.state.whitelistMintSettings.discountPrice) {
            setDiscountPrice(cndy.state.whitelistMintSettings.discountPrice);
          } else {
            setDiscountPrice(undefined);
            // when presale=false and discountPrice=null, mint is restricted
            // to whitelist users only
            if (!cndy.state.whitelistMintSettings.presale) {
              cndy.state.isWhitelistOnly = true;
            }
          }
          // retrieves the whitelist token
          const mint = new anchor.web3.PublicKey(
            cndy.state.whitelistMintSettings.mint
          );
          const token = (await getAtaForMint(mint, anchorWallet.publicKey))[0];

          try {
            const balance = await connection.getTokenAccountBalance(token);
            let valid = parseInt(balance.value.amount) > 0;
            // only whitelist the user if the balance > 0
            setIsWhitelistUser(valid);
            active = (presale && valid) || active;
          } catch (e) {
            setIsWhitelistUser(false);
            // no whitelist user, no mint
            if (cndy.state.isWhitelistOnly) {
              active = false;
            }
            dispatch(
              newSnackbar({
                id: "whitelist-ballance-" + Math.random(),
                content: `${
                  (e as any)?.message
                } There was a problem fetching whitelist token balance`,
                variant: "error",
              })
            );
            console.log(e);
          }
        }
        // datetime to stop the mint?
        if (cndy?.state.endSettings?.endSettingType.date) {
          setEndDate(toDate(cndy.state.endSettings.number));
          if (
            cndy.state.endSettings.number.toNumber() <
            new Date().getTime() / 1000
          ) {
            active = false;
          }
        }
        // amount to stop the mint?
        if (cndy?.state.endSettings?.endSettingType.amount) {
          let limit = Math.min(
            cndy.state.endSettings.number.toNumber(),
            cndy.state.itemsAvailable
          );
          if (cndy.state.itemsRedeemed < limit) {
            setItemsRemaining(limit - cndy.state.itemsRedeemed);
          } else {
            setItemsRemaining(0);
            cndy.state.isSoldOut = true;
          }
        } else {
          setItemsRemaining(cndy.state.itemsRemaining);
        }

        if (cndy.state.isSoldOut) {
          active = false;
        }

        setIsActive((cndy.state.isActive = active));
        setIsPresale((cndy.state.isPresale = presale));
        setCandyMachine(cndy);
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === `Account does not exist ${candyMachineId}`) {
            dispatch(
              newSnackbar({
                id: "no-account-" + Math.random(),
                content: `Couldn't fetch candy machine state from candy machine with address: ${candyMachineId}, using rpc: ${rpcHost}! You probably typed the REACT_APP_CANDY_MACHINE_ID value in wrong in your .env file, or you are using the wrong RPC!`,
                variant: "error",
              })
            );
          } else if (e.message.startsWith("failed to get info about account")) {
            dispatch(
              newSnackbar({
                id: "no-candymachine-" + Math.random(),
                content: `Couldn't fetch candy machine state with rpc: ${rpcHost}! This probably means you have an issue with the REACT_APP_SOLANA_RPC_HOST value in your .env file, or you are not using a custom RPC!`,
                variant: "error",
              })
            );
          }
        } else {
          dispatch(
            newSnackbar({
              id: "unknown-error-" + Math.random(),
              content: `${e}`,
              variant: "error",
            })
          );
        }
        console.log(e);
      }
    } else {
      dispatch(
        newSnackbar({
          id: "no-account-" + Math.random(),
          content: `Your REACT_APP_CANDY_MACHINE_ID value in the .env file doesn't look right! Make sure you enter it in as plain base-58 address!`,
          variant: "error",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorWallet, candyMachineId, connection, rpcHost]);

  const onMint = async (
    beforeTransactions: Transaction[] = [],
    afterTransactions: Transaction[] = []
  ) => {
    try {
      setIsUserMinting(true);
      document.getElementById("#identity")?.click();
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        let mintOne = await mintOneToken(
          candyMachine,
          wallet.publicKey,
          beforeTransactions,
          afterTransactions
        );

        const mintTxId = mintOne[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            txTimeoutInMilliseconds,
            connection,
            true
          );
        }

        if (status && !status.err) {
          // manual update since the refresh might not detect
          // the change immediately
          let remaining = itemsRemaining! - 1;
          setItemsRemaining(remaining);
          setIsActive((candyMachine.state.isActive = remaining > 0));
          candyMachine.state.isSoldOut = remaining === 0;
          dispatch(
            newSnackbar({
              id: "success-mint-" + Math.random(),
              content: "Congratulations! Mint succeeded!",
              variant: "success",
            })
          );
        } else {
          dispatch(
            newSnackbar({
              id: "error-mint-" + Math.random(),
              content: "Mint failed! Please try again!",
              variant: "error",
            })
          );
        }
      }
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x137")) {
          console.log(error);
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          console.log(error);
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }
      dispatch(
        newSnackbar({
          id: `unkown-error-message-${Math.random()}`,
          content: message,
          variant: "error",
        })
      );
      // updates the candy machine state to reflect the lastest
      // information on chain
      refreshCandyMachineState();
    } finally {
      setIsUserMinting(false);
    }
  };

  const toggleMintButton = () => {
    let active = !isActive || isPresale;

    if (active) {
      if (candyMachine!.state.isWhitelistOnly && !isWhitelistUser) {
        active = false;
      }
      if (endDate && Date.now() >= endDate.getTime()) {
        active = false;
      }
    }

    if (
      isPresale &&
      candyMachine!.state.goLiveDate &&
      candyMachine!.state.goLiveDate.toNumber() <= new Date().getTime() / 1000
    ) {
      setIsPresale((candyMachine!.state.isPresale = false));
    }

    setIsActive((candyMachine!.state.isActive = active));
  };

  useEffect(() => {
    refreshCandyMachineState();
  }, [anchorWallet, candyMachineId, connection, refreshCandyMachineState]);

  return {
    isUserMinting,
    discountPrice,
    toggleMintButton,
    onMint,
    anchorWallet,
    isActive,
    endDate,
    itemsRemaining,
    candyMachine,
    setCandyMachine,
    setIsUserMinting,
    isPresale,
    isWhitelistUser,
    connection,
  };
};
export default useMintConnectionActions;
