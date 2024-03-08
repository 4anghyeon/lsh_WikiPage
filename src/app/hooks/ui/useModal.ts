import { ReactElement } from 'react';
import { setModalContent } from '@/app/store/modal';

/**
 * Modal창을 열기 위한 hook
 */
export const useModal = () => {
  // 모달로 띄울 컴포넌트를 넘긴다.
  const showModal = (elem: ReactElement) => {
    setModalContent(elem);
  };

  return { showModal };
};
