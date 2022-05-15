import { Box, Container, Grid } from "@mui/material";
import { sectionMarginBottom } from "constants/styleConstants";
import usePageData from "hooks/usePageData";
import { getStrapiMedia } from "lib/theme/media";
import { centerFlex } from "utils/sxUtils";
import RightColumn from "./RightColumn";

export type AppBoxPropsType = {};

const AppBox: React.FC<AppBoxPropsType> = () => {
  const { pageData } = usePageData("app-box");

  // *************** RENDER *************** //
  const {
    backgroundImage,
    bulletPoints,
    comingSoonText,
    gplayUrl,
    leftImage,
    released,
    appleUrl,
  } = pageData ?? {};

  if (!pageData) return null;
  return (
    <Box
      sx={{
        width: 1440,
        maxWidth: "100%",
        margin: "0 auto",
        background:
          backgroundImage && backgroundImage.data
            ? `url('${getStrapiMedia(backgroundImage)}')`
            : undefined,
        backgroundSize: "cover",
        py: sectionMarginBottom,
      }}
    >
      <Container>
        <Grid container spacing={[2, 2, 4]}>
          {leftImage && leftImage.data && (
            <Grid item xs={12} sm={12} md={6} sx={{ ...centerFlex }}>
              <img
                src={getStrapiMedia(leftImage)}
                alt="app mobile physical iphone"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Grid>
          )}
          {comingSoonText && (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <RightColumn
                appleUrl={appleUrl}
                bulletPoints={bulletPoints}
                gplayUrl={gplayUrl}
                released={released}
                comingSoonText={comingSoonText}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default AppBox;
