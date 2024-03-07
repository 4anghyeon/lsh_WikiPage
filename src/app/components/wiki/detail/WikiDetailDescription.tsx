'use client';

import React from 'react';
import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';

const WikiDetailDescription = ({ description }: { description: string }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const id = target.id.replace('link-', '');
      router.push(`/detail/${id}`);
    }
  };

  return <p onClick={handleClick}>{parse(`${description}`)}</p>;
};

export default WikiDetailDescription;
