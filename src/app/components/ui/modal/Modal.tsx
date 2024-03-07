'use client';

import React, { useRef } from 'react';
import useModalState, { setModalContent } from '@/app/store/modal';

const Modal = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContent = useModalState(state => state.modalContent);

  const handleClickOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) setModalContent(null);
  };

  return (
    <>
      {modalContent && (
        <div
          className="fixed bg-slate-400/25 w-full h-full z-20 top-0 flex justify-center items-center"
          ref={overlayRef}
          onClick={handleClickOverlay}
        >
          <div className="w-1/2 h-2/3 bg-white rounded-lg p-10">{modalContent}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
