import React, { ReactNode } from 'react';
import WikiRow from '@/app/components/wiki/WikiRow';
import WikiPageButtonContainer from '@/app/components/wiki/WikiPageButtonContainer';
import WikiListHeader from '@/app/components/wiki/WikiListHeader';

const WikiWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="flex flex-col justify-between h-[384px] gap-5">{children}</section>;
};

export default WikiWrapper;

WikiWrapper.Row = WikiRow;
WikiWrapper.PageButtonContainer = WikiPageButtonContainer;
WikiWrapper.WikiListHeader = WikiListHeader;
