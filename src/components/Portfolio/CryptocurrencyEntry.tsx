import { Box, Stack, Typography } from "@mui/material";
import { getStrapiMedia } from "lib/theme/media";
import smallGraph from "assets/images/portfolio/smallGraph.png";

export type CryptocurrencyEntryPropsType = {
  data: any;
};

const CryptocurrencyEntry: React.FC<CryptocurrencyEntryPropsType> = ({
  data,
}) => {
  const { attributes } = data;
  const { logo, name, supply, totalValue } = attributes ?? {};

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        "&:not(:last-of-type)": {
          mr: 1.5,
        },
        border: "1px solid",
        borderImageSlice: 1,
        borderImageSource:
          "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
        px: 1.5,
        py: 2,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {logo && (
        <Box
          sx={{
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            bgcolor: "common.gray",
          }}
        >
          <img
            src={getStrapiMedia(logo)}
            alt={`Logo for ${name}`}
            style={{ width: 20, height: "auto" }}
          />
        </Box>
      )}
      <Box sx={{ px: 2 }}>
        <Stack spacing={0.1}>
          <Typography sx={{ color: "common.gray", fontWeight: 300 }}>
            Coin
          </Typography>
          <Typography>{name}</Typography>
        </Stack>
      </Box>
      <Box sx={{ py: 1.5, display: ["none", "none", "block"] }}>
        <img
          src={smallGraph}
          alt="Market Graph"
          style={{ width: 100, height: "auto" }}
        />
      </Box>
      <Box sx={{ px: 2 }}>
        <Stack spacing={0.1} sx={{ textAlign: "right" }}>
          <Typography>{totalValue}</Typography>
          <Typography sx={{ color: "common.gray", fontWeight: 300 }}>
            {supply} {name}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default CryptocurrencyEntry;
