'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const WikiListRow = ({ data }: { data: Wiki }) => {
  const router = useRouter();

  return (
    <div
      className="border border-slate-200 rounded-lg bg-white ml-40 mr-40 p-5 hover:bg-slate-100 hover:duration-100 cursor-pointer"
      onClick={() => router.push(`/detail/${data.id}`)}
    >
      {data.title}
    </div>
  );
};

export default WikiListRow;
