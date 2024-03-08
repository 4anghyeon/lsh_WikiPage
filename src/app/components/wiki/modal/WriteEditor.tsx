import React from 'react';
import Editor from '@/app/components/wiki/modal/Editor';
import { useAddWiki } from '@/app/hooks/service/useAddWiki';

const WriteEditor = () => {
  const { handleClickEnroll, isAddPending } = useAddWiki();
  return <Editor handleSubmit={handleClickEnroll} isPending={isAddPending} />;
};

export default WriteEditor;
