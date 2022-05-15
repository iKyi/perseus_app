import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { sectionMarginBottom } from "constants/styleConstants";
import bgImage from "assets/images/homeintroBox/background.png";
import HomeBoxImagesGrid from "./HomeBoxImagesGrid";
import SectionHeader from "components/Reusable/SectionHeader";
import ISectionHeaderStrapi from "utils/types/ISectionHeader";
import { useContext } from "react";
import { StrapiContext } from "providers/StrapiPublicProvider";
import usePageData from "hooks/usePageData";
import { getStrapiMedia } from "lib/theme/media";
import { BulletItem } from "../AppBox/RightColumn";

export type HomeIntroBoxPropsType = {
  introBoxText: undefined | Record<any, any>;
  tokenSectionText: undefined | Record<any, any>;
};

const HomeIntroBox: React.FC<HomeIntroBoxPropsType> = ({
  introBoxText,
  tokenSectionText,
}) => {
  const { pageData: onMarkets } = usePageData("on-markets", true);
  const { tradeUrl, tokenData } = useContext(StrapiContext);
  const { supply } = tokenData ?? {};

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        width: 1440,
        maxWidth: "100%",
        margin: "0 auto",
        background: `url('${bgImage}')`,
        backgroundSize: "cover",
        py: sectionMarginBottom,
      }}
    >
      <Container>
        <Grid container spacing={[0, 0, 3]} alignItems="center">
          {introBoxText && (
            <Grid item sm={12}>
              <Box sx={{ maxWidth: "100%", width: "100%", overflow: "hidden" }}>
                <SectionHeader
                  {...(introBoxText as ISectionHeaderStrapi)}
                  sx={{
                    width: ["100%", "100%", 600],
                    maxWidth: "100%",
                    margin: "0 auto",
                  }}
                />
              </Box>
            </Grid>
          )}

          <Grid item sm={12} md={6}>
            {tokenSectionText && (
              <SectionHeader
                {...(tokenSectionText as ISectionHeaderStrapi)}
                sx={{
                  textAlign: "left",
                  maxWidth: "100%",
                  width: ["100%", "100%", 500],
                }}
              >
                <Box>
                  {supply && (
                    <BulletItem
                      preTitle="Supply"
                      title={supply
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                        .replace("$", "")}
                    />
                  )}
                  <BulletItem preTitle="Price" title={"TBA"} />
                </Box>
                <Divider sx={{ my: [2, 2, 3] }} />
                {onMarkets && (
                  <Box sx={{ mb: [2, 2, 3] }}>
                    <Typography sx={{ fontWeight: 300 }}>Coming on</Typography>
                    {onMarkets.map((item: any, index: number) => {
                      const { attributes } = item;
                      const { logo } = attributes ?? {};
                      if (logo) {
                        return (
                          <Box
                            key={index}
                            sx={{
                              width: 120,
                              mr: 2,
                              display: "inline-block",
                              mt: 1,
                            }}
                          >
                            <img
                              src={getStrapiMedia(logo)}
                              alt={`logo ${index}`}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </Box>
                        );
                      }

                      return null;
                    })}
                  </Box>
                )}
              </SectionHeader>
            )}
            <Button
              component={Link}
              href={tradeUrl}
              size="large"
              variant="outlined"
              color="secondary"
              target={"_blank"}
              rel="noopener"
              sx={{
                width: 220,
                maxWidth: "100%",
                height: 52,
                mb: [3, 3, 0],
              }}
            >
              Trade Perseus
            </Button>
          </Grid>
          <Grid item sm={12} md={6} alignItems="center">
            <HomeBoxImagesGrid />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeIntroBox;
