'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modalRoot'));
  }, [modalRoot]);

  return modalRoot && isOpen
    ? createPortal(
        <>
          <div
            className="absolute left-0 top-0 h-full w-full bg-black-modal backdrop-blur-lg"
            onClick={onClose}
          ></div>
          <div className="fixed bottom-[20%] mx-auto max-h-[90vh] w-full overflow-auto px-[16px] sm:max-w-[450px]">
            <div className="flex w-full flex-col items-center rounded-3xl bg-white p-[16px]">
              {children}
            </div>
          </div>
        </>,
        modalRoot,
      )
    : null;
};
