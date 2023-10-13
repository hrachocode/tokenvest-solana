export const getProgress = (resRaisedAmount: number, raiseGoal: string) => {
  const resProgres = (resRaisedAmount / +raiseGoal) * 100;
  return resProgres < 100 ? resProgres : 100;
};
