import { InputHTMLAttributes } from "react";

interface ITvInputProps extends InputHTMLAttributes<HTMLInputElement> {
  customVariant?: "primaryInput" | "secondaryInput",
  labelName?: string,
  placeholderName?: string
}
export const TvInput = (props: ITvInputProps): JSX.Element => {
  const { customVariant = "primaryInput", placeholderName, labelName, ...rest } = props;
  return (
    <>
      <label>{labelName}</label>
      <input {...rest} placeholder={`${placeholderName ? placeholderName : ""}`} className={`${customVariant}`} />
    </>
  );
};
