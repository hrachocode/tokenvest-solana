import { ITvHomePageCard } from "@/interfaces/homePageInterface";
import Image from "next/image";

const TvHomePageCard = (
  { customVariant = {
    pageCard: "primaryHomePageCard",
    pageCardTitle: "primaryHomePageCardTitle",
    pageCardDescription: "secondaryHomePageCardDescription"
  },
  cardData = [], alt = "ellipse" }: ITvHomePageCard): JSX.Element => {
  return (
    <div className={`grid lg:grid-cols-2 ${customVariant.pageCard === "primaryHomePageCard" ? "md:grid-cols-2 2xl:grid-cols-4" : " 2xl:grid-cols-2"} gap-[32px]`}>
      {
        cardData.map(({ icon, title, description }, index) => (
          <div key={index} className={customVariant.pageCard}>
            <Image alt={alt} src={icon} className="cursor-pointer hover:animate-spin" />
            <p className={customVariant.pageCardTitle}>{title}</p>
            <p className={customVariant.pageCardDescription}>
              {description}
            </p>
          </div>
        ))
      }
    </div>
  );
};

export default TvHomePageCard;
