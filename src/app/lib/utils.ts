import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

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
