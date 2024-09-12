'use client';

import { Trash } from '@/components/icons/Trash';
import { deleteForm } from '@/lib/supabase/supabaseRequests';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal';
import { useState } from 'react';
import { Button } from '@/components/Button';
interface LinkButtonProps {
  formId: string;
  name: string;
  host: string;
}

export const FormCard = ({ formId, name, host }: LinkButtonProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
    const error = await deleteForm(formId);

    if (error) {
      toast.error('Somthing went wrong');
      console.log(error);
    } else {
      toast.success('Form deleted properly');
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <li
        className="flex shrink grow flex-col gap-1 rounded-lg border border-gray bg-white p-4"
        key={formId}
        onClick={() => handleCopyClick(`${host}/fill-form/${formId}`)}
      >
        <div className="mb-4 flex justify-between text-lg font-bold leading-normal text-jeans-dark">
          <div>{name}</div>
          <div onClick={() => setIsDeleteModalOpen(true)}>
            <Trash />
          </div>
        </div>
        <div>
          <p className="text-sm font-normal leading-3 text-jeans">Link to form</p>
          <h5 className="text-base font-medium leading-normal text-jeans-dark">{`${host}/fill-form/${formId}`}</h5>
        </div>
      </li>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <h4 className="mb-[24px] text-center text-base font-semibold text-black">
          Do you want to delete Customer Information Form?
        </h4>
        <div className="flex w-full flex-col gap-[12px]">
          <Button variant="filled" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="white" onClick={closeDeleteModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
