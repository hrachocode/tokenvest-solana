import Image from "next/image";
interface ITvButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customVariant?: "primaryButton" | "secondaryButton",
  icon?: string;
  animationCustomVariant?: string;
  animationBorderColor?: string;
}

export const TvButton = (props: ITvButtonProps): JSX.Element => {
  const { customVariant = "primaryButton", animationCustomVariant = "animationPrimaryButton", animationBorderColor, icon, ...rest } = props;
  const buttonClasses = animationBorderColor === "#09202F" ? "before:hover:border-[#09202F]" : "before:hover:border-[#26545b]";
  return (
    <div className={`${customVariant}`}>
      {icon && <Image alt="leftAngle" src={icon} className="absolute top-[7px] left-[5px]" />}
      <button {...rest} className={`${animationCustomVariant} ${buttonClasses}`} style={{ paddingLeft: `${icon ? "35px" : ""}` }}>
        <span className="flex skew-x-[12deg]">
          {props.children}
        </span>
      </button>
    </div>
  );
};

