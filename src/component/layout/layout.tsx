import { ReactNode } from 'react';
import Head from 'next/head';

import './layout.scss';
import { Header } from './header/header';

type LayoutProps = {
  readonly children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Super Diamond</title>
      </Head>
      <Header />
      <main className='main-container'>{children}</main>
    </>
  );
};

export default Layout;
