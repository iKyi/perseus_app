import PageBgHeader from "components/Reusable/PageBgHeader";
import TopFillerBox from "components/Reusable/TopFillerBox";
import InvestmentFundBox from "components/TokenPage/InvestmentFundBox";
import TotalSupplyBox from "components/TokenPage/TotalSupplyBox";
import usePageData from "hooks/usePageData";

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
      <InvestmentFundBox
        investmentFundTextContent={investmentFundTextContent}
      />
    </>
  );
};

export default TokenPage;
