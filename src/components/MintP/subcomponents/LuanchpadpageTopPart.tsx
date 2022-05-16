import { OpenInNew } from "@mui/icons-material";
import * as anchor from "@project-serum/anchor";
import {
  Box,
  Divider,
  Grid,
  Typography,
  Link as MUILink,
  Button,
} from "@mui/material";
import SocialList from "components/Reusable/SocialList";
import ValueBox from "components/Reusable/ValueBox";
import useMintConnectionActions from "hooks/useMintConnectionActions";
import { getStrapiMedia } from "lib/theme/media";
import { useContext, useMemo } from "react";
import InfoWhitelistBoxes from "./InfoWhitelistBoxes";
import MintButtonWrapper from "./MintButtonWrapper";
import CandyMachineBasedStatus from "./CandyMachineBasedStatus";
import useDisplayMintState from "hooks/useDisplayMintState";
import { IMintDataType } from "../LuanchpadPageInner";
import SquareBorderBox from "components/Reusable/SquareBorderBox";
import { centerFlex, flexColumn } from "utils/sxUtils";
import { StrapiContext } from "providers/StrapiPublicProvider";

export const DisplayStateBox: React.FC<{ content: string }> = ({ content }) => {
  return (
    <Box
      sx={{
        textTransform: "capitalize",
        color: "error.main",
        fontSize: "1.1rem",
        textAlign: "center",
        fontWeight: 600,
        bgcolor: `rgba(0,0,0,0.16)`,
        py: [0.7],
        px: [1, 1, 1.5],
        ...centerFlex,
      }}
    >
      {content}
    </Box>
  );
};

const TagsWhitepaperBox: React.FC<
  Pick<IMintDataType, "tags" | "whitepaperUrl">
