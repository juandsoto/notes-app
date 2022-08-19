import { useAutocomplete } from "@mui/material";
import { DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { CategorySchema } from "../types";
import { FirstLetterToUppercase } from "../utils/index";

interface Props {
  handleChange: (value: string) => void;
  value: string;
  inputProps: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

const AutocompleteInput = ({ inputProps, handleChange, value }: Props) => {
  const { data: currentCategories = [] } = useFetch<CategorySchema[]>(["categories"], "/categories");
  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: currentCategories,
    onInputChange: (e, value, reason) => handleChange(value),
    clearOnBlur: false,
    getOptionLabel: option => option.name,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...inputProps} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className="px-1 w-[200px] z-10 absolute max-h-[200px] overflow-y-scroll bg-slate-50 rounded-lg" {...getListboxProps()}>
          {(groupedOptions as typeof currentCategories)
            .sort((a, b) => 0 - (a.name > b.name ? -1 : 1))
            .map((option, index) => (
              <li className="cursor-pointer" {...getOptionProps({ option, index })}>
                {FirstLetterToUppercase(option.name)}
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
};

export default AutocompleteInput;
