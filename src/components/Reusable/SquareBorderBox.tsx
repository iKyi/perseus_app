import { Box, SxProps } from "@mui/material";

export type SquareBorderBoxPropsType = {
  children?: any;
  sx?: SxProps<any>;
};

const SquareBorderBox: React.FC<SquareBorderBoxPropsType> = ({
  children,
  sx,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        border: "1px solid",
        borderImageSlice: 1,
        borderImageSource:
          "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default SquareBorderBox;
