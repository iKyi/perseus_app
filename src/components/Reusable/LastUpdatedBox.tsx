import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { sectionMarginBottom } from "constants/styleConstants";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { useContext } from "react";
import SectionHeader from "./SectionHeader";
import { DateTime } from "luxon";
import { FONTS } from "lib/theme";
import { Refresh } from "@mui/icons-material";

export type LastUpdatedBoxPropsType = {};

const LastUpdatedBox: React.FC<LastUpdatedBoxPropsType> = () => {
  const { lastUpdatedBoxHeader, lastUpdated } = useContext(StrapiContext);

  // *************** RENDER *************** //
  return (
    <Box sx={{ py: sectionMarginBottom }}>
      <Container>
        <Grid container spacing={[2, 2, 4]}>
          <Grid item xs={12} sm={12} md={6}>
            <SectionHeader
              {...lastUpdatedBoxHeader}
              sx={{ textAlign: ["center", "center", "left"] }}
            />
          </Grid>
          {lastUpdated && (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  bgcolor: "#000",
                  border: "1px solid",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
                  px: [3, 3, 4],
                  py: [2, 2, 3],
                  boxShadow: `-5px 5px 12px 0px rgba(143, 60, 221, 0.45)`,
                }}
              >
                <Stack
                  sx={{
                    fontFamily: FONTS.POPPINS,
                  }}
                  spacing={1}
                >
                  <Typography sx={{ fontWeight: 300 }}>Last updated</Typography>
                  <Typography sx={{ fontSize: [20, 20, 28] }}>
                    {DateTime.fromISO(lastUpdated, {
                      zone: "utc",
                    }).toRelative({
                      base: DateTime.now(),
                    })}
                  </Typography>
                  <Typography sx={{ fontWeight: 300, color: "common.gray" }}>
                    {DateTime.fromISO(lastUpdated, { zone: "utc" }).toFormat(
                      "dd/MM/yyyy"
                    )}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    color: "primary.main",
                    fontSize: "4.5rem",
                    pl: 4,
                  }}
                >
                  <Refresh color="inherit" fontSize="inherit" />
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default LastUpdatedBox;
