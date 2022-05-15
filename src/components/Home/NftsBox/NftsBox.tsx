import { Box, Container, Grid } from "@mui/material";
import SectionHeader from "components/Reusable/SectionHeader";
import { sectionMarginBottom } from "constants/styleConstants";
import usePageData from "hooks/usePageData";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { useContext } from "react";
import NftItemsGrid from "./NftItemsGrid";
import { centerFlex } from "utils/sxUtils";
import NftBoxSupplyPriceBox from "./NftBoxSupplyPriceBox";

export type NftsBoxPropsType = {};

const NftsBox: React.FC<NftsBoxPropsType> = () => {
  const { pageData } = usePageData("home-nfts-box");
  const { tokenData } = useContext(StrapiContext);
  const { pageData: NftItems } = usePageData("nft-items", true);

  const { price: mintPrice } = tokenData ?? {};
  const { sectionHeader } = pageData ?? {};

  // *************** RENDER *************** //
  if (!pageData) return null;
  return (
    <Box
      sx={{
        bgcolor: "#000",
        py: sectionMarginBottom,
        width: 1440,
        margin: "0 auto",
        maxWidth: "100%",
      }}
    >
      <Container>
        <Box sx={{ pb: [1, 1, 3] }}>
          <Grid container spacing={[0, 0, 3]}>
            {mintPrice && NftItems && (
              <Grid item xs={12} sm={12} md={6} sx={{ ...centerFlex }}>
                <NftBoxSupplyPriceBox nftItems={NftItems} price={mintPrice} />
              </Grid>
            )}
            {sectionHeader && (
              <Grid item xs={12} sm={12} md={6} sx={{ ...centerFlex }}>
                <SectionHeader {...sectionHeader} sx={{ textAlign: "left" }} />
              </Grid>
            )}
          </Grid>
        </Box>
        {NftItems && <NftItemsGrid items={NftItems} />}
      </Container>
    </Box>
  );
};

export default NftsBox;
