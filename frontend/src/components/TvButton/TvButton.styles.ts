const baseButtonStyles = {
  background: "#A259FF",
  borderRadius: "20px",
  color: "#FFFFFF",
  paddingX: 5,
  border: "2px solid #A259FF",
  ":hover": {
    background: "#2B2B2B"
  }
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
