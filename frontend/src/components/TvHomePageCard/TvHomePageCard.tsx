import { ITvHomePageCard } from "@/interfaces/homePageInterface";
import Image from "next/image";

const TvHomePageCard = (props: ITvHomePageCard): JSX.Element => {
    const { customVariant = { pageCard: 'primaryHomePageCard', pageCardTitle: 'primaryHomePageCardTitle', pageCardDescription: 'secondaryHomePageCardDescription' }, cardData = [], alt = 'ellipse' } = props;
    return (
        <>
            {
                cardData.map(({ icon, title, description }, index) => (
                    <div key={index} className={customVariant.pageCard}>
                        <Image alt={alt} src={icon} />
                        <p className={customVariant.pageCardTitle}>{title}</p>
                        <p className={customVariant.pageCardDescription}>
                            {description}
                        </p>
                    </div>
                ))
            }
        </>
    )
}

export default TvHomePageCard