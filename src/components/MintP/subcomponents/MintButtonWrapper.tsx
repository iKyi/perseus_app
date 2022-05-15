import { Box, Button } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  CandyMachineAccount,
  CANDY_MACHINE_PROGRAM,
} from "providers/Solana/services/candyMachine";
import { MintButton } from "./MintButton";
import { useAppDispatch } from "app/hooks";
import { GatewayProvider } from "@civic/solana-gateway-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { newSnackbar } from "features/global/globalSlice";
import { sendTransaction } from "providers/Solana/services/connection";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { IMintDataType } from "../LuanchpadPageInner";

export type MintButtonWrapperPropsType = {
  onMint: () => Promise<void>;
  candyMachine?: CandyMachineAccount;
  isUserMinting: boolean;
  setIsUserMinting: (val: boolean) => void;
  isActive: boolean;
  isPresale: boolean;
  isWhitelistUser: boolean;
  connection: Connection;
  rpcHost: string;
  data: IMintDataType;
};

const MintButtonWrapper: React.VFC<MintButtonWrapperPropsType> = ({
  onMint,
  candyMachine,
  isUserMinting,
  setIsUserMinting,
  isActive,
  isPresale,
  isWhitelistUser,
  connection,
  rpcHost,
  data: pageData,
}) => {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  const { setVisible: setLoginModalVisible } = useWalletModal();
  // *************** RENDER *************** //
  return (
    <>
      {!wallet.connected ? (
        <Button
          variant="outlined"
          onClick={() => setLoginModalVisible(true)}
          fullWidth
          sx={{
            mt: 2,
            py: 1.6,
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <>
          <Box>
            {candyMachine?.state.isActive &&
            candyMachine?.state.gatekeeper &&
            wallet.publicKey &&
            wallet.signTransaction ? (
              <GatewayProvider
                wallet={{
                  publicKey:
                    wallet.publicKey || new PublicKey(CANDY_MACHINE_PROGRAM),
                  //@ts-ignore
                  signTransaction: wallet.signTransaction,
                }}
                gatekeeperNetwork={
                  candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                }
                clusterUrl={rpcHost}
                handleTransaction={async (transaction: Transaction) => {
                  setIsUserMinting(true);
                  const userMustSign = transaction.signatures.find((sig) =>
                    sig.publicKey.equals(wallet.publicKey!)
                  );
                  if (userMustSign) {
                    dispatch(
                      newSnackbar({
                        id: "2223-" + Math.random(),
                        variant: "info",
                        content: "Please sign one-time Civic Pass issuance",
                      })
                    );
                    try {
                      transaction = await wallet.signTransaction!(transaction);
                    } catch (e) {
                      dispatch(
                        newSnackbar({
                          id: "222-" + Math.random(),
                          variant: "info",
                          content: "User cancelled signing",
                        })
                      );
                      // setTimeout(() => window.location.reload(), 2000);
                      setIsUserMinting(false);
                      throw e;
                    }
                  } else {
                    dispatch(
                      newSnackbar({
                        id: "22-" + Math.random(),
                        variant: "info",
                        content: "Refreshing Civic Pass",
                      })
                    );
                  }
                  try {
                    await sendTransaction(
                      connection,
                      wallet,
                      transaction,
                      [],
                      true,
                      "confirmed"
                    );
                    dispatch(
                      newSnackbar({
                        id: "solana-drop-" + Math.random(),
                        variant: "info",
                        content: "Please sign minting",
                      })
                    );
                  } catch (e) {
                    dispatch(
                      newSnackbar({
                        id: "solana-drop-" + Math.random(),
                        variant: "error",
                        content:
                          "Solana dropped the transaction, please try again",
                      })
                    );
                    console.error(e);
                    // setTimeout(() => window.location.reload(), 2000);
                    setIsUserMinting(false);
                    throw e;
                  }
                  await onMint();
                }}
                broadcastTransaction={false}
                options={{ autoShowModal: false }}
              >
                <MintButton
                  candyMachine={candyMachine}
                  isMinting={isUserMinting}
                  setIsMinting={(val) => setIsUserMinting(val)}
                  onMint={onMint}
                  isActive={isActive || (isPresale && isWhitelistUser)}
                  data={pageData}
                />
              </GatewayProvider>
            ) : (
              <MintButton
                candyMachine={candyMachine}
                isMinting={isUserMinting}
                setIsMinting={(val) => setIsUserMinting(val)}
                onMint={onMint}
                isActive={isActive || (isPresale && isWhitelistUser)}
                data={pageData}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default MintButtonWrapper;
