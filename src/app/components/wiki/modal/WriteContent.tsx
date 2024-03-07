import React, { useRef } from 'react';
import Input from '@/app/components/ui/Input';
import Textarea from '@/app/components/ui/Textarea';
import Button from '@/app/components/ui/Button';
import Spinner from '@/app/components/ui/Spinner';
import { clsx } from 'clsx';
import { useWriteContent } from '@/app/hooks/service/useWriteContent';

export const MAX_TITLE_LENGTH = 20;
export const MAX_CONTENT_LENGTH = 300;

const WriteContent = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { handleClickEnroll, handleClickCancel, isAddPending } = useWriteContent({ titleRef, contentRef });

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
