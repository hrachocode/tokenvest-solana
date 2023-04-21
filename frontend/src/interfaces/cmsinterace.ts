export interface ICMSProduct {
    id: string;
    attributes: {
        title: string;
        raiseGoal: string;
        sharePercentage: string;
        address: string;
        ownerAddress: string;
        ownerName: string;
        raisedAmount: string;
        createdAt: string;
        image: {
            data: {
                attributes: {
                    url: string
                }
            }
        };
    }
}
export interface IProduct {
    id: string;
    title: string;
    raiseGoal: string;
    sharePercentage: string;
    address: string;
    ownerAddress: string;
    ownerName: string;
    raisedAmount: string;
    image: string | null;
    createdAt: string
}
