export interface IUnsubRes {
    status: {
        isInBlock: boolean;
        isFinalized: boolean;
    };
    contract?: {
        address: Uint32Array;
    };
};
