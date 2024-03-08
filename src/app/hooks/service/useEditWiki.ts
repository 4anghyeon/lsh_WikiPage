import { useUpdateWiki } from '@/app/hooks/query/wiki/useSetWiki';
import { validationText } from '@/app/lib/utils';
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '@/app/components/wiki/modal/Editor';
import { useEffect } from 'react';
import { setModalContent } from '@/app/store/modal';
import { EnrollArgsType } from '@/app/types/data';

export const useEditWiki = () => {
  const { editWiki, isEditSuccess, isEditPending } = useUpdateWiki();

  const handleClickEdit = ({ id, titleRef, contentRef }: EnrollArgsType) => {
    if (isEditPending) return;
    if (!validationText({ name: '강의명', text: titleRef.current!.value, maxLength: MAX_TITLE_LENGTH })) return;
    if (
      !validationText({ name: '강의 설명', text: contentRef.current!.textContent ?? '', maxLength: MAX_CONTENT_LENGTH })
    )
      return;

    if (id) {
      editWiki({
        id,
        title: titleRef.current!.value,
        content: contentRef.current!.innerHTML ?? '',
      });
    }
  };

  useEffect(() => {
    if (isEditSuccess) {
      setModalContent(null);
      alert('수정 되었습니다!');
    }
  }, [isEditSuccess]);

  return { handleClickEdit, isEditPending };
};
