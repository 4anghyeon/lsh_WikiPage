import { ReactElement } from 'react';
import { setModalContent } from '@/app/store/modal';

export const useModal = () => {
  const showModal = (elem: ReactElement) => {
    setModalContent(elem);
  };

  return { showModal };
};
