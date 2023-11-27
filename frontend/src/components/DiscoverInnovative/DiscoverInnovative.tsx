import RoundedShadow from "../RoundedShadow/RoundedShadow";

const DiscoverInnovative = () => {
  return (
    <section className="secondaryFlex flex-col mt-[80px] lg:mt-[150px] px-[60px] relative">
      <div className="font-[700] text-center">
        <h1>Discover Innovative</h1>
        <h1 className="text-textTertiary">Projects</h1>
      </div>
      <div className="w-full md:w-[60%] text-center mt-[32px]">
        <p className="font-fontSecondary text-textSecondary font-[300] text-[20px] lg:text-[26px]">
          Browse through a diverse range of campaigns that represent
          groundbreaking ideas and projects from innovators worldwide.
          Your support can turn these visions into reality.
        </p>
      </div>
      <RoundedShadow customVariant="secondaryRoundedShadow" />
    </section>
  );
};

export default DiscoverInnovative;
