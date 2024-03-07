import React from 'react';
import WikiDetailWrapper from '@/app/components/wiki/detail/WikiDetailWrapper';

const WikiDetailContainer = ({ data }: { data: Wiki | null }) => {
  return (
    <WikiDetailWrapper>
      <WikiDetailWrapper.Header title={data?.title ?? ''} />
      <WikiDetailWrapper.TabHeader />
    </WikiDetailWrapper>
  );
};

export default WikiDetailContainer;
