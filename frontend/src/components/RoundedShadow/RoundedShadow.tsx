interface IRoundShadowProps {
  customVariant?: "primaryRoundedShadow" | "secondaryRoundedShadow" | "tertiaryRoundedShadow",
}
const RoundedShadow = (props: IRoundShadowProps): JSX.Element => {
  const { customVariant = "primaryRoundedShadow" } = props;
  return (
    <div className={`${customVariant}`}>
      <div
        className="w-[300px] h-[300px] lg:w-[561px] lg:h-[561px] rounded-[50%] opacity-[0.41] bg-blend-screen mix-blend-screen bg-gradientPrimary">
      </div>
    </div>
  );
};

export default RoundedShadow;
