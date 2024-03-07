import React from 'react';
import WikiDetail from '@/app/components/wiki/detail/WikiDetail';

const WikiDetailContainer = ({ data }: { data: WikiType | null }) => {
  return (
    <WikiDetail>
      <WikiDetail.Header title={data?.title ?? ''} />
      <WikiDetail.TabHeader />
      <WikiDetail.Description description={data?.content ?? ''} />
    </WikiDetail>
  );
};

export default WikiDetailContainer;
