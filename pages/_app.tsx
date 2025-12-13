import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AdminLayout from '../components/admin/AdminLayout';
import PrivateRoute from '../components/admin/PrivateRoute';
import '../styles/globals.css';
import { useEffect } from 'react';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith('/admin')) {
    if (router.pathname === '/admin/login') {
      return <Component {...pageProps} />;
    }
    return (
      <PrivateRoute>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </PrivateRoute>
    );
  }

  return (
    <Layout>
      <ScrollToTop />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
