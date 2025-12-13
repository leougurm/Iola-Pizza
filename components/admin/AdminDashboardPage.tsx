import React from 'react';
import Link from 'next/link';

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-brand-dark font-bold mb-2">Ürün Listeleri</h2>
          <p className="text-gray-700 mb-4">Ürünlerinizi düzenleyin.</p>
          <Link href="/admin/pizzas" className="text-blue-500 hover:underline">Görüntüle</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-brand-dark font-bold mb-2">Siparişler</h2>
          <p className="text-gray-700 mb-4">Siparişerinizi görüntüleyin.</p>
          <Link href="/admin/orders" className="text-blue-500 hover:underline">Görüntüle</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
