import { Grid, Box } from "@mui/material";
import one from "assets/images/homeintroBox/1.png";
import two from "assets/images/homeintroBox/2.png";
import three from "assets/images/homeintroBox/3.png";
import four from "assets/images/homeintroBox/4.png";

export type HomeBoxImagesGridPropsType = {};

const HomeBoxImagesGrid: React.FC<HomeBoxImagesGridPropsType> = () => {
  // *************** RENDER *************** //
  return (
    <Box>
      <Grid container spacing={[2, 2, 3]}>
        {[one, two, three, four].map((item: any, index: number) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={index}
            >
              <img
                src={item}
                alt={`coming soon pic ${index}`}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HomeBoxImagesGrid;
