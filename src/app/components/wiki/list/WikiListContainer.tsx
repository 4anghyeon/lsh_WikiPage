'use client';

import React, { useEffect, useRef, useState } from 'react';
import WikiList from '@/app/components/wiki/list/WikiList';
import useWikiState, { setWikiList } from '@/app/store/wiki';

interface WikiContainerProps {
  initData: WikiType[];
  initPageNum: number;
}

export const ITEM_PER_PAGE = 5;

const cropPage = (data: WikiType[], pageNum: number) => {
  return data.slice((pageNum - 1) * ITEM_PER_PAGE, (pageNum - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
};

const WikiListContainer = ({ initData, initPageNum }: WikiContainerProps) => {
  const totalSize = useRef(initData.length);
  const [pageNum, setPageNum] = useState(initPageNum);
  const wikiList = useWikiState(state => {
    if (state.wikiList.length === 0) return cropPage(initData, initPageNum);
    return cropPage(state.wikiList, pageNum);
  });

  useEffect(() => {
    setWikiList(initData);
  }, []);

  return (
    <WikiList>
      <WikiList.Header title={'코딩허브 위키'} />
      {wikiList.length > 0 ? (
        <>
          <div className="flex flex-col gap-5 ml-40 mr-40">
            {wikiList.map(data => (
              <WikiList.Row key={data.id} data={data} />
            ))}
          </div>
          <WikiList.PageButtonContainer pageNum={pageNum} setPageNum={setPageNum} totalSize={totalSize.current} />
        </>
      ) : (
        <div>No data</div>
      )}
    </WikiList>
  );
};

export default WikiListContainer;
