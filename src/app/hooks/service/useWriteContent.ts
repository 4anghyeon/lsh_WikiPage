import { useInsertWiki } from '@/app/hooks/query/wiki/useSetWiki';
import { setModalContent } from '@/app/store/modal';
import { validationText } from '@/app/lib/utils';
import { RefObject, useEffect } from 'react';
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '@/app/components/wiki/modal/WriteContent';

interface PropsType {
  titleRef: RefObject<HTMLInputElement>;
  contentRef: RefObject<HTMLTextAreaElement>;
}

export const useWriteContent = ({ titleRef, contentRef }: PropsType) => {
  const { addWiki, isAddSuccess, isAddPending } = useInsertWiki();

  const handleClickCancel = () => {
    setModalContent(null);
  };

  const handleClickEnroll = () => {
    if (isAddPending) return;
    if (!validationText({ name: '강의명', text: titleRef.current!.value, maxLength: MAX_TITLE_LENGTH })) return;
    if (!validationText({ name: '강의 설명', text: contentRef.current!.value, maxLength: MAX_CONTENT_LENGTH })) return;

    addWiki({
      title: titleRef.current!.value,
      content: contentRef.current!.value,
    });
  };

  useEffect(() => {
    if (isAddSuccess) {
      setModalContent(null);
      alert('등록 되었습니다!');
    }
  }, [isAddSuccess]);

  return { handleClickCancel, handleClickEnroll, isAddPending };
};
