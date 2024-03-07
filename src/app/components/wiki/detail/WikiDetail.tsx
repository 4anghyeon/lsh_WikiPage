import React, { ReactNode } from 'react';
import WikiDetailHeader from '@/app/components/wiki/detail/WikiDetailHeader';
import WikiDetailTabHeader from '@/app/components/wiki/detail/WikiDetailTabHeader';
import WikiDetailDescription from '@/app/components/wiki/detail/WikiDetailDescription';

const WikiDetail = ({ children }: { children: ReactNode }) => {
  return <section className="flex flex-col justify-between m-h-[384px] gap-5 ml-40 mr-40">{children}</section>;
};

export default WikiDetail;

WikiDetail.Header = WikiDetailHeader;
WikiDetail.TabHeader = WikiDetailTabHeader;
WikiDetail.Description = WikiDetailDescription;
