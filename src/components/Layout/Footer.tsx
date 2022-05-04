import Logo from "assets/images/logo_png.png";
import {
  Box,
  Container,
  Divider,
  Grid,
  SxProps,
  Typography,
} from "@mui/material";
import MarkdownParser from "components/Reusable/MarkdownParser";
import { ReactNode } from "react";
import SocialList from "components/Reusable/SocialList";

export type FooterPropsType = {
  text?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
};

const getYearsValue = () => {
  const currentYear = new Date().getFullYear();
  return currentYear !== 2022 ? `2022 - ${currentYear}` : currentYear;
};

const FooterTitle: React.FC<{ children: ReactNode; sx?: SxProps }> = ({
  children,
  sx,
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        fontWeight: 300,
        fontSize: "18px",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const Footer: React.FC<FooterPropsType> = ({ socialLinks, text }) => {
  // *************** RENDER *************** //
  return (
    <Box component="footer" sx={{ pb: [4, 4, 6] }}>
      <Container>
        <Divider sx={{ mb: [4, 4, 6] }} />
        <Grid container rowSpacing={[2, 2, 0]}>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "100%", height: "auto", maxWidth: "200px" }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: 14,
                color: "common.gray",
                mt: 1.5,
                fontWeight: 300,
              }}
            >{`© ${getYearsValue()} by Perseusfintech.com`}</Typography>
          </Grid>
          {text && (
            <Grid item xs={12} sm={6} md={4}>
              <FooterTitle>Contact</FooterTitle>
              <Box
                sx={{
                  color: "common.gray",
                  fontWeight: 300,
                }}
              >
                <MarkdownParser>{text}</MarkdownParser>
              </Box>
            </Grid>
          )}
          {socialLinks && (
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: [undefined, undefined, "right"],
                }}
              >
                <FooterTitle>Social media</FooterTitle>
                <SocialList {...socialLinks} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
