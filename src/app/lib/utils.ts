import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TextValidationType } from '@/app/types/data';

interface CursorPositionType {
  position: number;
  currentLine: HTMLElement | null;
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Wiki 등록/수정시의 입력 값을 검증한다
 * @param name 항목이름
 * @param text 검증할 텍스트
 * @param maxLength 최대 길이
 */
export const validationText = ({ name, text, maxLength }: TextValidationType) => {
  const value = text.trim();
  if (value.length === 0) {
    alert(`${name}을 입력해 주세요`);
    return false;
  }
  if (value.length > maxLength) {
    alert(`${name}의 길이는 ${maxLength}보다 작아야 합니다.`);
    return false;
  }
  return true;
};

/**
 * editable div에서 현재 cursor의 위치를 찾는다.
 * @param elem
 */
export const getCursorPosition = (elem: HTMLElement): CursorPositionType => {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    const clonedRange = range.cloneRange();
    clonedRange.selectNodeContents(elem);
    clonedRange.setEnd(range.endContainer, range.endOffset);

    let currentLine = clonedRange.endContainer.parentElement;

    if (clonedRange.endContainer.parentElement?.innerHTML !== elem.innerHTML) {
      currentLine = clonedRange.endContainer as HTMLElement;
    }

    return {
      position: clonedRange.toString().length,
      currentLine,
    };
  }
  return { position: 0, currentLine: null };
};

/**
 * 태그 검색 후 적용 시 원래의 커서 위치로 돌리기 위해 Range를 관리한다
 */
export const manageRange = () => {
  let savedRange: Range | undefined = undefined;

  const saveRange = () => {
    if (window.getSelection()) {
      savedRange = window.getSelection()?.getRangeAt(0);
    }
  };

  const restoreRange = (elem: HTMLDivElement) => {
    if (savedRange) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        savedRange.selectNodeContents(elem);
        savedRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(savedRange);
      }
    }
  };

  return { saveRange, restoreRange };
};
