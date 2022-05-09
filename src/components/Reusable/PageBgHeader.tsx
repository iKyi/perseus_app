import { Box, Button, Container, Grid, Link as MUILink } from "@mui/material";
import { ReactNode } from "react";
import SectionHeader from "./SectionHeader";
import { Link as RouterLink } from "react-router-dom";
import pageHeaderBgImage from "assets/images/headerImage.png";

export interface IPageHeaderButton {
  buttonText: string;
  buttonUrl?: string;
  disabled?: boolean;
}

export type PageBgHeaderPropsType = {
  title: string;
  preTitle?: string;
  description?: string;
  children?: ReactNode;
  buttonData?: IPageHeaderButton;
  bellowElements?: ReactNode;
};

const PageBgHeader: React.FC<PageBgHeaderPropsType> = ({
  title,
  children,
  description,
  preTitle,
  buttonData,
  bellowElements,
}) => {
  const buttonisLink = buttonData?.buttonUrl?.includes("http");
  const LinkAttribute = buttonisLink
    ? { url: buttonData?.buttonUrl, target: "_blank", rel: "noopener" }
    : { to: buttonData?.buttonUrl };

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        width: 1440,
        maxWidth: "100%",
        margin: "0 auto",
        background: `url('${pageHeaderBgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Box>
          <Grid container spacing={[2, 2, 4]}>
            <Grid item xs={12} sm={12} md={6}>
              <SectionHeader
                title={title}
                description={description}
                preTitle={preTitle}
                sx={{ textAlign: "left" }}
              />
              {buttonData?.buttonText &&
              buttonData.buttonUrl &&
              buttonisLink ? (
                <Button
                  component={MUILink}
                  variant="outlined"
                  size="large"
                  color="secondary"
                  href={buttonData?.buttonUrl}
                  target={"_blank"}
                  rel="noopener"
                  sx={{
                    width: 220,
                    maxWidth: "100%",
                    height: 52,
                  }}
                  {...LinkAttribute}
                  disabled={buttonData.disabled}
                >
                  {buttonData.buttonText}
                </Button>
              ) : buttonData?.buttonText && buttonData.buttonUrl ? (
                <Button
                  component={RouterLink}
                  variant="outlined"
                  size="large"
                  color="secondary"
                  sx={{
                    width: 220,
                    maxWidth: "100%",
                    height: 52,
                  }}
                  to={buttonData.buttonUrl}
                  disabled={buttonData.disabled}
                >
                  {buttonData.buttonText}
                </Button>
              ) : null}
            </Grid>
            {children && (
              <Grid item xs={12} sm={12} md={6}>
                {children}
              </Grid>
            )}
            {bellowElements && (
              <Grid item xs={12}>
                {bellowElements}
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default PageBgHeader;
