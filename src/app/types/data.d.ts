import { RefObject } from 'react';

interface WikiType {
  id: string;
  title: string;
  content: string;
}

interface TextValidationType {
  name: string;
  text: string;
  maxLength: number;
}

interface EnrollArgsType {
  titleRef: RefObject<HTMLInputElement>;
  contentRef: RefObject<HTMLDivElement>;
}
