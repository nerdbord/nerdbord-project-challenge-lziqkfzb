'use client';

import { Trash } from '@/components/icons/Trash';

interface LinkButtonProps {
  form: unknown;
  host: string;
}

export const FormCard = ({ form, host }: LinkButtonProps) => {
  const handleCopyClick = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('Tekst został skopiowany do schowka!');
      })
      .catch((err) => {
        console.error('Błąd podczas kopiowania tekstu: ', err);
      });
  };
  return (
    <li
      className="flex shrink grow flex-col gap-1 rounded-lg border border-[#e4e7ec] bg-white p-4"
      key={form.id}
      onClick={() => handleCopyClick(`${host}/fill-form/${form.id}`)}
    >
      <div className="mb-4 flex justify-between text-lg font-bold leading-normal text-[#344053]">
        <div>{form.name}</div>
        <div>
          <Trash />
        </div>
      </div>
      <div>
        <p className="text-sm font-normal leading-3 text-[#475466]">Link to form</p>
        <h5 className="text-base font-medium leading-normal text-[#344053]">{`${host}/fill-form/${form.id}`}</h5>
      </div>
    </li>
  );
};
