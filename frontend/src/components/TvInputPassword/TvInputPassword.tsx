import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { TvInput } from "@/components/TvInput/TvInput";
import { Dispatch, SetStateAction, useState } from "react";

interface TvInputPasswordProps {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    labelName: string;
    placeholderName: string;
}

export const TvInputPassword = ({
  value,
  setValue,
  labelName,
  placeholderName
}: TvInputPasswordProps) => {
  const [ isShowNewPassword, setIsShowNewPassword ] = useState<boolean>(false);

  return (
    <div className="relative">
      <TvInput
        value={value}
        labelName={labelName}
        placeholderName={placeholderName}
        type={isShowNewPassword ? "text" : "password"}
        onChange={({ target: { value = "" } = {} }) => setValue(value)}
      />
      <div
        className="absolute right-[10px] top-[46px] cursor-pointer "
        onClick={() => setIsShowNewPassword(!isShowNewPassword)}
      >
        <FontAwesomeIcon icon={isShowNewPassword ? faEyeSlash : faEye} />
      </div>
    </div>
  );
};
