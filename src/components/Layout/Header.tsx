import Logo from "assets/images/logo_png.png";
import {
  Box,
  Button,
  CardActionArea,
  Drawer,
  IconButton,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import { MenuOpenOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import WalletLoginButtonTheme from "components/Reusable/WalletLoginButtonTheme";
import { styled, useTheme } from "@mui/system";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { getStrapiMedia } from "lib/theme/media";
import SocialList from "components/Reusable/SocialList";
import useScrollPosition from "hooks/useScrollPosition";

export interface IHeaderLink {
  name: string;
  url: string;
}

export const NavLinks: IHeaderLink[] = [
  {
    name: "HOME",
    url: "/",
  },
  {
    name: "PERSEUS TOKEN",
    url: "/token",
  },
  // {
  //   name: "NFTs",
  //   url: "/nfts",
  // },
  {
    name: "PORTFOLIO",
    url: "/portfolio",
  },
  {
    name: "ABOUT US",
    url: "/about-us",
  },
  {
    name: "ROADMAP",
    url: "/roadmap",
  },
];

const StyledMiddleNavLink = styled(NavLink)(({ theme }) => ({
  "&:not(:last-of-type)": {
    marginRight: theme.spacing(2),
  },
  textDecoration: "none",
}));

export type HeaderPropsType = {};

const lateralWidthStyle = {
  width: [100, 100, 250],
  flex: [1, 1, "initial"],
};

const Header: React.FC<HeaderPropsType> = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const globalCtx = useContext(StrapiContext);
  const scrollPosition = useScrollPosition();

  const { logo: strapiLogo, socials } = globalCtx;

  const [mobileOpen, setMobileOpen] = useState(false);

  const isScrolledDown = scrollPosition > 100;

  // *************** RENDER *************** //
  return (
    <>
      <Box
        component="header"
        sx={{
          transition: "all .2s",
          display: "flex",
          alignItems: "center",
          py: isScrolledDown ? [1.5, 1.5, 1.8] : [2.5, 2.5, 4],
          px: [1, 1, 1.5],
          width: 1200,
          maxWidth: "100%",
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          bgcolor: isScrolledDown ? `rgba(0,0,0,0.75)` : undefined,
          backdropFilter: isScrolledDown
            ? "blur(8px) grayscale(0.3)"
            : undefined,
        }}
      >
        <Box
          sx={{
            ...lateralWidthStyle,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CardActionArea component={NavLink} to="/" sx={{ width: "auto" }}>
            <img
              src={strapiLogo ? getStrapiMedia(strapiLogo) : Logo}
              alt="Perseus logo"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: 160,
              }}
            />
          </CardActionArea>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: ["none", "none", "block"],
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {NavLinks.map((item) => {
              return (
                <StyledMiddleNavLink key={item.url} to={item.url}>
                  {({ isActive }) => {
                    return (
                      <Button
                        sx={{
                          textTransform: "uppercase",
                          color: "#fff",
                          fontWeight: "400",
                          fontSize: ["0.85rem", "0.85rem", "0.9rem"],
                          borderBottom: "2px solid",
                          borderRadius: 0,
                          paddingLeft: 0,
                          paddingRight: 0,
                          minWidth: 0,
                          borderColor: isActive
                            ? "primary.main"
                            : "transparent",
                          background: isActive
                            ? "linear-gradient(103.91deg, #8F3CDD 21.01%, rgba(48, 129, 237, 0.8) 100%)"
                            : undefined,
                          backgroundClip: isActive ? "text" : undefined,
                          textFillColor: isActive ? "transparent" : undefined,
                          "&:hover": {
                            background:
                              "linear-gradient(103.91deg, #8F3CDD 21.01%, rgba(48, 129, 237, 0.8) 100%)",
                            backgroundClip: "text",
                            textFillColor: "transparent",
                          },
                        }}
                      >
                        {item.name}
                      </Button>
                    );
                  }}
                </StyledMiddleNavLink>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            ...lateralWidthStyle,
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {socials && !mobile && (
            <SocialList
              twitter={socials.twitter}
              discord={socials.discord}
              sx={{ display: "inline-flex", mr: 1.5 }}
            />
          )}
          <WalletLoginButtonTheme />
          <IconButton
            sx={{
              ml: 2,
              display: ["inline-flex", "inline-flex", "none"],
            }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuOpenOutlined color="inherit" fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <Drawer
        anchor={"right"}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <List>
          {NavLinks.map((item) => (
            <ListItem key={item.url}>
              <NavLink
                to={item.url}
                onClick={() => {
                  setMobileOpen(false);
                }}
                style={{
                  textDecoration: "none",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {({ isActive }) => {
                  return (
                    <Button
                      fullWidth
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: "600",
                        fontSize: ["0.85rem", "0.85rem", "0.9rem"],
                        color: isActive ? "primary.main" : "#fff",
                        textAlign: "left!important" as "left",
                        justifyContent: "flex-start",
                        "&:hover": {
                          background:
                            "linear-gradient(103.91deg, #8F3CDD 21.01%, rgba(48, 129, 237, 0.8) 100%)",
                          backgroundClip: "text",
                          textFillColor: "transparent",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  );
                }}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
