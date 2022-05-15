import { Typography, SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import MarkdownParser from "./MarkdownParser";

export type SectionHeaderPropsType = {
  preTitle?: string;
  title?: string;
  sx?: SxProps;
  description?: string;
  children?: ReactNode;
};

const SectionHeader: React.FC<SectionHeaderPropsType> = ({
  title,
  preTitle,
  sx,
  description,
  children,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: [4, 4, 7],
        ...sx,
      }}
    >
      <Typography
        component="span"
        sx={{
          color: "common.gray",
          fontSize: [12, 12, 14],
          fontWeight: 400,
          lineHeight: "17px",
          letterSpacing: "5px",
          m: 0,
        }}
      >
        {!preTitle || preTitle.length === 0 ? "PERSEUS" : preTitle}
      </Typography>
      {title && (
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: [26, 26, 40],
            mt: [0.85, 0.85, 1.8],
            mb: [1.5, 1.5, 2],
          }}
        >
          {title}
        </Typography>
      )}

      {children && <Box>{children}</Box>}
      {description && (
        <Typography
          component="span"
          sx={{
            fontWeight: 300,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: 0.5,
            color: "common.lightGray",
            m: 0,
          }}
        >
          <MarkdownParser>{description}</MarkdownParser>
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
