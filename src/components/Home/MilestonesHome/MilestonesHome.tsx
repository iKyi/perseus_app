import { Box, Button, Container } from "@mui/material";
import SectionHeader from "components/Reusable/SectionHeader";
import { sectionMarginBottom } from "constants/styleConstants";
import usePageData from "hooks/usePageData";
import ISectionHeaderStrapi from "utils/types/ISectionHeader";
import MileStonesListings from "./MileStonesListings";
import { Link as RouterLink } from "react-router-dom";

export type MilestonesHomePropsType = { header: ISectionHeaderStrapi };

const MilestonesHome: React.FC<MilestonesHomePropsType> = ({ header }) => {
  const { pageData } = usePageData("milestones", true);

  const summaryItems =
    pageData && pageData.length > 3 ? pageData.slice(-3) : pageData;
  // *************** RENDER *************** //
  if (!summaryItems) return null;
  return (
    <Box
      sx={{
        width: 1440,
        maxWidth: "100%",
        margin: "0 auto",
        py: sectionMarginBottom,
        backgroundImage:
          "linear-gradient(30.91deg, rgba(143, 60, 221, 0.05) 1.01%, rgba(0,0,0,0.3) 100%)",
      }}
    >
      <Container>
        <Box>
          <SectionHeader {...header} sx={{ maxWidth: 430, m: "0 auto" }} />
        </Box>
        <MileStonesListings items={summaryItems} />
        <Box sx={{ textAlign: ["center", "center", "right"], pt: [6, 6, 8] }}>
          <Button
            component={RouterLink}
            to={"/roadmap"}
            sx={{
              letterSpacing: [4.5, 4.5, 6.5],
              color: "common.gray",
              fontSize: [20, 20, 30],
            }}
          >
            VIEW FULL ROADMAP
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MilestonesHome;
