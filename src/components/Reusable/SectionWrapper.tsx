import { SxProps, Box } from "@mui/material";
import { ReactNode } from "react";
import SectionHeader from "./SectionHeader";

export type SectionWrapperPropsType = {
  title: string;
  preTitle?: string;
  description?: string;
  sx?: SxProps;
  children?: ReactNode;
  id?: string;
};

const SectionWrapper: React.FC<SectionWrapperPropsType> = ({
  title,
  preTitle,
  description,
  sx,
  children,
  id,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        ...sx,
      }}
      id={id ?? undefined}
    >
      <SectionHeader
        title={title}
        description={description}
        preTitle={preTitle}
      />
      {children}
    </Box>
  );
};

export default SectionWrapper;
