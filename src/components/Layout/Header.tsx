import Logo from "assets/images/logo_png.png";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { MenuOpenOutlined } from "@mui/icons-material";
import { useNavigate, NavLink } from "react-router-dom";
import WalletLoginButtonTheme from "components/Reusable/WalletLoginButtonTheme";

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
  {
    name: "NFTs",
    url: "/nfts",
  },
  {
    name: "PROJECTS",
    url: "/projects",
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

export type HeaderPropsType = {};

const lateralWidthStyle = {
  width: [100, 100, 200],
  flex: [1, 1, "initial"],
};

const Header: React.FC<HeaderPropsType> = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const onTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    console.log(event, value);
  };

  // *************** RENDER *************** //
  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          py: [2.5, 2.5, 4],
          px: [0.2, 0.2, 1.5],
        }}
      >
        <Box
          sx={{
            ...lateralWidthStyle,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Perseus logo"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: 160,
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: ["none", "none", "block"],
          }}
        >
          {/* <Stack direction={"row"} justifyContent="center"> */}
          <TabsContext value={pathname}>
            <Tabs onChange={onTabChange}>
              {NavLinks.map((item, index) => {
                return <Tab label={item.name} />;
              })}
            </Tabs>
          </TabsContext>

          {/* </Stack> */}
          {/* <NavLink key={item.url} to={item.url}>
                {({ isActive }) => {
                  return (
                    <Button
                      sx={{
                        textTransform: "uppercase",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: ["0.85rem", "0.85rem", "0.9rem"],
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
              </NavLink> */}
        </Box>
        <Box
          sx={{
            ...lateralWidthStyle,
            textAlign: "right",
          }}
        >
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
              <Button
                onClick={() => {
                  navigate(item.url);
                  setMobileOpen(false);
                }}
                sx={{
                  textTransform: "uppercase",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: ["0.85rem", "0.85rem", "0.9rem"],
                  "&:hover": {
                    background:
                      "linear-gradient(103.91deg, #8F3CDD 21.01%, rgba(48, 129, 237, 0.8) 100%)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                  },
                }}
                key={item.url}
              >
                {item.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
