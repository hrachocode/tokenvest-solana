import { ISelectOption } from "@/interfaces/selectOption";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import { styles } from "./TvSelect.styles";

interface ITvSelect {
    label: string;
    value: string;
    handleChange: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined;
    selectOptions: ISelectOption[];
}

export const TvSelect = ({ label, value, handleChange, selectOptions }: ITvSelect): JSX.Element => {
  return (
    <Select sx={styles.select} variant='standard' value={value} onChange={handleChange} label="Days">
      <InputLabel>{label}</InputLabel>
      {selectOptions.map((item, index) =>
        <MenuItem key={index + 1} value={item.value}>{item.name}</MenuItem>)
      }
    </Select>
  );
};
