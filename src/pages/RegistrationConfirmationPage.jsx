import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RegistrationConfirmationPage = () => {
  const location = useLocation();
  const [registrationData, setRegistrationData] = useState(null);
  
  useEffect(() => {
    // In a real app, you might retrieve data from an API rather than location state
    if (location.state) {
      setRegistrationData(location.state);
    }
  }, [location]);
  
  if (!registrationData) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4">
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-8 shadow-card">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold font-display text-secondary-900 mb-3">Registration Data Not Found</h2>
          <p className="text-secondary-600 mb-6">Please complete the registration form to view your confirmation.</p>
          <Link 
            to="/register" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl shadow-md hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            Return to Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-100 rounded-full opacity-70 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-accent-50 rounded-full opacity-50 blur-3xl z-0"></div>
      
      <div className="relative z-10">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-success/20 to-primary-50 p-8 rounded-2xl shadow-md mb-8 text-center">
          <div className="inline-flex items-center justify-center bg-success/20 p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold font-display text-secondary-900 mb-2">Registration Complete!</h1>
          <p className="text-secondary-700 text-lg">Thank you for registering for the NepDent International Dental Show 2025</p>
          <div className="flex items-center justify-center mt-4 text-sm text-secondary-600 space-x-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>April 18-20, 2025</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Kathmandu, Nepal</span>
            </div>
          </div>
        </div>
        
        {/* Digital Pass Card - updated to match DigitalPassPage */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 mb-8 border border-secondary-100">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6">
            <h2 className="text-xl font-display font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Your Digital Event Pass
            </h2>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* QR Code - updated to match DigitalPassPage */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-secondary-50 p-4 rounded-xl border border-secondary-100 shadow-inner w-48 h-48 flex items-center justify-center relative">
                  <div className="w-40 h-40 relative">
                    {/* QR Code Border Animation */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-300 via-accent-500 to-primary-300 rounded-lg opacity-50 animate-pulse"></div>
                    {/* This would be an actual QR code in a production app */}
                    <div className="relative bg-white border-2 border-secondary-200 w-full h-full grid grid-cols-6 grid-rows-6 gap-0.5 p-3 rounded-lg">
                      {Array(36).fill().map((_, i) => (
                        <div 
                          key={i} 
                          className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-center text-secondary-600 bg-primary-50 rounded-full px-3 py-1">
                  <span className="font-medium">Scan for verification</span>
                </div>
              </div>
              
              {/* Attendee Information */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-secondary-700 uppercase tracking-wider border-b border-secondary-100 pb-2 mb-4">
                  Attendee Information
                </h3>
                
                <h3 className="text-2xl font-bold text-secondary-900">
                  {registrationData.firstName} {registrationData.lastName}
                </h3>
                
                <div className="flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-secondary-700">{registrationData.company}</p>
                </div>
                
                <div className="flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-secondary-600">{registrationData.jobTitle}</p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-dashed border-secondary-200">
                  <p className="text-sm text-secondary-500 font-medium">Attendee ID</p>
                  <div className="flex items-center">
                    <p className="font-mono text-secondary-700">{registrationData.attendeeId}</p>
                    <div className="ml-3 bg-accent-50 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                      Attendee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="w-full text-center py-4 border-t border-secondary-100 bg-secondary-50">
            <p className="text-secondary-600 text-sm mb-1">Please present this pass at the entrance for verification</p>
          </div>
        </div>
        
        {/* Action Buttons with improved styling */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl shadow-md hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => alert('In a real app, this would download the pass')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Pass
          </button>
          
          <button 
            className="flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-primary-700 font-medium rounded-xl hover:bg-primary-50 transition-all duration-300"
            onClick={() => alert('In a real app, this would send the pass via email')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Pass
          </button>
          
          <Link 
            to="/digital-pass" 
            state={registrationData}
            className="flex items-center justify-center px-6 py-3 bg-success text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Digital Pass
          </Link>
        </div>
        
        {/* Additional info section */}
        <div className="mt-8 rounded-xl bg-secondary-50 p-6 border border-secondary-100">
          <h3 className="text-lg font-semibold text-secondary-900 flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Information
          </h3>
          <div className="text-secondary-600 space-y-2 text-sm">
            <p>• Please arrive 30 minutes before your first scheduled session</p>
            <p>• Your digital pass gives you access to all standard conference areas</p>
            <p>• For special workshops, please check your email for additional tickets</p>
            <p>• Questions? Contact us at support@nepdent2025.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmationPage;