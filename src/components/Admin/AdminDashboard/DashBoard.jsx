import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-white shadow-md border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="manageEmployees"
                className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                Manage Employees
              </Link>
            </li>
            <li>
              <Link
                to="manageRooms"
                className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                Manage Rooms
              </Link>
            </li>
            <li>
              <Link
                to="reviewsNotifications"
                className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                Notifications
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
