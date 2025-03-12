import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary-600 text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold tracking-wide">
          NepDent
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-primary-300 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-primary-300 transition-colors duration-300">
                Register
              </Link>
            </li>
            <li>
              <Link to="/program" className="hover:text-primary-300 transition-colors duration-300">
                Program
              </Link>
            </li>
            <li>
              <Link to="/speakers" className="hover:text-primary-300 transition-colors duration-300">
                Speakers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary-300 transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
