import WikiListContainer from '@/app/components/wiki/list/WikiListContainer';
import { findAllWikiList } from '@/app/hooks/query/wiki/useFetchWiki';
import { Suspense } from 'react';
import Loading from '@/app/loading';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home(props: Readonly<Props>) {
  const page = props.searchParams.page?.toString() ?? 1;
  const data = await findAllWikiList();

  return (
    <Suspense fallback={<Loading />}>
      <WikiListContainer data={data} initPageNum={+page} />
    </Suspense>
  );
}
