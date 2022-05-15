import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import usePageData from "hooks/usePageData";
import pageHeaderBgImage2 from "assets/images/headerImage2.png";
import { sectionMarginBottom } from "constants/styleConstants";
import SectionHeader from "components/Reusable/SectionHeader";
import TopFillerBox from "components/Reusable/TopFillerBox";
import { getStrapiMedia } from "lib/theme/media";
import { centerFlex } from "utils/sxUtils";

export type AboutUsPagePropsType = {
  children?: any;
};

const AboutUsPage: React.FC<AboutUsPagePropsType> = ({ children }) => {
  const { SeoComponent, pageData } = usePageData("about-us-page");
  const { pageData: teamMembers } = usePageData("team-members", true);

  const {
    pageIntroText,
    companyText,
    whoText,
    teamText,
    whoImage,
    companyPoints,
    companyBgImage,
  } = pageData ?? {};

  const hasbgImage = companyBgImage?.data?.attributes?.url ? true : false;

  // *************** RENDER *************** //
  return (
    <>
      {SeoComponent}
      {/* page intro box */}
      {pageIntroText && (
        <Box
          sx={{
            width: 1440,
            maxWidth: "100%",
            margin: "0 auto",
            background: `url('${pageHeaderBgImage2}')`,
            backgroundSize: "cover",
            py: sectionMarginBottom,
          }}
        >
          <TopFillerBox />
          <Container>
            <SectionHeader
              {...pageIntroText}
              sx={{ width: 560, maxWidth: "100%", margin: "0 auto" }}
            />
          </Container>
        </Box>
      )}
      {/* ENDS page intro box */}
      {/* company box */}
      <Box
        sx={{
          width: 1440,
          maxWidth: "100%",
          margin: "0 auto",
          background: `url('${
            hasbgImage ? getStrapiMedia(companyBgImage) : ""
          }')`,
          backgroundSize: "cover",
          py: sectionMarginBottom,
        }}
      >
        <Container>
          <Grid container spacing={[2, 2, 4]} justifyContent="center">
            {companyText && (
              <Grid item xs={12} md={5}>
                <SectionHeader
                  {...companyText}
                  sx={{ textAlign: "left", width: 360, maxWidth: "100%" }}
                />
              </Grid>
            )}
            {companyPoints && (
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    border: "1px solid",
                    backgroundImage:
                      "linear-gradient(30.91deg, rgba(143, 60, 221, 0.10) 1.01%, rgba(0,0,0,0.3) 100%)",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
                    backdropFilter: "blur(642.519px)",
                    p: 2,
                  }}
                >
                  <Grid container spacing={[2, 2, 4]}>
                    {companyPoints.map((item: any, index: number) => {
                      return (
                        <Grid item xs={12} sm={6} key={index} sx={{ py: 2 }}>
                          <Box sx={{ px: 2 }}>
                            <Stack spacing={0.5}>
                              <Typography
                                sx={{
                                  color: "common.gray",
                                  fontWeight: 300,
                                  fontSize: "0.8rem",
                                }}
                              >
                                {item.preTitle}
                              </Typography>
                              <Typography sx={{ fontSize: "0.9rem" }}>
                                {item.title}
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      {/* ENDS company box */}
      {/* WHO WE ARE BOX */}
      <Box
        sx={{
          width: 1440,
          maxWidth: "100%",
          margin: "0 auto",
          py: sectionMarginBottom,
        }}
      >
        <Container>
          <Grid container spacing={[2, 2, 4]}>
            {whoImage && (
              <Grid item xs={12} md={5} sx={{ ...centerFlex }}>
                <Box sx={{ ...centerFlex, maxWidth: "100%" }}>
                  <img
                    src={getStrapiMedia(whoImage)}
                    alt="about us cubes"
                    className="respImg"
                  />
                </Box>
              </Grid>
            )}
            {whoText && (
              <Grid item xs={12} md={7} sx={{ ...centerFlex }}>
                <SectionHeader {...whoText} sx={{ textAlign: "left", mb: 0 }} />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      {/* ends WHO WE ARE BOX */}
      {/* TEAM MEMBERS BOX  */}
      {teamMembers && (
        <Box
          sx={{
            width: 1440,
            maxWidth: "100%",
            margin: "0 auto",
            py: sectionMarginBottom,
          }}
        >
          <Container>
            <Grid container spacing={[2, 2, 4]}>
              {teamText && (
                <Grid item xs={12} md={5} sx={{ ...centerFlex }}>
                  <SectionHeader
                    {...teamText}
                    sx={{ textAlign: "left", mb: 0 }}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  {teamMembers.map((item: any, index: number) => {
                    const { attributes } = item;
                    const { name, image, title } = attributes ?? {};
                    if (name && image) {
                      return (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              background: `url('${getStrapiMedia(image)}')`,
                              backgroundSize: "auto 100%",
                              backgroundPosition: "center center",
                              minHeight: 340,
                            }}
                          >
                            <Stack
                              sx={{
                                backgroundImage:
                                  "linear-gradient(30.91deg, rgba(0, 10, 0, 0.90) 1.01%, rgba(0,0,0,0.95) 100%)",
                                border: "1px solid",
                                borderImageSlice: 1,
                                borderImageSource:
                                  "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
                                mt: "auto",
                                p: 2,
                              }}
                            >
                              <Typography>{name}</Typography>
                              {title && (
                                <Typography
                                  sx={{ color: "common.gray", fontSize: "90%" }}
                                >
                                  {title}
                                </Typography>
                              )}
                            </Stack>
                          </Box>
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* ENDS TEAM MEMBERS BOX  */}
    </>
  );
};

export default AboutUsPage;
