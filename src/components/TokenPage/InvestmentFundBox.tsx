import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { sectionMarginBottom } from "constants/styleConstants";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { useContext } from "react";
import fundGraph from "assets/images/tokenPage/fundGraph.png";
import { DateTime } from "luxon";
import ISectionHeaderStrapi from "utils/types/ISectionHeader";
import SectionHeader from "components/Reusable/SectionHeader";

export type InvestmentFundBoxPropsType = {
  investmentFundTextContent: ISectionHeaderStrapi;
};

const InvestmentBox: React.FC<{
  title: string;
  value: string | number;
  currency: string;
}> = ({ currency, title, value }) => {
  const { lastUpdated } = useContext(StrapiContext);
  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(30.91deg, rgba(143, 60, 221, 0.10) 1.01%, rgba(255,255,255,0.05) 100%)",
        border: "1px solid",
        borderImageSlice: 1,
        borderImageSource:
          "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
        px: 3.5,
        py: 2.5,
      }}
    >
      <Grid container spacing={[2, 2, 4]}>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              fontWeight: 300,
            }}
          >
            <Typography sx={{ fontFamily: "inherit", fontWeight: "inherit" }}>
              {title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "inherit",
                fontWeight: "inherit",
                fontSize: [24, 24, 34],
              }}
            >
              {value}
              <Typography
                component="span"
                sx={{ fontSize: "60%", fontWeight: "inherit", ml: 1 }}
              >
                {currency}
              </Typography>
            </Typography>
            {lastUpdated && (
              <Typography
                sx={{
                  fontSize: "80%",
                  color: "common.gray",
                  fontFamily: "inherit",
                  fontWeight: "inherit",
                }}
              >
                As of{" "}
                {DateTime.fromISO(lastUpdated, { zone: "utc" }).toFormat(
                  "dd/MM/yyyy"
                )}
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={fundGraph}
            style={{ width: "100%", height: "auto", maxWidth: "160px" }}
            alt="graph illustration"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const InvestmentFundBox: React.FC<InvestmentFundBoxPropsType> = ({
  investmentFundTextContent,
}) => {
  const { fundData } = useContext(StrapiContext);
  const { totalAmount, investedAmount, currency } = fundData ?? {};
  const missingData = !totalAmount || !investedAmount || !currency;
  // *************** RENDER *************** //
  if (missingData) return null;
  return (
    <Box
      sx={{
        py: sectionMarginBottom,
      }}
    >
      <Container>
        <SectionHeader
          {...investmentFundTextContent}
          sx={{ textAlign: "left" }}
        />
        <Grid container spacing={[2, 2, 4]}>
          <Grid item xs={12} md={6}>
            <InvestmentBox
              currency={currency}
              title="Investment fund"
              value={totalAmount
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                .replace("$", "")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InvestmentBox
              currency={currency}
              title="Invested amount"
              value={investedAmount
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                .replace("$", "")}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InvestmentFundBox;
