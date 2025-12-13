import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../../services/auth';

const AdminNavbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/admin/dashboard" className="font-bold">Admin Panel</Link>
        <div>
          <Link href="/admin/pizzas" className="mr-4">Pizzas</Link>
          <Link href="/admin/orders" className="mr-4">Orders</Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
