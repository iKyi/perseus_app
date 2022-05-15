import { Grid, Typography } from "@mui/material";
import { MintCountdown } from "./MintCountdown";
import * as anchor from "@project-serum/anchor";
import { toDate } from "hooks/mintConnectionActionsUtils";
import { CandyMachineAccount } from "providers/Solana/services/candyMachine";

const getCountdownDate = (
  candyMachine: CandyMachineAccount
): Date | undefined => {
  if (
    candyMachine.state.isActive &&
    candyMachine.state.endSettings?.endSettingType.date
  ) {
    return toDate(candyMachine.state.endSettings.number);
  }

  return toDate(
    candyMachine.state.goLiveDate
      ? candyMachine.state.goLiveDate
      : candyMachine.state.isPresale
      ? new anchor.BN(new Date().getTime() / 1000)
      : undefined
  );
};

export type CandyMachineBasedStatusPropsType = {
  candyMachine: any;
  isActive: boolean;
  endDate: Date | undefined;
  toggleMintButton: () => void;
  isPresale: boolean;
};

const CandyMachineBasedStatus: React.VFC<CandyMachineBasedStatusPropsType> = ({
  candyMachine,
  endDate,
  isActive,
  toggleMintButton,
  isPresale,
}) => {
  // *************** RENDER *************** //
  return (
    <>
      {candyMachine && (
        <Grid container direction="row" justifyContent="center" wrap="nowrap">
          <Grid item xs={5}>
            {isActive && endDate && Date.now() < endDate.getTime() ? (
              <>
                <MintCountdown
                  key="endSettings"
                  date={getCountdownDate(candyMachine)}
                  style={{ justifyContent: "flex-end" }}
                  status="COMPLETED"
                  onComplete={toggleMintButton}
                />
                <Typography
                  variant="caption"
                  align="center"
                  display="block"
                  style={{ fontWeight: "bold" }}
                >
                  TO END OF MINT
                </Typography>
              </>
            ) : (
              <>
                <MintCountdown
                  key="goLive"
                  date={getCountdownDate(candyMachine)}
                  style={{ justifyContent: "flex-end" }}
                  status={
                    candyMachine?.state?.isSoldOut ||
                    (endDate && Date.now() > endDate.getTime())
                      ? "COMPLETED"
                      : isPresale
                      ? "PRESALE"
                      : "LIVE"
                  }
                  onComplete={toggleMintButton}
                />
                {isPresale &&
                  candyMachine.state.goLiveDate &&
                  candyMachine.state.goLiveDate.toNumber() >
                    new Date().getTime() / 1000 && (
                    <Typography
                      variant="caption"
                      align="center"
                      display="block"
                      style={{ fontWeight: "bold" }}
                    >
                      UNTIL PUBLIC MINT
                    </Typography>
                  )}
              </>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CandyMachineBasedStatus;
