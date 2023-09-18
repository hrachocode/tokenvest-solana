export const addDaysToTimestamp = (days: string) => {
  return Math.floor(+new Date() / 1000) + +days * 24 * 60 * 60;
};
