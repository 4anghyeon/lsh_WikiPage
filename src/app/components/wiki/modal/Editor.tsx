import React, { useRef } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import Spinner from '@/app/components/ui/Spinner';
import { clsx } from 'clsx';
import parse from 'html-react-parser';
import { useEditor } from '@/app/hooks/service/useEditor';
import EditableDiv from '@/app/components/ui/EditableDiv';
import { EnrollArgsType, WikiType } from '@/app/types/data';

export const MAX_TITLE_LENGTH = 20;
export const MAX_CONTENT_LENGTH = 300;

interface EditorProps {
  isPending: boolean;
  handleSubmit: ({ titleRef, contentRef }: EnrollArgsType) => void;
  data?: WikiType;
}

const Editor = ({ isPending, handleSubmit, data }: EditorProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { handleClickCancel, showTitleList, handleKeydown, handleKeyup, filteredTitleList, selectedTitleIndex } =
    useEditor({ contentRef });

  return (
    <>
      <div
        className={clsx('flex flex-col gap-5 h-full items-end relative', {
          'opacity-50 pointer-events-none': isPending,
        })}
      >
        {/*강의 검색시 box*/}
        {showTitleList && (
          <div className={'absolute left-0 w-full bg-white border-2 border-cyan-200 p-2 rounded-lg bottom-[90%]'}>
            {filteredTitleList.length === 0 && <p>검색 결과가 없습니다.</p>}
            {filteredTitleList.map((item, index) => (
              <div
                key={item.id}
                className={clsx('cursor-pointer p-2 rounded-lg hover:bg-blue-300 hover:text-white', {
                  'bg-blue-400 text-white': selectedTitleIndex === index,
                })}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}

        <Input
          placeholder={`강의명을 입력하세요 (${MAX_TITLE_LENGTH}자 이내)`}
          ref={titleRef}
          disabled={isPending}
          defaultValue={data ? data.title : ''}
        />
        <EditableDiv
          placeholder={`강의 설명을 입력하세요 (${MAX_CONTENT_LENGTH}자 이내)`}
          className="h-full"
          ref={contentRef}
          disabled={isPending}
          onKeyDown={handleKeydown}
          onKeyUp={handleKeyup}
          suppressContentEditableWarning={true}
        >
          {data ? parse(data.content) : ''}
        </EditableDiv>
        <div className="flex justify-between items-center w-full">
          <p className="text-stone-700 text-md italic">@을 이용하여 강의명을 검색해보세요.</p>
          <div className="flex gap-3">
            <Button variant="danger" onClick={handleClickCancel}>
              취소
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSubmit({ id: data?.id, titleRef, contentRef })}
              disabled={isPending}
            >
              {data ? '수정' : '등록'}
            </Button>
          </div>
        </div>
      </div>
      {isPending && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Editor;
