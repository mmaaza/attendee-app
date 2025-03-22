import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    if (credentials.email && credentials.password) {
      toast.success('Login successful');
      navigate('/admin/dashboard');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-card">
        <div>
          <h2 className="text-3xl font-bold font-display text-center text-secondary-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-secondary-600">
            Sign in to access the admin dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-secondary-700 font-semibold">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
                placeholder="admin@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-secondary-700 font-semibold">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-medium"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;