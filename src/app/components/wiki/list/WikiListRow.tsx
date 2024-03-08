import React from 'react';
import Link from 'next/link';
import { WikiType } from '@/app/types/data';
import { motion } from 'framer-motion';

const WikiListRow = ({ data }: { data: WikiType }) => {
  return (
    <Link href={`/detail/${data.id}`}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="border border-slate-200 rounded-lg bg-white p-5 hover:bg-slate-100 hover:duration-100 cursor-pointer"
      >
        {data.title}
      </motion.div>
    </Link>
  );
};

export default WikiListRow;
