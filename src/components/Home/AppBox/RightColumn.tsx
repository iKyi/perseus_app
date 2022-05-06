import { Box, SxProps, Typography } from "@mui/material";
import SectionHeader from "components/Reusable/SectionHeader";
import { VerifiedUser } from "@mui/icons-material";
import { centerFlex } from "utils/sxUtils";
import { FONTS } from "lib/theme";

const BulletItem: React.FC<{
  title: string;
  preTitle: string;
  sx?: SxProps;
}> = ({ preTitle, title, sx: propsSx }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        mr: 2,
        ...propsSx,
      }}
    >
      <Box
        sx={{
          border: "1px solid",
          borderImageSlice: 1,
          borderImageSource:
            "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
          backdropFilter: "blur(642.519px)",
          width: 56,
          height: 52,
          ...centerFlex,
          fontSize: "1.6rem",
          mr: 2,
        }}
      >
        <VerifiedUser color="inherit" fontSize="inherit" />
      </Box>
      <Box sx={{ fontFamily: FONTS.POPPINS }}>
        <Typography sx={{ fontSize: "0.85rem", fontWeight: 300 }}>
          {preTitle}
        </Typography>
        <Typography>{title}</Typography>
      </Box>
    </Box>
  );
};

export type RightColumnPropsType = {
  bulletPoints?: any[];
  comingSoonText?: any;
  gplayUrl?: string;
  released?: boolean;
  appleUrl?: string;
};

const RightColumn: React.FC<RightColumnPropsType> = ({
  bulletPoints,
  comingSoonText,
  gplayUrl,
  released,
  appleUrl,
}) => {
  // *************** RENDER *************** //
  return (
    <Box sx={{ p: [1, 1, 0] }}>
      <SectionHeader {...comingSoonText} sx={{ textAlign: "left" }} />
      {bulletPoints && (
        <Box>
          {bulletPoints.map((item) => (
            <BulletItem key={item.id} {...item} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RightColumn;
