import { Box, Container, Tab, Tabs } from "@mui/material";
import CryptocurrenciesSection from "components/Portfolio/CryptocurrenciesSection";
import ProjectsSection from "components/Portfolio/ProjectsSection";
import LastUpdatedBox from "components/Reusable/LastUpdatedBox";
import PageBgHeader from "components/Reusable/PageBgHeader";
import TopFillerBox from "components/Reusable/TopFillerBox";
import usePageData from "hooks/usePageData";
import topDoubleComingSoon from "assets/images/portfolio/topDoubleComingSoon.png";

export type PortfolioPagePropsType = {
  children?: any;
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
          <Box>
            <Tabs centered value={0}>
              <Tab
                label="Currently invested"
                sx={{
                  fontSize: "1.25rem",
                }}
              />
              <Tab
                disabled
                label="Exited investments"
                sx={{
                  fontSize: "1.25rem",
                }}
              />
            </Tabs>
          </Box>
        }
      >
        <img src={topDoubleComingSoon} alt="comong soon" className="respImg" />
      </PageBgHeader>
      <Container>
        <ProjectsSection />
        <CryptocurrenciesSection />
      </Container>
      <LastUpdatedBox />
    </>
  );
};

export default PortfolioPage;
