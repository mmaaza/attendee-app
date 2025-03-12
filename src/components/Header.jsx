import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary-600 text-white p-6 shadow-card">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold tracking-wide">NepDent - International Dental Show 2025</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-primary-300 transition-colors duration-300">Home</Link></li>
            <li><Link to="/register" className="hover:text-primary-300 transition-colors duration-300">Register</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
