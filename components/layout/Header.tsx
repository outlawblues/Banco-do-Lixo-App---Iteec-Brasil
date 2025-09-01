import React from 'react';
import { HeaderLogo } from '../ui/Icons';

interface HeaderProps {
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center">
        {children}
        <div className="ml-4 md:hidden">
          <HeaderLogo />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input 
          type="text" 
          placeholder="Pesquisar..." 
          className="hidden sm:block w-64 px-4 py-2 text-sm bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-primary-500 transition-colors duration-300"
        />
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;