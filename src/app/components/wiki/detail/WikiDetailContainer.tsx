'use client';

import React from 'react';
import WikiDetail from '@/app/components/wiki/detail/WikiDetail';
import { WikiType } from '@/app/types/data';
import { useFindWikiByIdQuery } from '@/app/hooks/query/wiki/useFetchWiki';

interface PropsType {
  initialData: WikiType | null;
  id: string;
}

const WikiDetailContainer = ({ initialData, id }: PropsType) => {
  const wikiData = useFindWikiByIdQuery(id);

  return (
    <WikiDetail>
      <WikiDetail.Header title={wikiData ? wikiData.title : initialData?.title ?? ''} />
      <WikiDetail.TabHeader data={wikiData || initialData} />
      <WikiDetail.Description description={wikiData ? wikiData.content : initialData?.content ?? ''} />
    </WikiDetail>
  );
};

export default WikiDetailContainer;
