import { SxProps, Theme } from "@mui/material";

export const centerFlex: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const flexColumn: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
};

export const flexBetween: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
