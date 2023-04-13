import { Input, InputProps } from "@mui/material";
import { inputStyles } from "./TvInput.styles";

interface ITvInputProps extends InputProps {
  customVariant?: "primary" | "secondary" | "tertiary";
};

export const TvInput = (props: ITvInputProps): JSX.Element => {
  const { customVariant = "primary", ...rest } = props;
  return (
    <Input  {...rest} sx={inputStyles[customVariant as keyof typeof inputStyles]}
    />
  );
};
