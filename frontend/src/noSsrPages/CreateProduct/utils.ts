export const inputValidator = (sharePercentage: string) => {
    if (Number(sharePercentage) > 100 || Number(sharePercentage) < 0) {
        return {
            success:false,
            message:"Share percentage must be between 0 and 100"
        };
    } else {
        return {
            success:true
        }
    }
};