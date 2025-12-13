import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/auth';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      setIsLoading(false);

      if (!authenticated) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return isAuth ? children : null;
};

export default PrivateRoute;
