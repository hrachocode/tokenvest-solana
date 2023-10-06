export interface ITvHomePageCard {
    customVariant?: {
        pageCard?: string,
        pageCardTitle?: string,
        pageCardDescription?: string
    },
    cardData: {
        icon: string,
        title: string,
        description?: string
    }[],
    alt?: string
}
