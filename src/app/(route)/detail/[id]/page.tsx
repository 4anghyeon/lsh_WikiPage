import React from 'react';
import WikiDetailContainer from '@/app/components/wiki/detail/WikiDetailContainer';
import { findWikiById } from '@/app/hooks/query/wiki/useFetchWiki';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async (props: Readonly<PageProps>) => {
  const data = await findWikiById(props.params.id);

  return <WikiDetailContainer initialData={data} id={props.params.id} />;
};

export default Page;
