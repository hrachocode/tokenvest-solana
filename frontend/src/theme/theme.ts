import React from "react";
import { createTheme } from "@mui/material";
import { typography } from "./typography";

type Color = React.CSSProperties["color"];
declare module "@mui/material/styles" {
  interface PaletteOptions {
    backgroundPrimary: Color;
    backgroundSecondary: Color;
    caption: Color;
    textPrimary: Color;
    callToAction: Color;
  }
}

export const theme = createTheme({
  palette: {
    backgroundPrimary: "#2B2B2B",
    backgroundSecondary: "#3B3B3B",
    caption: "#858584",
    textPrimary: "#FFFFFF",
    callToAction: "#A259FF"
  },
  typography,
  spacing: 10
});

export interface ICustomTheme {
  palette: {
    backgroundPrimary: Color;
    backgroundSecondary: Color;
    caption: Color;
    textPrimary: Color;
    callToAction: Color;
  }
}
