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
        description: string;
        days: string;
        isComplete: boolean;
        image: {
            data: {
                attributes: {
                    url: string
                }
            }
        };
        category: {
            data: {
                attributes: {
                    title: string;
                    url: string;
                }
            }
        }
    }
}

export interface ICMSCategory{
    id:string;
    attributes:{
        title:string;
        image: {
            data: {
                attributes: {
                    url: string
                }
            }
        };
    }
}

export interface ICategory {
    id: string;
    title: string;
    image: string | null;
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
    createdAt: string;
    description: string;
    days: string;
    isComplete: boolean;
    category: string;
}
