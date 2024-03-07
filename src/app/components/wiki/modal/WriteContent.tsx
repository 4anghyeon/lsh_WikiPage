import React, { useEffect, useRef } from 'react';
import Input from '@/app/components/ui/Input';
import Textarea from '@/app/components/ui/Textarea';
import Button from '@/app/components/ui/Button';
import { setModalContent } from '@/app/store/modal';
import { useInsertWiki } from '@/app/hooks/query/wiki/useSetWiki';
import { validationText } from '@/app/lib/utils';
import Spinner from '@/app/components/ui/Spinner';
import { clsx } from 'clsx';

const MAX_TITLE_LENGTH = 20;
const MAX_CONTENT_LENGTH = 300;

const WriteContent = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
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

  return (
    <>
      <div
        className={clsx('flex flex-col gap-5 h-full items-end', {
          'opacity-50 pointer-events-none': isAddPending,
        })}
      >
        <Input
          placeholder={`강의명을 입력하세요 (${MAX_TITLE_LENGTH}자 이내)`}
          ref={titleRef}
          disabled={isAddPending}
        />
        <Textarea
          placeholder={`강의 설명을 입력하세요 (${MAX_CONTENT_LENGTH}자 이내)`}
          className="h-full"
          ref={contentRef}
          disabled={isAddPending}
        />
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleClickCancel}>
            취소
          </Button>
          <Button variant="primary" onClick={handleClickEnroll} disabled={isAddPending}>
            등록
          </Button>
        </div>
      </div>
      {isAddPending && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default WriteContent;
