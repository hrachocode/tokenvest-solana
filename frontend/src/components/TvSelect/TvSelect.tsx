import { ISelectOption } from "@/interfaces/selectOption";
import daysIcon from "../../../public/images/days.svg";
import Image from "next/image";
import { ChangeEvent } from "react";

interface ITvSelect {
  labelName: string;
  value: string;
  addIcon?: boolean;
  handleChange: ((event: ChangeEvent<HTMLSelectElement>) => void)
  selectOptions: ISelectOption[];
  customVariant?: "primarySelect" | "secondarySelect",
}

export const TvSelect = (props: ITvSelect): JSX.Element => {
  const { customVariant = "primarySelect", labelName, addIcon, value, handleChange, selectOptions } = props;
  return (
    <div className="relative">
      <label form="countries">{labelName}</label>
      {addIcon && <Image src={daysIcon} alt="days" className="absolute bottom-[33px] left-[10px]" />}
      <select value={value} onChange={handleChange} id="countries" className={customVariant}>
        <option disabled>{labelName}</option>
        {selectOptions.map((item, index) =>
          <option key={index + 1} value={item.value} >{item.name}</option>)
        }
      </select>
    </div>
  );
};
