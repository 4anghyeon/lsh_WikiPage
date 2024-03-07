import React from 'react';
import WikiDetailWrapper from '@/app/components/wiki/detail/WikiDetailWrapper';

const WikiDetailContainer = ({ data }: { data: WikiType | null }) => {
  return (
    <WikiDetailWrapper>
      <WikiDetailWrapper.Header title={data?.title ?? ''} />
      <WikiDetailWrapper.TabHeader />
      <WikiDetailWrapper.Description description={data?.content ?? ''} />
    </WikiDetailWrapper>
  );
};

export default WikiDetailContainer;
