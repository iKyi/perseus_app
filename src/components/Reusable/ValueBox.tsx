import { Typography, Box, SxProps, Theme } from "@mui/material";
import { centerFlex } from "utils/sxUtils";

const ValueBox: React.FC<{
  title: string;
  value: string | number;
  sx?: SxProps<Theme>;
  smaller?: boolean;
}> = ({ title, value, sx: importedSx, smaller }) => {
  const unifiedStyles = { ...centerFlex, ...importedSx };

  return (
    <Box
      sx={{
        bgcolor: `rgba(0,0,0,0.18)` as string,
        minWidth: !smaller ? ["100%", "100%", "100%", 166] : undefined,
        py: [0.7, 0.7, 0.9],
        px: 1.5,
        ...unifiedStyles,
        fontSize: smaller ? "0.85rem" : undefined,
      }}
    >
      <Typography sx={{ fontSize: "inherit" }}>{title}:</Typography>
      <Typography
        sx={{ fontSize: "inherit", ml: 1, fontWeight: 600 }}
        color="primary"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default ValueBox;
