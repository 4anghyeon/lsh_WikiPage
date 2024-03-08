import React, { ReactNode } from 'react';
import WikiDetailHeader from '@/app/components/wiki/detail/WikiDetailHeader';
import WikiDetailTabHeader from '@/app/components/wiki/detail/WikiDetailTabHeader';
import WikiDetailDescription from '@/app/components/wiki/detail/WikiDetailDescription';
import { motion } from 'framer-motion';

const WikiDetail = ({ children }: { children: ReactNode }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      className="flex flex-col justify-between m-h-[384px] gap-5 ml-40 mr-40"
    >
      {children}
    </motion.section>
  );
};

export default WikiDetail;

WikiDetail.Header = WikiDetailHeader;
WikiDetail.TabHeader = WikiDetailTabHeader;
WikiDetail.Description = WikiDetailDescription;
