import { Button, ButtonProps } from "@mui/material";
import { buttonStyles } from './TvButton.styles';

interface ITvButtonProps extends ButtonProps {
    customVariant?: "primary" | "secondary" | "tertiary";
};

export const TvButton = (props: ITvButtonProps): JSX.Element => {
    const { customVariant = "primary", ...rest } = props;
    const styles = buttonStyles[customVariant as keyof typeof buttonStyles];
    return (
        <Button {...rest} sx={styles}>
            {props.children}
        </Button>
    )
};