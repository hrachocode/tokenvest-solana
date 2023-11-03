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
    <>
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
    </>
  );
};

export default TvHomePageCard;
