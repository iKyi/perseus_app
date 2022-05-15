import { SxProps, Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import GreenRemainingLine from "./GreenRemainingLine";
import { useWallet } from "@solana/wallet-adapter-react";
import { IMintDataType } from "../LuanchpadPageInner";
export type InfoWhitelistBoxesPropsType = {
  data: IMintDataType;
  itemsRemaining: number | undefined;
};

const DarkValueBox: React.FC<{ title: string; value: any; sx?: SxProps }> = ({
  sx,
  title,
  value,
}) => {
  return (
    <Box
      sx={{
        bgcolor: `rgba(0,0,0,0.16)`,
        display: "inline-flex",
        px: 1.5,
        py: 1,
        m: [1, 1, 0],
        "&:not(:first-of-type)": {
          ml: [0, 0, 3],
        },
        ...sx,
      }}
    >
      <Typography component={"span"} sx={{ color: "common.lightGray" }}>
        {title}:{" "}
      </Typography>
      <Typography component={"span"} sx={{ color: "common.white", ml: 1 }}>
        {value}
      </Typography>
    </Box>
  );
};

const InfoWhitelistBoxes: React.VFC<InfoWhitelistBoxesPropsType> = ({
  data,
  itemsRemaining,
}) => {
  const {
    whitelistOne,
    whitelistOneText,
    whitelistThree,
    whitelistThreeText,
    whitelistTwo,
    whitelistTwoText,
    publicMint,
    mintPrice,
    supply,
  } = data;

  const { connected } = useWallet();

  const mintsText = useMemo(() => {
    let text = "NONE";
    const mints = [whitelistOne, whitelistTwo, whitelistThree];
    if (!publicMint && mints.some((item) => item)) {
      text = "WHITELIST ";
      mints.forEach((item, index: number) => {
        if (item) {
          if (text === "WHITELIST ") {
            text += ` ${index + 1}`;
          } else {
            text += ` + ${index + 1}`;
          }
        }
      });
    }
    if (publicMint) {
      text = "PUBLIC";
    }
    return text;
  }, [whitelistOne, whitelistThree, whitelistTwo, publicMint]);

  // *************** RENDER *************** //
  return (
    <Box sx={{ my: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          mb: 2,
          bgcolor: `rgba(0,0,0,0.16)`,
          p: [1, 1, 2],
        }}
      >
        <DarkValueBox title="WHITELIST #1" value={whitelistOneText} />
        <DarkValueBox title="WHITELIST #2" value={whitelistTwoText} />
        <DarkValueBox title="WHITELIST #3" value={whitelistThreeText} />
        <Box sx={{ m: [1, 1, 0], ml: [1, 1, "auto"], pl: 2 }}>MINTED</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          mb: 2,
          bgcolor: `rgba(0,0,0,0.16)`,
          p: [1, 1, 2],
        }}
      >
        <DarkValueBox title="OPEN MINT" value={mintsText} />
        <DarkValueBox title="PRICE" value={`${mintPrice} SOL`} />
        {itemsRemaining && itemsRemaining !== 0 && connected ? (
          <DarkValueBox title="MINTED" value={`${itemsRemaining}/${supply}`} />
        ) : null}
        {itemsRemaining ? (
          <GreenRemainingLine
            value1={supply - itemsRemaining}
            value2={supply}
          />
        ) : (
          <GreenRemainingLine value1={0} value2={supply} />
        )}
        {/* <DarkValueBox title="WHITELIST #2" value={whitelistTwoText} />
        <DarkValueBox title="WHITELIST #3" value={whitelistThreeText} />
        <Box sx={{ m: [1, 1, 0], ml: [1, 1, "auto"], pl: 2 }}>MINTED</Box> */}
      </Box>
    </Box>
  );
};

export default InfoWhitelistBoxes;
