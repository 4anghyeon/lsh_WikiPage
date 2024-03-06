import React, { ReactNode } from 'react';
import WikiListRow from '@/app/components/wiki/list/WikiListRow';
import WikiListButtonContainer from '@/app/components/wiki/list/WikiListButtonContainer';
import WikiListHeader from '@/app/components/wiki/list/WikiListHeader';

const WikiList = ({ children }: { children: ReactNode }) => {
  return <section className="flex flex-col justify-between m-h-[384px] gap-5">{children}</section>;
};

export default WikiList;

WikiList.Row = WikiListRow;
WikiList.PageButtonContainer = WikiListButtonContainer;
WikiList.Header = WikiListHeader;
