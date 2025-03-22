import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-display text-secondary-900">Settings</h1>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content Management */}
        <div className="bg-white p-6 rounded-xl shadow-card">
          <div className="flex items-start mb-4">
            <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-secondary-900">Content Management</h2>
              <p className="text-secondary-600 text-sm mt-1">Manage website content and information</p>
            </div>
          </div>
          <div className="space-y-3">
            <Link
              to="/admin/homepage-content"
              className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <span className="text-secondary-900">Homepage Content</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white p-6 rounded-xl shadow-card">
          <div className="flex items-start mb-4">
            <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-secondary-900">General Settings</h2>
              <p className="text-secondary-600 text-sm mt-1">Configure application settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-secondary-900">Email Notifications</label>
                <span className="text-sm text-secondary-600">Receive email alerts for new registrations</span>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 bg-primary-600">
                <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-secondary-900">Auto-Approve Registrations</label>
                <span className="text-sm text-secondary-600">Automatically approve new registrations</span>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 bg-secondary-200">
                <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;