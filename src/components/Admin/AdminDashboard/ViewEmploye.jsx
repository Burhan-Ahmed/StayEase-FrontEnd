import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://coordinated-abalone-bayberry.glitch.me/employees');
        console.log('Response:', response.data);
        setEmployees(response.data.employees);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p className="text-center mt-4 text-white">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen font-poppins">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Manage Employees</h2>
      <p className="text-center text-gray-600 mb-4">Employee details and management</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {employees.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No employees available.</p>
        ) : (
          employees.map((employee) => (
            <div
              key={employee._id}
              className="p-6 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Name</h3>
              <p className="text-gray-800 mb-4">{employee.name}</p>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Email</h4>
              <p className="text-gray-700 mb-4">{employee.email}</p>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">CNIC</h4>
              <p className="text-gray-700 mb-4">{employee.cnic}</p>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Contact</h4>
              <p className="text-gray-700 mb-4">{employee.contact}</p>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Salary</h4>
              <p className="text-gray-900">{employee.salary}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageEmployees;
