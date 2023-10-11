export const getDaysLeft = (createdAt: string, days: string) => {
  const currentDate = new Date().getTime();
  const createdAtDate = new Date(createdAt).getTime();
  const resDaysLeft = Math.ceil(
    +days - (currentDate - createdAtDate) / (24 * 60 * 60 * 1000)
  );

  return resDaysLeft;
};
