import WikiContainer from '@/app/components/wiki/WikiContainer';
import { findAllWikiList } from '@/app/hooks/query/wiki/useWikiFetchQuery';
import { Suspense } from 'react';
import Loading from '@/app/loading';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home(props: Readonly<Props>) {
  const page = props.searchParams.page?.toString() ?? 1;
  const data = await findAllWikiList();

  console.log(data);
  return (
    <Suspense fallback={<Loading />}>
      <WikiContainer data={data} initPageNum={+page} />
    </Suspense>
  );
}
