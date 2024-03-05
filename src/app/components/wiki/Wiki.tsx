import React, { ReactNode } from 'react';
import WikiRow from '@/app/components/wiki/WikiRow';
import PageContainer from '@/app/components/wiki/PageContainer';

const Wiki = ({ children }: { children: ReactNode }) => {
  return <section className="h-full">{children}</section>;
};

export default Wiki;

Wiki.Row = WikiRow;
Wiki.PageContainer = PageContainer;
