'use client';

import React from 'react';
import Button from '@/app/components/ui/Button';
import { useModal } from '@/app/hooks/ui/useModal';
import UpdateEditor from '@/app/components/wiki/modal/UpdateEditor';
import { WikiType } from '@/app/types/data';

const WikiDetailTabHeader = ({ data }: { data: WikiType | null }) => {
  const { showModal } = useModal();

  const handleClickEdit = () => {
    if (data) showModal(<UpdateEditor data={data} />);
  };

  return (
    <div className="sticky flex items-center justify-between w-full h-full gap-3 bg-white border-b top-16 border-slate-200 pb-2">
      <h1 className="text-xl font-bold">설명</h1>
      <Button variant="warn" size="sm" onClick={handleClickEdit}>
        수정
      </Button>
    </div>
  );
};

export default WikiDetailTabHeader;
