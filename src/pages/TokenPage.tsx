import { Box, Container, Grid } from "@mui/material";
import PageBgHeader from "components/Reusable/PageBgHeader";
import SectionHeader from "components/Reusable/SectionHeader";
import TopFillerBox from "components/Reusable/TopFillerBox";
import InvestmentFundBox from "components/TokenPage/InvestmentFundBox";
import TotalSupplyBox from "components/TokenPage/TotalSupplyBox";
import usePageData from "hooks/usePageData";
import tokenComingSoonImage from "assets/images/tokenPage/tokenPageComingSoon/tokenComingSoon.png";
import holdersComingSoon from "assets/images/tokenPage/tokenPageComingSoon/holdersComingSoon.png";
import graphicComingSoon from "assets/images/tokenPage/tokenPageComingSoon/graphicComingSoon.png";
import investments1 from "assets/images/tokenPage/tokenPageComingSoon/investments1.png";
import investments2 from "assets/images/tokenPage/tokenPageComingSoon/investments2.png";
import { sectionMarginBottom } from "constants/styleConstants";

export type TokenPagePropsType = {
  children?: any;
};

const TokenPage: React.FC<TokenPagePropsType> = ({ children }) => {
  const { SeoComponent, pageData } = usePageData("token-page");
  const { introBoxText, introBoxCtaButton, investmentFundTextContent } =
    pageData ?? {};

  // *************** RENDER *************** //
  return (
    <>
      {SeoComponent}
      <TopFillerBox />
      <PageBgHeader
        {...introBoxText}
        buttonData={introBoxCtaButton}
        bellowElements={<TotalSupplyBox />}
      />
      <Box sx={{ mb: sectionMarginBottom }}>
        <Container>
          <SectionHeader preTitle="PERSEUS TOKEN" sx={{ textAlign: "left" }} />
          <img
            src={tokenComingSoonImage}
            style={{ width: "100%", height: "auto" }}
            alt="coming soon"
          />
        </Container>
      </Box>
      <Box>
        <Container>
          <SectionHeader title="Top 10 holders" sx={{ textAlign: "left" }} />
          <img
            src={holdersComingSoon}
            style={{ width: "100%", height: "auto" }}
            alt="coming soon"
          />
        </Container>
      </Box>

      <InvestmentFundBox
        investmentFundTextContent={investmentFundTextContent}
      />

      <Box sx={{ mb: sectionMarginBottom }}>
        <Container>
          <img
            src={graphicComingSoon}
            style={{ width: "100%", height: "auto" }}
            alt="coming soon"
          />
        </Container>
      </Box>

      <Box sx={{ mb: sectionMarginBottom }}>
        <Container>
          <Grid container spacing={[2, 2, 4]}>
            <Grid item xs={12} md={6}>
              <img
                src={investments1}
                style={{ width: "100%", height: "auto" }}
                alt="coming soon"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={investments2}
                style={{ width: "100%", height: "auto" }}
                alt="coming soon"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default TokenPage;
