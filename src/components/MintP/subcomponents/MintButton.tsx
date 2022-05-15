import { GatewayStatus, useGateway } from "@civic/solana-gateway-react";
import { useEffect, useState, useRef } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  findGatewayToken,
  getGatewayTokenAddressForOwnerAndGatekeeperNetwork,
  onGatewayTokenChange,
  removeAccountChangeListener,
} from "@identity.com/solana-gateway-ts";
import { Button, CircularProgress, styled } from "@mui/material";
import { CandyMachineAccount } from "providers/Solana/services/candyMachine";
import useIsUserInWhitelist from "hooks/useIsUserInWhitelist";
import useDisplayMintState from "hooks/useDisplayMintState";
import { IMintDataType } from "../LuanchpadPageInner";

export const CTAButton = styled(Button)(({ theme }) => ({
  width: "100%",
  minHeight: "40px",
  marginTop: "10px",
  marginBottom: " 5px",
  backgroundColor: "#000",
  color: theme.palette.error.main,
  border: `1px solid ${theme.palette.error.main}`,
  fontSize: "16px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
  },
}));

export const MintButton = ({
  onMint,
  candyMachine,
  isMinting,
  setIsMinting,
  isActive,
  data: pageData,
}: {
  onMint: () => Promise<void>;
  candyMachine?: CandyMachineAccount;
  isMinting: boolean;
  setIsMinting: (val: boolean) => void;
  isActive: boolean;
  data: IMintDataType;
}) => {
  const { strapiState } = useDisplayMintState(pageData);
  const { publicMint } = pageData;
  const isUserInWhitelist = useIsUserInWhitelist(pageData);

  const cannotMintBecauseNotOnWhitelist = !publicMint && !isUserInWhitelist;

  const wallet = useWallet();
  const connection = useConnection();
  const [verified, setVerified] = useState(false);
  const { requestGatewayToken, gatewayStatus } = useGateway();
  const [webSocketSubscriptionId, setWebSocketSubscriptionId] = useState(-1);
  const [clicked, setClicked] = useState(false);

  const saleEnded = strapiState === "ended";
  const soldOut = strapiState === "soldOut";
  const showTBA = strapiState === "showTba";

  const getMintButtonContent = () => {
    if (candyMachine?.state.isSoldOut || soldOut) {
      return "SOLD OUT";
    } else if (isMinting) {
      return <CircularProgress />;
    } else if (
      candyMachine?.state.isPresale ||
      candyMachine?.state.isWhitelistOnly
    ) {
      return "WHITELIST MINT";
    } else if (cannotMintBecauseNotOnWhitelist) {
      return "WALLET NOT WHITELISTED";
    } else if (saleEnded) {
      return "Ended";
    } else if (showTBA) {
      return "TBA";
    }

    return "MINT NOW";
  };

  useEffect(() => {
    const mint = async () => {
      await removeAccountChangeListener(
        connection.connection,
        webSocketSubscriptionId
      );
      await onMint();

      setClicked(false);
      setVerified(false);
    };
    if (verified && clicked) {
      mint();
    }
  }, [
    verified,
    clicked,
    connection.connection,
    onMint,
    webSocketSubscriptionId,
  ]);

  const previousGatewayStatus = usePrevious(gatewayStatus);
  useEffect(() => {
    const fromStates = [
      GatewayStatus.NOT_REQUESTED,
      GatewayStatus.REFRESH_TOKEN_REQUIRED,
    ];
    const invalidToStates = [...fromStates, GatewayStatus.UNKNOWN];
    if (
      fromStates.find((state) => previousGatewayStatus === state) &&
      !invalidToStates.find((state) => gatewayStatus === state)
    ) {
      setIsMinting(true);
    }
    // console.log("change: ", gatewayStatus);
  }, [setIsMinting, previousGatewayStatus, gatewayStatus]);

  const disabledButton =
    isMinting ||
    !isActive ||
    cannotMintBecauseNotOnWhitelist ||
    saleEnded ||
    soldOut ||
    showTBA;

  return (
    <CTAButton
      disabled={disabledButton}
      onClick={async () => {
        if (disabledButton) {
          return null;
        }
        if (candyMachine?.state.isActive && candyMachine?.state.gatekeeper) {
          const network =
            candyMachine.state.gatekeeper.gatekeeperNetwork.toBase58();
          if (network === "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6") {
            if (gatewayStatus === GatewayStatus.ACTIVE) {
              await onMint();
            } else {
              // setIsMinting(true);
              await requestGatewayToken();
              console.log("after: ", gatewayStatus);
            }
          } else if (
            network === "ttib7tuX8PTWPqFsmUFQTj78MbRhUmqxidJRDv4hRRE" ||
            network === "tibePmPaoTgrs929rWpu755EXaxC7M3SthVCf6GzjZt"
          ) {
            setClicked(true);
            const gatewayToken = await findGatewayToken(
              connection.connection,
              wallet.publicKey!,
              candyMachine.state.gatekeeper.gatekeeperNetwork
            );

            if (gatewayToken?.isValid()) {
              await onMint();
            } else {
              window.open(
                `https://verify.encore.fans/?gkNetwork=${network}`,
                "_blank"
              );

              const gatewayTokenAddress =
                await getGatewayTokenAddressForOwnerAndGatekeeperNetwork(
                  wallet.publicKey!,
                  candyMachine.state.gatekeeper.gatekeeperNetwork
                );

              setWebSocketSubscriptionId(
                onGatewayTokenChange(
                  connection.connection,
                  gatewayTokenAddress,
                  () => setVerified(true),
                  "confirmed"
                )
              );
            }
          } else {
            setClicked(false);
            throw new Error(`Unknown Gatekeeper Network: ${network}`);
          }
        } else {
          await onMint();
          setClicked(false);
        }
      }}
      variant="contained"
    >
      {getMintButtonContent()}
    </CTAButton>
  );
};

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
