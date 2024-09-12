'use client';

import { Trash } from '@/components/icons/Trash';
import { deleteForm } from '@/lib/supabase/supabaseRequests';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Share } from '@/components/icons/Share';
import { Copy } from '@/components/icons/Copy';
interface LinkButtonProps {
  formId: string;
  name: string;
  host: string;
  prompt: string;
}

export const FormCard = ({ formId, name, host, prompt }: LinkButtonProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success('Tekst został skopiowany do schowka!');
      })
      .catch((err) => {
        toast.error('Błąd podczas kopiowania tekstu: ', err);
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

  const handleCopyFormLink = () => {
    copyToClipboard(`${host}/fill-form/${formId}`);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <>
      <li
        className="flex w-full shrink grow justify-between gap-1 rounded-lg border border-gray bg-white p-4"
        key={formId}
      >
        <div className="mr-[10px] w-full">
          <div className="mb-[2px] text-lg font-bold leading-normal text-jeans-dark">{name}</div>
          <input
            className="w-full text-sm font-normal leading-3 text-jeans"
            value={prompt}
            readOnly
          />
        </div>
        <div>
          <div onClick={() => setIsDeleteModalOpen(true)} className="mb-[10px]">
            <Trash />
          </div>
          <div onClick={() => setIsShareModalOpen(true)}>
            <Share />
          </div>
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

      <Modal isOpen={isShareModalOpen} onClose={closeShareModal}>
        <h4 className="mb-[8px] text-center text-base font-semibold text-black">
          Direct link to your form
        </h4>
        {/* <p className="mb-[16px] text-center text-base font-normal text-jeans">
          You can edit the link before sending it.
        </p> */}
        <div>
          <p className="mb-[6px] text-sm font-medium text-jeans-dark">Share link</p>
          <div className="gap=[4px] mb-[24px] flex items-center" onClick={handleCopyFormLink}>
            <div className="rounded-[8px] border border-gray px-[14px] py-[10px]">{`${host}/fill-form/${formId}`}</div>
            <div className="p-[12px]">
              <Copy />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[12px]">
          <Button variant="filled" onClick={handleCopyFormLink}>
            Share
          </Button>
          <Button variant="white" onClick={closeShareModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
