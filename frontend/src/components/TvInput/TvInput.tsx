import { Input, InputProps } from "@mui/material";
import { inputStyles } from "./TvInput.styles";

interface ITvInputProps extends InputProps {
    customVariant?: "primary" | "secondary" | "tertiary";
};

export const TvInput = (props: ITvInputProps): JSX.Element => {
    const { customVariant = "primary", ...rest } = props;
    const styles = inputStyles[customVariant as keyof typeof inputStyles];
    return (
        <Input {...rest} sx={styles} />
    );
};
