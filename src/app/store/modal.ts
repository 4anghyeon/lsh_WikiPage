import { create } from 'zustand';
import { ReactElement } from 'react';

interface ModalState {
  modalContent: ReactElement | null;
}

const useModalState = create<ModalState>()(() => ({
  modalContent: null,
}));

export const setModalContent = (modalContent: ReactElement | null) => {
  useModalState.setState(() => ({ modalContent }));
};

export default useModalState;
