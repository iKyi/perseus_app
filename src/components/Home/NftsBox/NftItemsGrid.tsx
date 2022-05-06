import { Box, Grid, Typography } from "@mui/material";
import { getStrapiMedia } from "lib/theme/media";
import getMineSpeed from "utils/getMineSpeed";

export type NftItemsGridPropsType = {
  items?: any[];
};

const NftItemsGrid: React.FC<NftItemsGridPropsType> = ({ items }) => {
  // *************** RENDER *************** //
  return (
    <Grid container spacing={[2, 2, 4]}>
      {items &&
        items.map((item) => {
          const { attributes } = item;
          const { name, image, mineValue } = attributes ?? {};
          return (
            <Grid item xs={12} sm={6} md={3} key={name}>
              <Box
                sx={{
                  border: "1px solid",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
                  backdropFilter: "blur(642.519px)",
                  bgcolor: "#000",
                }}
              >
                {image && (
                  <img
                    src={getStrapiMedia(image)}
                    alt={"name symbol"}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <Box sx={{ px: [2, 2, 2.5], py: 1.5 }}>
                  <Typography sx={{ fontSize: "1.25rem" }}>{name}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: "common.gray",
                        fontSize: "0.9rem",
                        fontWeight: 300,
                      }}
                    >
                      Mining:
                    </Typography>
                    <Typography component="span">
                      {getMineSpeed(mineValue)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default NftItemsGrid;
