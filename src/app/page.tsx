import WikiContainer from '@/app/components/wiki/WikiContainer';
import { findAllWikiList } from '@/app/hooks/query/wiki/useWikiFetchQuery';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home(props: Readonly<Props>) {
  const page = props.searchParams.page?.toString() ?? 1;
  const data = await findAllWikiList();

  return <WikiContainer data={data} initPageNum={+page} />;
}
