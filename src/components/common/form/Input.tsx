import { List, ListInput } from "framework7-react";

export default function Input({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  info,
  disabled,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  type?: string;
  info?: string;
  inputClassName?: string;
  disabled?: boolean;
}) {
  return (
    <List>
      <ListInput
        outline
        label={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        info={info}
        disabled={disabled}
      />
    </List>
  );
}
