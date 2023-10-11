import Image from "next/image";
interface ITvButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customVariant?: "primaryButton" | "secondaryButton",
  icon?: string
}

export const TvButton = (props: ITvButtonProps): JSX.Element => {
  const { customVariant = "primaryButton", icon, ...rest } = props;
  return (
    <div className="relative">
      {icon && <Image alt="leftAngle" src={icon} className="absolute top-[7px] left-[5px]" />}
      <button {...rest} className={`${customVariant}`} style={{ paddingLeft: `${icon ? "35px" : ""}` }}>
        {props.children}
      </button>
    </div>

  );
};
