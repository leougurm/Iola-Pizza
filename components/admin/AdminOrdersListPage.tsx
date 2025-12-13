import React from 'react';
import { dummyOrders, Order } from '../../services/dummy-data';

const AdminOrdersListPage: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[]>(dummyOrders);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-200 text-green-800';
      case 'In Progress':
        return 'bg-yellow-200 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">#{order.id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.customerName}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">${order.total.toFixed(2)}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${getStatusColor(order.status)}`}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">{order.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <button className="text-indigo-600 hover:text-indigo-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersListPage;
