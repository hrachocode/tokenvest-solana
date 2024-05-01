export interface ICMSProduct {
  id: string;
  attributes: {
    title: string;
    raiseGoal: string;
    address: string;
    ownerAddress: string;
    ownerName: string;
    raisedAmount: string;
    createdAt: string;
    description: string;
    days: string;
    isComplete: boolean;
    isExpired: boolean;
    isDraft: boolean;
    isReady: boolean;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          title: string;
          url: string;
        };
      };
    };
    product_user: {
      name: string;
      title: string;
      country: string;
      city: string;
    };
  };
}

export interface ICMSCategory {
  id: string;
  attributes: {
    title: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
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
  address: string;
  ownerAddress: string;
  ownerName: string;
  raisedAmount: number;
  image: string | null;
  createdAt: string;
  description: string;
  days: string;
  isComplete: boolean;
  isExpired: boolean;
  isDraft: boolean;
  isReady: boolean;
  category: string;
  content?: any;
  video?: any;
  productUser?: any;
}

export interface IProductDate {
  id: string;
  ownerAddress: string;
  endDate: number;
}

export interface ICMSNotification {
  id: number;
  attributes: {
    message: String;
    isOpened: boolean;
    productId: String;
  };
}

export interface INotification {
  id: number;
  productId: string;
  message: String;
  openedStatus: boolean;
}
