import React from 'react';
import WikiDetail from '@/app/components/wiki/detail/WikiDetail';
import { WikiType } from '@/app/types/data';

const WikiDetailContainer = ({ data }: { data: WikiType }) => {
  return (
    <WikiDetail>
      <WikiDetail.Header title={data?.title ?? ''} />
      <WikiDetail.TabHeader data={data} />
      <WikiDetail.Description description={data?.content ?? ''} />
    </WikiDetail>
  );
};

export default WikiDetailContainer;
