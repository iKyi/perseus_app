import { Box, Container, Tab, Tabs } from "@mui/material";
import CryptocurrenciesSection from "components/Portfolio/CryptocurrenciesSection";
import ProjectsSection from "components/Portfolio/ProjectsSection";
import LastUpdatedBox from "components/Reusable/LastUpdatedBox";
import PageBgHeader from "components/Reusable/PageBgHeader";
import TopFillerBox from "components/Reusable/TopFillerBox";
import usePageData from "hooks/usePageData";
import topDoubleComingSoon from "assets/images/portfolio/topDoubleComingSoon.png";
import nftsComingSoon from "assets/images/portfolio/nftsComingSoon.png";
import { sectionMarginBottom } from "constants/styleConstants";
import PortfolioSectionHeader from "components/Portfolio/PortfolioSectionHeader";

export type PortfolioPagePropsType = {
  children?: any;
};

const tabStyles = {
  fontSize: ["0.9rem", "0.9rem", "1.25rem"],
  "&.Mui-selected": {
    color: "#fff",
  },
};

const PortfolioPage: React.FC<PortfolioPagePropsType> = ({ children }) => {
  const { SeoComponent, pageData } = usePageData("portfolio-page");
  const { introBoxHeader } = pageData ?? {};
  // *************** RENDER *************** //
  return (
    <>
      {SeoComponent}
      <TopFillerBox />
      <PageBgHeader
        {...introBoxHeader}
        bellowElements={
          <Box
            sx={{
              mb: [3, 3, 0],
            }}
          >
            <Tabs centered value={0}>
              <Tab label="Currently invested" sx={tabStyles} />
              <Tab disabled label="Exited investments" sx={tabStyles} />
            </Tabs>
          </Box>
        }
      >
        <img src={topDoubleComingSoon} alt="comong soon" className="respImg" />
      </PageBgHeader>
      <Box sx={{ mb: sectionMarginBottom, pt: 2 }}>
        <Container>
          <PortfolioSectionHeader title="NFTs" />
          <img
            src={nftsComingSoon}
            style={{ width: "100%", height: "auto" }}
            alt="coming soon"
          />
        </Container>
      </Box>
      <Container>
        <ProjectsSection />
        <CryptocurrenciesSection />
      </Container>
      <LastUpdatedBox />
    </>
  );
};

export default PortfolioPage;
