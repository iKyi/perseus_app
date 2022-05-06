import { Box } from "@mui/material";
import usePageData from "hooks/usePageData";
import PortfolioSectionHeader from "./PortfolioSectionHeader";
import CryptocurrencyEntry from "./CryptocurrencyEntry";

export type CryptocurrenciesSectionPropsType = {};

const CryptocurrenciesSection: React.FC<
  CryptocurrenciesSectionPropsType
> = () => {
  const { pageData } = usePageData("crytocurrencies", true);

  const totalCrypto = pageData ? pageData.length : 0;
  // *************** RENDER *************** //
  if (!pageData) return null;
  return (
    <Box>
      <PortfolioSectionHeader
        title="Cryptocurrencies"
        items={[{ title: "Total Crypto", value: totalCrypto }]}
      />
      {pageData.map((item: any) => {
        return <CryptocurrencyEntry key={item.attributes.name} data={item} />;
      })}
    </Box>
  );
};

export default CryptocurrenciesSection;
