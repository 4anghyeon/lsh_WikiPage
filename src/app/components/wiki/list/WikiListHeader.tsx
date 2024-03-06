import React from 'react';

const WikiListHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center w-full h-24 p-6 border-b bg-slate-50 border-slate-200">
      <div className="flex items-center justify-start w-full ml-40 gap-2">
        <h1 className="font-bold text-xl">{title}</h1>
      </div>
    </div>
  );
};

export default WikiListHeader;
