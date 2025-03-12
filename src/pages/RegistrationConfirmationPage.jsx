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
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Registration data not found</h2>
        <p className="mb-4">Please complete the registration form first.</p>
        <Link to="/register" className="text-blue-600 hover:underline">Go to Registration</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold">Registration Complete!</h2>
        <p>Thank you for registering for the International Dental Show 2025</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold mb-3">Your Digital Pass</h3>
        
        {/* QR Code placeholder (in a real app, you would generate an actual QR code) */}
        <div className="w-48 h-48 mx-auto bg-gray-200 flex items-center justify-center mb-4 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* This would be an actual QR code in a production app */}
            <div className="border-2 border-gray-400 w-36 h-36 grid grid-cols-4 grid-rows-4 gap-1 p-2">
              {Array(16).fill().map((_, i) => (
                <div 
                  key={i} 
                  className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} border border-gray-300`}>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">{registrationData.firstName} {registrationData.lastName}</p>
          <p>{registrationData.company}</p>
          <p>{registrationData.jobTitle}</p>
          <p className="text-sm text-gray-600 mt-2">ID: {registrationData.attendeeId}</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
          onClick={() => alert('In a real app, this would download the pass')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Pass
        </button>
        
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
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
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Digital Pass
        </Link>
      </div>
    </div>
  );
};

export default RegistrationConfirmationPage;