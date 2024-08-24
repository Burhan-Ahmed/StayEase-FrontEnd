import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


export default function AdminDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    return (

        <header className="bg-gray-800 text-white shadow-md font-poppins">
            <div className="container mx-auto flex items-center justify-between p-4">
                <h1 className="text-2xl font-semibold">
                    <Link to="AdminDashboard">
                        Admin Management Dashboard
                    </Link>
                </h1>
                <nav className="hidden md:flex space-x-4">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                    >
                        Logout
                    </button>
                </nav>
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-700`}
            >
                <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                >
                    Logout
                </button>
            </div>
        </header>
    )
}
