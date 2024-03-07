import React from 'react';
import Link from 'next/link';

const WikiListRow = ({ data }: { data: WikiType }) => {
  return (
    <Link
      href={`/detail/${data.id}`}
      className="border border-slate-200 rounded-lg bg-white p-5 hover:bg-slate-100 hover:duration-100 cursor-pointer"
    >
      {data.title}
    </Link>
  );
};

export default WikiListRow;
