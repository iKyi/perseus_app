import { Box } from "@mui/material";
import SectionHeader from "components/Reusable/SectionHeader";
import TopFillerBox from "components/Reusable/TopFillerBox";
import RoadmapPageListings from "components/Roadmap/RoadmapPageListings";
import { sectionMarginBottom } from "constants/styleConstants";
import usePageData from "hooks/usePageData";
import { getStrapiMedia } from "lib/theme/media";

export type RoadmapPagePropsType = {
  children?: any;
};

const RoadmapPage: React.FC<RoadmapPagePropsType> = ({ children }) => {
  const { SeoComponent, pageData } = usePageData("roadmap-page");
  const { pageData: roadmapItems } = usePageData("milestones", true);

  const { sectionHeader, backgroundImage } = pageData ?? {};

  // *************** RENDER *************** //
  return (
    <>
      {SeoComponent}
      <TopFillerBox />
      <SectionHeader
        {...sectionHeader}
        sx={{ maxWidth: 430, m: "0 auto", pt: sectionMarginBottom }}
      />
      <Box
        sx={{
          width: 1440,
          maxWidth: "100%",
          margin: "0 auto",
          py: sectionMarginBottom,
          background: backgroundImage
            ? `url('${getStrapiMedia(backgroundImage)}')`
            : `linear-gradient(30.91deg, rgba(143, 60, 221, 0.05) 1.01%, rgba(0,0,0,0.3) 100%)`,
          backgroundSize: "auto 100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {roadmapItems && <RoadmapPageListings items={roadmapItems} />}
      </Box>
    </>
  );
};

export default RoadmapPage;
