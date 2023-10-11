const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString([], { month: "long" });
};

export const receiveDate = (dateString: string) => {
  const date = dateString.split("T")[0].split("-");
  date[1] = getMonthName(Number(date[1]));
  const [ year, month, day ] = date;
  return `${month} ${day}, ${year}`;
};
