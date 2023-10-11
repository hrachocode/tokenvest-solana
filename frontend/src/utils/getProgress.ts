export const getProgress = (resRaisedAmount: number, raiseGoal: string) => {
  return (resRaisedAmount / +raiseGoal) * 100;
};
