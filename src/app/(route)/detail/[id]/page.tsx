import React from 'react';
import WikiDetailContainer from '@/app/components/wiki/detail/WikiDetailContainer';
import { findWikiById } from '@/app/hooks/query/wiki/useWikiFetchQuery';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async (props: Readonly<PageProps>) => {
  const data = await findWikiById(props.params.id);

  return <WikiDetailContainer data={data} />;
};

export default Page;