> = ({ tags, whitepaperUrl }) => {
  const tagEntries = tags?.data?.map((item: any) => item.attributes) ?? null;

  return (
    <Box sx={{ mt: "auto", pt: [2, 2, 3] }}>
      <Grid container spacing={[1.5, 1.5, 2.5]}>
        {tagEntries && tagEntries.length > 0
          ? tagEntries.map((tagEntry: any) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={tagEntry.name}>
                <Box
                  sx={{
                    py: [0.7, 0.7, 0.9],
                    px: 1.5,
                    textAlign: "center",
                    textTransform: "uppercase",
                    border: "1px solid",
                    borderColor: `rgba(255,255,255,0.55)`,
                    color: "primary.main",
                    fontSize: "0.85rem",
                    lineHeight: 1,
                    ...centerFlex,
                  }}
                >
                  {tagEntry.name}
                </Box>
              </Grid>
            ))
          : null}
        {whitepaperUrl && (
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{ ml: ["undefined", "undefined", "auto"] }}
          >
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <MUILink
                underline="hover"
                component={Button}
                href={whitepaperUrl}
                target="_blank"
                rel="noopener"
                startIcon={<OpenInNew />}
                sx={{
                  color: "common.white",
                }}
              >
                WHITEPAPER
              </MUILink>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const HeaderPart: React.FC<{
  data: IMintDataType;
  candyMachine: any;
  isActive: boolean;
  endDate: Date | undefined;
  toggleMintButton: () => void;
  isPresale: boolean;
}> = ({
  data,
  candyMachine,
  isActive,
  endDate,
  toggleMintButton,
  isPresale,
}) => {
  const { socials } = useContext(StrapiContext);
  const { twitter, discord } = socials ?? {};

  const { displayBoxContent } = useDisplayMintState(data);
  const showNative =
    data?.mintState === "live" || data?.mintState === "showTimer";

  const { supply, mintPrice } = data;
  return (
    <Box>
      <Grid container spacing={[1.5, 1.5, 2.5]}>
        <Grid item xs={12} sm={6} lg={3}>
          <ValueBox title="Supply" value={supply} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <ValueBox title="Mint price" value={`${mintPrice} SOL`} />
        </Grid>
        {candyMachine && (
          <Grid item xs={12} sm={6} lg={3}>
            {!showNative ? (
              <DisplayStateBox content={displayBoxContent} />
            ) : (
              <Box
                sx={{
                  bgcolor: `rgba(0,0,0,0.18)`,
                  py: [0.7, 0.7, 0.9],
                  px: 1.5,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                <CandyMachineBasedStatus
                  candyMachine={candyMachine}
                  isActive={isActive}
                  endDate={endDate}
                  isPresale={isPresale}
                  toggleMintButton={toggleMintButton}
                />
              </Box>
            )}
          </Grid>
        )}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <SocialList
              discord={discord}
              twitter={twitter}
              sx={{ display: "inline-flex" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export type LuanchpadpageTopPartPropsType = {
  data: IMintDataType;
};

const LuanchpadpageTopPart: React.VFC<LuanchpadpageTopPartPropsType> = ({
  data,
}) => {
  const {
    image,
    name,
    description,
    tags,
    whitepaperUrl,
    candyMachineId,
    supply,
  } = data;

  // *************** PROPERTIES FOR TRIGGERING MINT API *************** //
  const candyMachineIdParsed = useMemo(() => {
    return new anchor.web3.PublicKey(candyMachineId);
  }, [candyMachineId]);

  const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
  const connection = useMemo(() => {
    return new anchor.web3.Connection(
      rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
    );
  }, [rpcHost]);

  const {
    isUserMinting,
    onMint,
    isActive,
    itemsRemaining,
    candyMachine,
    setIsUserMinting,
    endDate,
    toggleMintButton,
    isWhitelistUser,
    isPresale,
    connection: parsedConnection,
    isValidBalance,
  } = useMintConnectionActions({
    candyMachineId: candyMachineIdParsed,
    connection: connection,
    rpcHost: rpcHost,
  });
  // *************** END HERE --- PROPERTIES FOR TRIGGERING MINT API *************** //

  // *************** RENDER *************** //
  return (
    <SquareBorderBox
      sx={{
        p: [1.5, 1.5, 2],
        backgroundImage:
          "linear-gradient(30.91deg, rgba(27, 178, 222, 0.45) 1.01%, rgba(0,0,0,0.3) 100%)",
      }}
    >
      <Grid container spacing={[1.5, 1.5, 2.5]}>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={9}
          sx={{
            order: [3, 3, 2],
          }}
        >
          <Box sx={{ ...flexColumn, height: "100%" }}>
            {/* HEADER BAR */}
            <HeaderPart
              data={data}
              candyMachine={candyMachine}
              isActive={isActive}
              endDate={endDate}
              toggleMintButton={toggleMintButton}
              isPresale={isPresale}
            />
            <Divider sx={{ my: [1.5, 1.5, 2] }} />
            {/* DESCRIPTIOn */}
            {description && <Typography>{description}</Typography>}
            {/* WHITELIST BOXES */}
            <InfoWhitelistBoxes
              data={data}
              itemsRemaining={supply - (itemsRemaining ?? 0)}
            />
            {/* TAGS BOXES */}
            <TagsWhitepaperBox tags={tags} whitepaperUrl={whitepaperUrl} />
          </Box>
          {/* CONTENT ENDS HERE */}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={3}
          sx={{
            order: [2, 2, 3],
          }}
        >
          <img
            src={getStrapiMedia(image)}
            alt={`Mint pic for ${name}`}
            style={{ width: "100%", height: "auto" }}
          />
          <MintButtonWrapper
            isActive={isActive}
            isUserMinting={isUserMinting}
            onMint={onMint}
            setIsUserMinting={setIsUserMinting}
            candyMachine={candyMachine}
            isPresale={isPresale}
            isWhitelistUser={isWhitelistUser}
            connection={parsedConnection}
            rpcHost={rpcHost}
            data={data}
            isValidBalance={isValidBalance}
          />
        </Grid>
      </Grid>
    </SquareBorderBox>
  );
};

export default LuanchpadpageTopPart;
