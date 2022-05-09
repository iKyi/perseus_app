import { Grid, Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { sectionMarginBottom } from "constants/styleConstants";
import { FONTS } from "lib/theme";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { ReactNode, useContext } from "react";

const BgBox: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: "#000",
        border: "1px solid",
        borderImageSlice: 1,
        borderImageSource:
          "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
        px: 3.5,
        py: 2.5,
      }}
    >
      {children}
    </Box>
  );
};

const StyledSmallTitle = styled(Typography)(() => ({
  fontSize: "0.9rem",
  fontFamily: FONTS.POPPINS,
}));

const StyledValue = styled(Typography)(() => ({
  fontSize: "1.5rem",
  fontFamily: FONTS.POPPINS,
  fontWeight: 500,
}));

export type TotalSupplyBoxPropsType = {};

const TotalSupplyBox: React.FC<TotalSupplyBoxPropsType> = () => {
  const { tokenData } = useContext(StrapiContext);
  const { supply, circulatingSupply, dollarPrice } = tokenData ?? {};
  const missingData = !supply || !circulatingSupply || !dollarPrice;

  // *************** RENDER *************** //
  if (missingData) return null;
  return (
    <Box
      sx={{
        py: sectionMarginBottom,
      }}
    >
      <Grid container spacing={[2, 2, 4]}>
        <Grid item xs={12} md={4}>
          <BgBox>
            <Stack spacing={1}>
              <StyledSmallTitle>Total Supply</StyledSmallTitle>
              <StyledValue>
                {supply
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                  .replace("$", "")}
              </StyledValue>
            </Stack>
          </BgBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <BgBox>
            <Stack spacing={1}>
              <StyledSmallTitle>Circulating Supply</StyledSmallTitle>
              <StyledValue>
                {circulatingSupply
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                  .replace("$", "")}
              </StyledValue>
            </Stack>
          </BgBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <BgBox>
            <Stack spacing={1}>
              <StyledSmallTitle>Price</StyledSmallTitle>
              <StyledValue>
                {dollarPrice}
                <small>$</small>
              </StyledValue>
            </Stack>
          </BgBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TotalSupplyBox;
