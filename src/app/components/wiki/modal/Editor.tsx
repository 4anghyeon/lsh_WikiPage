import React, { useRef } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import Spinner from '@/app/components/ui/Spinner';
import parse from 'html-react-parser';
import { useEditor } from '@/app/hooks/service/useEditor';
import EditableDiv from '@/app/components/ui/EditableDiv';
import { EnrollArgsType, WikiType } from '@/app/types/data';
import { cn } from '@/app/lib/utils';

export const MAX_TITLE_LENGTH = 20;
export const MAX_CONTENT_LENGTH = 300;

interface EditorProps {
  isPending: boolean;
  handleSubmit: ({ titleRef, contentRef }: EnrollArgsType) => void;
  data?: WikiType;
}

/**
 * 등록 / 수정에서 공통적으로 사용되는 에디터 컴포넌트
 * 등록과 수정의 동작이 조금씩 다르기 때문에 직접 사용되지 않고 외부에서 값을 주입받아 사용된다.
 * @param isPending 등록/수정 비동기 진행 여부
 * @param handleSubmit 등록/수정시 일어날 이벤트
 * @param data wiki 데이터 (등록 Editor일 경우 null)
 * @constructor
 */
const Editor = ({ isPending, handleSubmit, data }: EditorProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    handleClickCancel,
    showTitleList,
    handleKeydown,
    handleKeyup,
    handleSelectTitle,
    filteredTitleList,
    selectedTitleIndex,
  } = useEditor({ contentRef });

  return (
    <>
      <div
        className={cn('flex flex-col gap-5 h-full items-end relative', {
          'opacity-50 pointer-events-none': isPending,
        })}
      >
        {/* Wiki 검색시 목록 출력 box*/}
        {showTitleList && (
          <div
            className={cn('absolute left-0 w-full bg-white border-2 border-blue-700 p-2 rounded-lg bottom-[90%]', {
              ['border-red-500']: filteredTitleList.length === 0,
            })}
          >
            {filteredTitleList.length === 0 && <p>검색 결과가 없습니다.</p>}
            {filteredTitleList.map((item, index) => (
              <div
                key={item.id}
                className={cn('cursor-pointer p-2 rounded-lg hover:bg-blue-300 hover:text-white', {
                  'bg-blue-400 text-white': selectedTitleIndex === index,
                })}
                onClick={() => handleSelectTitle(index)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}

        {/* 제목 입력 */}
        <Input
          placeholder={`강의명을 입력하세요 (${MAX_TITLE_LENGTH}자 이내)`}
          ref={titleRef}
          disabled={isPending}
          defaultValue={data ? data.title : ''}
        />

        {/* 내용 입력 */}
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

        {/* 하단 버튼 영역*/}
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
