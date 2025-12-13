import React from 'react';
import AdminNavbar from './AdminNavbar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
