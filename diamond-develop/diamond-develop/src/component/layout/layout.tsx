import { ReactNode, useEffect } from 'react';
import Head from 'next/head';

import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAccountRole } from '@/store/auth-slice';

import './layout.scss';
import { Header } from './header/header';
import Footer from './footer/footer';

type LayoutProps = {
  readonly children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);

  useEffect(() => {
    const role = localStorage.getItem('ROLE');
    dispatch(setAccountRole(role ? Number(role) : null));
  }, [authState.renderHeaderInfo]);

  return (
    <div style={{ overflow: 'auto' }}>
      <Head>
        <title>Super Diamond</title>
      </Head>
      <Header />
      <main className='main-container'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
