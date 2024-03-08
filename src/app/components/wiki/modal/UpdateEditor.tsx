import React from 'react';
import { useEditWiki } from '@/app/hooks/service/useEditWiki';
import Editor from '@/app/components/wiki/modal/Editor';
import { WikiType } from '@/app/types/data';

const UpdateEditor = ({ data }: { data: WikiType }) => {
  const { handleClickEdit, isEditPending } = useEditWiki();
  return <Editor handleSubmit={handleClickEdit} isPending={isEditPending} data={data} />;
};

export default UpdateEditor;
