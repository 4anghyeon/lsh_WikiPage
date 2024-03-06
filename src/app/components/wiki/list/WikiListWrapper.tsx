import React, { ReactNode } from 'react';
import WikiListRow from '@/app/components/wiki/list/WikiListRow';
import WikiListButtonContainer from '@/app/components/wiki/list/WikiListButtonContainer';
import WikiHeader from '@/app/components/wiki/common/WikiHeader';

const WikiListWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="flex flex-col justify-between m-h-[384px] gap-5">{children}</section>;
};

export default WikiListWrapper;

WikiListWrapper.Row = WikiListRow;
WikiListWrapper.PageButtonContainer = WikiListButtonContainer;
WikiListWrapper.WikiListHeader = WikiHeader;
