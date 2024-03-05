import React, {ReactNode} from 'react';
import WikiRow from "@/app/components/wiki/WikiRow";

const Wiki = ({children}: {children: ReactNode}) => {
  return (
    <section className='h-full'>
      {children}
    </section>
  );
};

export default Wiki;

Wiki.Row = WikiRow;
