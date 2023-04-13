const baseInputStyles = {
  "::before": {
    display: "none"
  },
  "::after": {
    display: "none"
  },
  minHeight: 46,
  borderRadius: "20px",
  paddingX: 2,
  backgroundColor: "common.white"
};

const primaryInputStyles = {
  ...baseInputStyles,
  minHeight: 72,
  fontWeight: 600,
  fontSize: 22,
};

const secondaryInputStyles = {
  ...baseInputStyles,
  minHeight: 60,
  fontWeight: 600,
  fontSize: 16,
};

const tertiaryInputStyles = {
  ...baseInputStyles,
  minHeight: 46,
  fontWeight: 400,
  fontSize: 16,
};

export const inputStyles = {
  primary: primaryInputStyles,
  secondary: secondaryInputStyles,
  tertiary: tertiaryInputStyles
};
