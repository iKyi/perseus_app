import { Box, Grid } from "@mui/material";
// import usePageData from "hooks/usePageData";
// import CryptocurrencyEntry from "./CryptocurrencyEntry";
import PortfolioSectionHeader from "./PortfolioSectionHeader";
import coinComingSoon from "assets/images/portfolio/coinComingSoon.png";

export type CryptocurrenciesSectionPropsType = {};

const CryptocurrenciesSection: React.FC<
  CryptocurrenciesSectionPropsType
> = () => {
  // const { pageData } = usePageData("crytocurrencies", true);

  // const totalCrypto = pageData ? pageData.length : 0;
  // *************** RENDER *************** //
  // if (!pageData) return null;
  return (
    <Box>
      <PortfolioSectionHeader
        title="Cryptocurrencies"
        // items={[{ title: "Total Crypto", value: totalCrypto }]}
      />
      {/* {pageData.map((item: any) => {
        return <CryptocurrencyEntry key={item.attributes.name} data={item} />;
      })} */}
      <Grid container spacing={[2, 2, 4]}>
        <Grid item xs={12} md={4}>
          <img src={coinComingSoon} alt="coming soon" className="respImg" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CryptocurrenciesSection;
