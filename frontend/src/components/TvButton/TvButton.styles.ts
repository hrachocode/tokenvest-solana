import { ICustomTheme } from "@/theme/theme";

const baseButtonStyles = {
  backgroundColor: "callToAction",
  borderRadius: "20px",
  color: "textPrimary",
  paddingX: 5,
  border: (theme: ICustomTheme) => `2px solid ${theme.palette.callToAction}`,
  ":hover": {
    backgroundColor: "backgroundPrimary",
  },
};

const primaryButtonStyles = {
  ...baseButtonStyles,
  minHeight: 72,
  fontWeight: 600,
  fontSize: 22,
};

const secondaryButtonStyles = {
  ...baseButtonStyles,
  minHeight: 60,
  fontWeight: 600,
  fontSize: 16,
};

const tertiaryButtonStyles = {
  ...baseButtonStyles,
  minHeight: 46,
  fontWeight: 600,
  fontSize: 16,
};

export const buttonStyles = {
  primary: primaryButtonStyles,
  secondary: secondaryButtonStyles,
  tertiary: tertiaryButtonStyles,
};
