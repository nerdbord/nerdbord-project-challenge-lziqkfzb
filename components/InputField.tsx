import { ChangeEvent } from 'react';
interface InputFieldProps {
  placeholder?: string;
  name: string;
  label?: string;
  type?:
    | 'date'
    | 'email'
    | 'password'
    | 'number'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | 'month'
    | 'tel';
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const InputField = ({
  placeholder,
  name,
  label,
  type = 'text',
  value,
  onChange,
  required,
}: InputFieldProps) => {
  return (
    <>
      {label && (
        <label className="mb-[6px] text-sm font-medium leading-tight text-black" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className="w-full text-ellipsis rounded-lg border border-[#cfd4dc] bg-white px-[14px] py-[10px] text-base font-normal leading-normal placeholder:text-[#666666]"
        placeholder={placeholder}
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
};
