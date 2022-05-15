import { Box, Typography, Link as MUILink, Divider } from "@mui/material";
import { FONTS } from "lib/theme";

const ItemEntry: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        "&:not(:last-of-type)": {
          marginRight: "10px",
        },
      }}
    >
      <Typography
        component="span"
        sx={{ fontSize: "0.95rem", color: "common.gray", fontWeight: 300 }}
      >
        {title}:
      </Typography>
      <Typography component="span" sx={{ ml: 0.8 }}>
        {value}
      </Typography>
    </Box>
  );
};

export type PortfolioSectionHeaderPropsType = {
  items?: { title: string; value: string }[];
  viewAllUrl?: string;
  title: string;
};

const PortfolioSectionHeader: React.FC<PortfolioSectionHeaderPropsType> = ({
  items,
  viewAllUrl,
  title,
}) => {
  // *************** RENDER *************** //
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          m: 0,
          fontSize: [24, 24, 28],
          fontWeight: 300,
          fontFamilt: FONTS.POPPINS,
        }}
      >
        <Typography variant="h2" fontSize="inherit" sx={{ fontWeight: 400 }}>
          {title}
        </Typography>
        {viewAllUrl && (
          <MUILink
            href={viewAllUrl}
            target="_blank"
            rel="noopener"
            sx={{
              fontSize: "0.86rem",
              color: "common.gray",
            }}
          >
            View all {">"}
          </MUILink>
        )}
      </Box>
      {items && items.length > 0 ? (
        <Box sx={{ mt: 2 }}>
          {items.map((item) => {
            return <ItemEntry {...item} key={item.title} />;
          })}
        </Box>
      ) : null}
      <Divider sx={{ my: [1.5, 1.5, 2.5] }} />
    </Box>
  );
};

export default PortfolioSectionHeader;
