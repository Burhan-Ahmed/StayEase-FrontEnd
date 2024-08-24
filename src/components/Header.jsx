import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));


  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleProfileMenu = () => {
    setProfileOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    console.log('Logged out and local storage cleared');
    navigate('/login');
  };

  return (
    <header className='bg-blue-500 relative font-poppins'>
      <div className='lg:mx-44'>
        <nav className='flex justify-between items-center p-6 px-10'>
          <Link to='/'>
            <h1 className='text-3xl font-semibold text-black'>
              Stay<span className='text-white'>Ease</span>
            </h1>
          </Link>
          <button
            className='lg:hidden flex items-center text-slate-700'
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} size='lg' />
          </button>
          <ul
            className={`lg:flex lg:gap-6 text-white text-center lg:items-center lg:space-x-6 absolute top-full left-0 w-full lg:w-auto bg-slate-900 lg:bg-transparent transition-all duration-500 ease-in-out overflow-hidden lg:overflow-visible 
            ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} lg:max-h-full lg:opacity-100 lg:static lg:flex-row`}
          >
            <li>
              <Link to='/' className={` block px-4 py-2 text-lg ${isOpen ? 'border-t' : 'underline-animation'}`}>Home</Link>
            </li>
            <li>
              <Link to='/Rooms' className={`block px-4 py-2 text-lg ${isOpen ? 'border' : 'underline-animation'}`}>Rooms</Link>
            </li>
            {!token && (
              <li>
                <Link to='/login' className={`block px-4 py-2 text-lg ${isOpen ? 'border-b' : ''} rounded-xl px-3 py-1 border border-black text-white bg-blue-900 hover:bg-black transition duration-300`}>Book Now</Link>
              </li>
            )}
          </ul>
          {token && isAdmin && (
            <div className='relative' ref={profileMenuRef}>
              <button
                className='flex items-center'
                onClick={toggleProfileMenu}
              >
                <FontAwesomeIcon icon={faUserCircle} size='2x' className='text-white' />
              </button>
              {profileOpen && (
                <div className='absolute z-50 right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg transition-opacity duration-300 ease-in-out'>
                  <ul>
                    <li>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200'
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
