import { Box, Grid, Stack, SxProps, Typography } from "@mui/material";
import { FONTS } from "lib/theme";
import { centerFlex } from "utils/sxUtils";

const BigSummaryBox: React.FC<{
  title: string;
  value: string | number;
  smallValue?: string | number;
  sx?: SxProps;
}> = ({ title, smallValue, value, sx }) => {
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <Typography sx={{ fontFamily: FONTS.POPPINS }}>{title}</Typography>

      <Box>
        <Typography
          component="span"
          sx={{ fontSize: "2.3rem", fontWeight: 400 }}
        >
          {value}
        </Typography>
        {smallValue && (
          <Typography
            component="span"
            sx={{ fontSize: "1.2rem", fontWeight: 300, ml: 1 }}
          >
            {smallValue}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export type NftBoxSupplyPriceBoxPropsType = {
  price: number;
  nftItems: any[];
};

const NftBoxSupplyPriceBox: React.FC<NftBoxSupplyPriceBoxPropsType> = ({
  price,
  nftItems,
}) => {
  const totalSupply = nftItems.reduce((prev, item) => {
    return prev + item.attributes.totalSupply;
  }, 0);

  // *************** RENDER *************** //
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} sx={{ ...centerFlex }}>
          <Grid container rowSpacing={[0, 0, 3]} sx={{ mb: [3, 3, 0] }}>
            <Grid item xs={6} sm={6} md={12}>
              <BigSummaryBox title="Total Supply" value={totalSupply} />
            </Grid>
            <Grid item xs={6} sm={6} md={12}>
              <BigSummaryBox
                title="Mint Price"
                value={price}
                smallValue="SOL"
                sx={{ textAlign: ["right", "right", "left"] }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2}>
            {nftItems.map((item) => {
              const { name, totalSupply } = item?.attributes ?? {};
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid",
                    borderColor: "common.gray",
                    borderRadius: "4px",
                    px: 2,
                    py: 1.5,
                  }}
                  key={name}
                >
                  <Typography component="span">{name}</Typography>
                  <Typography component="span">{totalSupply}</Typography>
                </Box>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NftBoxSupplyPriceBox;
