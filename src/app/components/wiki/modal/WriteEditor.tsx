import React from 'react';
import Editor from '@/app/components/wiki/modal/Editor';
import { useEnrollWiki } from '@/app/hooks/service/useEnrollWiki';

const WriteEditor = () => {
  const { handleClickEnroll, isAddPending } = useEnrollWiki();
  return <Editor handleSubmit={handleClickEnroll} isPending={isAddPending} />;
};

export default WriteEditor;
