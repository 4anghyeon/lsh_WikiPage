import React from 'react';
import Link from "next/link";
import Button from "@/app/components/ui/Button";

const Header = () => {
  return (
    <header className='fixed top-0 left-0 z-20 flex items-center justify-center w-full h-20 bg-white'>
      <nav className='flex items-center justify-between w-full max-w-screen-xl'>
        <Link href='/'>CODINGHUB</Link>
        <ul className='flex items-center justify-end gap-2'>
          <Button>코딩허브 소개</Button>
          <Button>Contents</Button>
          <Button>Assessment</Button>
          <Button>PBL</Button>
          <Button className='text-blue-700'>Wiki</Button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
