interface ITvButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customVariant?: "primaryButton" | "secondaryButton"
}
export const TvButton = (props: ITvButtonProps): JSX.Element => {
  const { customVariant = "primaryButton", ...rest } = props;
  return (
    <button {...rest} className={customVariant}>
      {props.children}
    </button>

  );
};
