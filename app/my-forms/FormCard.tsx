'use client';

import { Trash } from '@/components/icons/Trash';
import toast from 'react-hot-toast';

interface LinkButtonProps {
  formId: string;
  name: string;
  host: string;
}

export const FormCard = ({ formId, name, host }: LinkButtonProps) => {
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

  const handleDelete = async () => {
    await fetch('/api/delete-form', {
      method: 'POST',
      body: JSON.stringify({
        formId,
      }),
    })
      .then((response) => {
        response.json().then((json) => {
          toast.success('Poprawnie usunięty');
        });
      })
      .catch((error) => {
        toast.error('Formularz okazał się trudniejszy do usunięcia niż nam się wydawało');
      });
  };
  return (
    <li
      className="flex shrink grow flex-col gap-1 rounded-lg border border-gray bg-white p-4"
      key={formId}
      onClick={() => handleCopyClick(`${host}/fill-form/${formId}`)}
    >
      <div className="mb-4 flex justify-between text-lg font-bold leading-normal text-jeans-dark">
        <div>{name}</div>
        <div onClick={handleDelete}>
          <Trash />
        </div>
      </div>
      <div>
        <p className="text-sm font-normal leading-3 text-jeans">Link to form</p>
        <h5 className="text-base font-medium leading-normal text-jeans-dark">{`${host}/fill-form/${formId}`}</h5>
      </div>
    </li>
  );
};
