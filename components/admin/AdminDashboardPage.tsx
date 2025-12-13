import React from 'react';
import Link from 'next/link';

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Pizzas</h2>
          <p className="text-gray-700 mb-4">Manage your pizza menu.</p>
          <Link href="/admin/pizzas" className="text-blue-500 hover:underline">View Pizzas</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Orders</h2>
          <p className="text-gray-700 mb-4">View and manage customer orders.</p>
          <Link href="/admin/orders" className="text-blue-500 hover:underline">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
