import { ReactNode } from 'react';
import clsx from 'clsx';

interface InputFieldProps {
  placeholder?: string;
  name: string;
  label: string;
}

export const InputField = ({ placeholder, name, label }: InputFieldProps) => {
  return (
    <>
      <label className="mb-[6px] text-sm font-medium leading-tight text-black" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full text-ellipsis px-[14px] py-[10px] text-base font-normal leading-normal placeholder:text-[#666666]"
        placeholder={placeholder}
        name={name}
        id={name}
      />
    </>
  );
};
