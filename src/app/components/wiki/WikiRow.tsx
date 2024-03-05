'use client'

import React from 'react';
import Wiki from "@/app/components/wiki/Wiki";
import {useRouter} from "next/navigation";

const WikiRow = ({data}: {data: Wiki}) => {
  const router = useRouter();

  return (
    <div className='bg-blue-300 ml-40 mr-40 m-9 p-5 rounded-2xl hover:bg-blue-400 hover:duration-100 cursor-pointer' onClick={() => router.push(`/detail/${data.id}`)}>
      {data.title}
    </div>
  );
};

export default WikiRow;
