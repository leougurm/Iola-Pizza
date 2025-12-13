import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/auth';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  return isAuthenticated() ? children : null;
};

export default PrivateRoute;
