const numberPointLength = (number: number) => {
  return number.toString().split(".")[1].length;
};

export const detectFractionalPart = (num1: number, num2: number) => {
  if (Number.isInteger(num1) || Number.isInteger(num2)) {
    return num1 + num2;
  } else {
    const maxNumberPointLength =
      numberPointLength(num1) > numberPointLength(num2)
        ? numberPointLength(num1)
        : numberPointLength(num2);
    return (num1 + num2).toFixed(maxNumberPointLength);
  }
};
