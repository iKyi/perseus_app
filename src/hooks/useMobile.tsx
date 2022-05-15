import { useMediaQuery, useTheme } from "@mui/material";

const useMobile = (larger?: boolean) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(!larger ? "md" : "lg"));
};

export default useMobile;
