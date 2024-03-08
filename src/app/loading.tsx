import React from 'react';
import Spinner from '@/app/components/ui/Spinner';

const Loading = () => {
  return (
    <div className="fixed flex justify-center items-center w-lvw h-screen">
      <Spinner />
    </div>
  );
};

export default Loading;
