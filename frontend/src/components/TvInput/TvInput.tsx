import { InputHTMLAttributes } from "react";

interface ITvInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  customVariant?: "primaryInput" | "secondaryInput",
  labelName?: string,
  placeholderName?: string,
  isTextArea?: boolean,
}
export const TvInput = (props: ITvInputProps): JSX.Element => {
  const { customVariant = "primaryInput", placeholderName, labelName, isTextArea, ...rest } = props;
  return (
    <>
      <label>{labelName}</label>
      {
        isTextArea ?
          <textarea {...rest} placeholder={`${placeholderName ? placeholderName : ""}`} className={`${customVariant}`} /> :
          <input {...rest} placeholder={`${placeholderName ? placeholderName : ""}`} className={`${customVariant}`} />
      }

    </>
  );
};
