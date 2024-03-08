import { useInsertWiki } from '@/app/hooks/query/wiki/useSetWiki';
import { validationText } from '@/app/lib/utils';
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '@/app/components/wiki/modal/Editor';
import { useEffect } from 'react';
import { setModalContent } from '@/app/store/modal';
import { EnrollArgsType } from '@/app/types/data';

export const useEnrollWiki = () => {
  const { addWiki, isAddSuccess, isAddPending } = useInsertWiki();

  const handleClickEnroll = ({ titleRef, contentRef }: EnrollArgsType) => {
    if (isAddPending) return;
    if (!validationText({ name: '강의명', text: titleRef.current!.value, maxLength: MAX_TITLE_LENGTH })) return;
    if (
      !validationText({ name: '강의 설명', text: contentRef.current!.textContent ?? '', maxLength: MAX_CONTENT_LENGTH })
    )
      return;

    addWiki({
      title: titleRef.current!.value,
      content: contentRef.current!.innerHTML ?? '',
    });
  };

  useEffect(() => {
    if (isAddSuccess) {
      setModalContent(null);
      alert('등록 되었습니다!');
    }
  }, [isAddSuccess]);

  return { handleClickEnroll, isAddPending };
};
