import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isInitialSetup, setIsInitialSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const adminDocRef = doc(db, 'admin', 'setup');
      const adminDoc = await getDoc(adminDocRef);
      setIsInitialSetup(!adminDoc.exists());
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      toast.error('Error checking admin status');
      setIsLoading(false);
    }
  };

  const handleInitialSetup = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const setupLoading = toast.loading('Setting up admin account...');
    try {
      // Create admin user in Firebase Auth
      await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      
      // Create admin document in Firestore
      await setDoc(doc(db, 'admin', 'setup'), {
        email: credentials.email,
        setupComplete: true,
        setupDate: new Date().toISOString()
      });

      toast.dismiss(setupLoading);
      toast.success('Admin account created successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.dismiss(setupLoading);
      toast.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const loginLoading = toast.loading('Signing in...');
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      toast.dismiss(loginLoading);
      toast.success('Login successful');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.dismiss(loginLoading);
      toast.error('Invalid email or password');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-card">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-card">
        <div>
          <h2 className="text-3xl font-bold font-display text-center text-secondary-900">
            {isInitialSetup ? 'Admin Setup' : 'Admin Login'}
          </h2>
          <p className="mt-2 text-center text-secondary-600">
            {isInitialSetup 
              ? 'Create your admin account to get started'
              : 'Sign in to access the admin dashboard'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={isInitialSetup ? handleInitialSetup : handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-secondary-700 font-semibold">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
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
                autoComplete={isInitialSetup ? 'new-password' : 'current-password'}
                required
                className="mt-1 block w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          {isInitialSetup && (
            <div className="rounded-xl bg-secondary-50 p-4 border border-secondary-200">
              <div className="flex items-center space-x-3 text-secondary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">This is a one-time setup for the admin account.</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-medium"
          >
            {isInitialSetup ? 'Create Admin Account' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;