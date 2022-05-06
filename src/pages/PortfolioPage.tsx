import { Container } from "@mui/material";
import CryptocurrenciesSection from "components/Portfolio/CryptocurrenciesSection";
import ProjectsSection from "components/Portfolio/ProjectsSection";
import LastUpdatedBox from "components/Reusable/LastUpdatedBox";
import TopFillerBox from "components/Reusable/TopFillerBox";
import usePageData from "hooks/usePageData";

export type PortfolioPagePropsType = {
  children?: any;
};

const PortfolioPage: React.FC<PortfolioPagePropsType> = ({ children }) => {
  const { SeoComponent } = usePageData("portfolio-page");

  // *************** RENDER *************** //
  return (
    <>
      {SeoComponent}
      <TopFillerBox />
      <Container>
        <ProjectsSection />
        <CryptocurrenciesSection />
      </Container>
      <LastUpdatedBox />
    </>
  );
};

export default PortfolioPage;
