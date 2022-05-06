import { FiberManualRecord } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FONTS } from "lib/theme";
import { CSSProperties } from "react";

export type WalletLoginButtonThemePropsType = {
  propStyles?: CSSProperties;
};

const StyledLoginButton = styled(WalletMultiButton, {
  name: "StyledLoginButton",
  slot: "Root",
})<WalletLoginButtonThemePropsType & { connected: boolean }>(
  ({ theme, propStyles, connected }) => ({
    border: connected
      ? `1px solid ${(theme.palette.common as any).gray}`
      : `1px solid ${theme.palette.common.white}`,
    backgroundColor: `rgba(0,0,0,0.16)`,
    padding: "20px",
    fontWeight: 400,
    textTransform: "uppercase",
    fontFamily: FONTS.POPPINS,
    height: "34px",
    lineHeight: 1,
    borderRadius: 6,
    color: (theme.palette.common as any).white,
    display: "inline-flex",
    ".wallet-adapter-button-start-icon": {
      width: 16,
      height: 16,
    },
    ...propStyles,
  })
);

const WalletLoginButtonTheme: React.VFC<WalletLoginButtonThemePropsType> = ({
  propStyles,
}) => {
  const { connected } = useWallet();
  // *************** RENDER *************** //
  return (
    <StyledLoginButton
      propStyles={propStyles}
      connected={connected}
      startIcon={
        connected ? (
          <Box
            sx={{
              fontSize: "12px",
            }}
          >
            <FiberManualRecord
              fontSize="inherit"
              color={connected ? "primary" : "error"}
            />
          </Box>
        ) : undefined
      }
    />
  );
};

export default WalletLoginButtonTheme;
