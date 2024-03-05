import React from 'react';
import Button from '@/app/components/ui/Button';

interface PageContainerProps {
  pageNum: number;
  maxPage: number;
}

const PageContainer = ({ pageNum }: PageContainerProps) => {
  return (
    <div className="flex justify-center">
      {pageNum > 1 && (
        <Button variant="outline" className="mr-2">
          이전
        </Button>
      )}
      <Button variant="outline" className="ml-2">
        다음
      </Button>
    </div>
  );
};

export default PageContainer;
