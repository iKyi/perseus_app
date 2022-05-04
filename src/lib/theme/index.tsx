import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeOptions,
} from "@mui/material";
import { Theme, ThemeProvider } from "@mui/system";
import React, { createContext, ReactNode, useMemo, useState } from "react";
import { PerseusColorsGetter } from "./pallette";

export enum FONTS {
  LATO = "Lato, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  POPPINS = "Poppins, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {}
}

let ImmortalMuITheme = createTheme({
  typography: {
    fontFamily: FONTS.LATO,
    h1: {
      fontFamily: FONTS.LATO,
    },
    h2: {
      fontFamily: FONTS.LATO,
    },
    h3: {
      fontFamily: FONTS.LATO,
    },
    h4: {
      fontFamily: FONTS.LATO,
    },
    h5: {
      fontFamily: FONTS.LATO,
    },
    h6: {
      fontFamily: FONTS.LATO,
    },
  },
  shape: {
    borderRadius: 4,
  },
});

// const gradientValuesBorder = {
//   // border: "1px solid transparent",
//   borderImageSlice: 1,
//   borderImageSource:
//     "linear-gradient(103.91deg, #8F3CDD 21.01%, rgba(48, 129, 237, 0.8) 100%)",
// };

const getOverRides = (theme: Theme) => {
  const ThemeObj: Partial<ThemeOptions> = {
    components: {
      MuiOutlinedInput: {
        variants: [
          {
            props: {
              color: "primary",
            },
            style: {
              "&.MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  border: "1px solid",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(103.91deg, #8F3CDD 21.01%, rgba(48, 129, 237, 0.8) 100%)",
                },
              },
            },
          },
        ],
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            button: {
              fontSize: "1.05rem",
              "&:first-of-type": {
                clipPath:
                  "polygon(1px 1px, calc(0% + 10px) 1px, calc(100% - 2px) 1px, calc(100% - 2px) calc(100% - 1px),calc(0% + 10px) calc(100% - 1px), 1px calc(100% - 10px))",
              },
              clipPath:
                "polygon(1px 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - 1px), 1px calc(100% - 1px))",
              "&:last-of-type": {
                clipPath:
                  "polygon(2px 1px, calc(100% - 10px) 1px, calc(100% - 1px) calc(0% + 10px), calc(100% - 1px) calc(100% - 10px), calc(100% - 1px) calc(100% - 1px), 2px calc(100% - 1px));",
              },
            },
          },
        },
      },
      MuiChip: {
        variants: [],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "outlined", color: "primary" },
            style: {
              color: theme.palette.primary.contrastText,
            },
          },
          {
            props: { variant: "outlined", color: "secondary" },
            style: {
              color: theme.palette.primary.contrastText,
            },
          },
          // {
          //   props: { variant: "angled", color: "primary" },
          //   style: {
          //     paddingTop: theme.spacing(1.5),
          //     color: theme.palette.common.white,
          //     "&:hover": {
          //       backgroundColor: "transparent",
          //     },
          //   },
          // },
        ],
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: "600",
            fontFamily: FONTS.LATO,
            lineHeight: 1,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(1px)",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // background: `url(${MainBg}),linear-gradient(180deg, #023733 0%, #000C09 100%)`,
            backgroundAttachment: "fixed",
            backgroundPosition: "top center",
          },
          html: {
            height: "100%",
          },
          "& #root": {
            position: "relative",
            zIndex: 2,
            flex: "1",
            display: "flex",
            flexDirection: "column",
          },
          p: {
            margin: 0,
          },
          ".TP": {
            color: theme.palette.primary.main,
          },
          ".TS": {
            color: theme.palette.secondary.main,
          },
          ".TW": {
            color: theme.palette.common.white,
          },
          ".TE": {
            color: theme.palette.error.main,
          },
          h1: {
            fontFamily: FONTS.LATO,
          },
          h2: {
            fontFamily: FONTS.LATO,
          },
          h3: {
            fontFamily: FONTS.LATO,
          },
          h4: {
            fontFamily: FONTS.LATO,
          },
          h5: {
            fontFamily: FONTS.LATO,
          },
          h6: {
            fontFamily: FONTS.LATO,
          },
          // ".wallet-adapter-button.loginButtonSmall": {
          //   background: `url('${RedSharp}')`,
          //   backgroundSize: "100% 100%",
          //   height: "24px",
          //   padding: "0 15px 0px 10px",
          // },
          // ".wallet-adapter-button.loginButton": {
          //   background: `url('${complexRed}')`,
          //   backgroundSize: "100% 100%",
          //   height: "60px",
          //   padding: "0 30px",
          // },
          // ".wallet-adapter-button.logoutButton": {
          //   background: `url('${RedSharp}')`,
          //   backgroundSize: "100% 100%",
          //   fontSize: "0.9rem",
          //   height: "36px",
          // },

          // "@keyframes hackEffect": {
          //   "0%": {
          //     background: theme.palette.primary.main,
          //     transform: "scale(0.9) rotate(45deg)",
          //     boxShadow: `0px 0px 20px 3px ${theme.palette.error.main}`,
          //   },
          // },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.secondary.main,
            paddingTop: "6px",
            paddingBottom: "6px",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:last-of-type": {
              td: {
                borderColor: "transparent",
              },
            },
          },
        },
      },
    },
  };
  return ThemeObj;
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const PerseusThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => {
    const palette = PerseusColorsGetter(mode);
    const themeObj = { ...ImmortalMuITheme, ...palette };
    return createTheme(themeObj, getOverRides(themeObj));
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default PerseusThemeProvider;
