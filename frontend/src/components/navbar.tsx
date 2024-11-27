import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  return (
    <div className="navbar relative" style={{ backgroundColor: '#1D232A' }}>
      <div className="navbar-start">
        <div className="dropdown">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          {isOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 absolute bg-[#1D232A] text-white">
              <li><a href='/obras'>Obras</a></li>
              <li><a href='/mapa'>Mapa</a></li>
              <li><a href='/noticias'>Noticias</a></li>
            </ul>
          )}
        </div>
        <a href='/' className="btn btn-ghost text-xl text-white">Monitora BSB</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          <li><a href='/obras' className="hover:bg-blue-600 rounded-lg">Obras</a></li>
          <li><a href='/mapa' className="hover:bg-blue-600 rounded-lg">Mapa</a></li>
          <li><a href='/noticias' className="hover:bg-blue-600 rounded-lg">Noticias</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        {auth.user ? (
          <a onClick={auth.logout} href='/login' className="btn bg-red-500 hover:bg-red-600 text-white border-none">
            Logout
          </a>
        ) : (
          <a href='/login' className="btn bg-blue-500 hover:bg-blue-600 text-white border-none">
            Login
          </a>
        )}
      </div>
    </div>
  );
}