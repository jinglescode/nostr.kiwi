import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Icon, List, ListInput } from "framework7-react";

export default function InputSearch({
  value,
  onChange,
  placeholder,
  label,
  info,
  onKeyUp,
  // onKeyDown,
  onValueClear,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  type?: string;
  info?: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  // onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onValueClear?: () => void;
}) {
  return (
    <List className="m-0">
      <ListInput
        outline
        floatingLabel
        label={label}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onInput={onKeyUp}
        value={value}
        info={info}
        clearButton={onValueClear !== undefined}
        onInputClear={onValueClear}
      >
        <Icon f7="search" slot="media" />
      </ListInput>
    </List>
  );
}
