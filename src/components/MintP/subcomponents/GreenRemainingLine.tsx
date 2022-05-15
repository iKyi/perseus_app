import { Box } from "@mui/material";
import { useMemo } from "react";

export type GreenRemainingLinePropsType = {
  value1: number | undefined;
  value2: number;
};

const GreenRemainingLine: React.VFC<GreenRemainingLinePropsType> = ({
  value1,
  value2,
}) => {
  const tubeWidth = useMemo(() => {
    const firstValue = value1 ?? 0;
    return (firstValue / value2) * 100;
  }, [value2, value1]);

  // *************** RENDER *************** //
  if (!value1) {
    return null;
  }
  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          bgcolor: "#000",
          height: 6,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `calc(100% - ${tubeWidth}%)`,
            bgcolor: "primary.main",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default GreenRemainingLine;
