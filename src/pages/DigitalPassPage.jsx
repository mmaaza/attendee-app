import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DigitalPassPage = () => {
  const location = useLocation();
  const [attendeeData, setAttendeeData] = useState(null);
  
  useEffect(() => {
    if (location.state) {
      setAttendeeData(location.state);
    }
    // In a real app, you might fetch the data using an ID from the URL
  }, [location]);

  const handlePrint = () => {
    window.print();
  };
  
  if (!attendeeData) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Attendee data not found</h2>
        <p className="mb-4">Please complete the registration process first.</p>
        <Link to="/register" className="text-blue-600 hover:underline">Go to Registration</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* This wrapper controls what gets printed */}
      <div className="print:p-0 print:shadow-none">
        {/* Non-printable controls */}
        <div className="mb-6 flex justify-between print:hidden">
          <Link to="/" className="text-blue-600 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <button 
            onClick={handlePrint}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Pass
          </button>
        </div>
        
        {/* Digital Pass Card - this will be printed */}
        <div className="bg-white border-2 border-blue-600 rounded-lg overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 text-center">
            <h2 className="text-xl font-bold">International Dental Show 2025</h2>
            <p className="text-sm">March 10-14, 2025 • Koelnmesse, Cologne, Germany</p>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* QR Code (placeholder) */}
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center mb-4 relative flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
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
              
              {/* Attendee Information */}
              <div>
                <h3 className="text-2xl font-bold mb-1">{attendeeData.firstName} {attendeeData.lastName}</h3>
                <p className="font-semibold text-lg mb-1">{attendeeData.company}</p>
                <p className="text-gray-600 mb-3">{attendeeData.jobTitle}</p>
                <p className="text-gray-700">{attendeeData.country}</p>
                
                <div className="border-t border-gray-300 mt-3 pt-3">
                  <p className="text-sm font-semibold">Attendee ID</p>
                  <p className="font-mono text-gray-600">{attendeeData.attendeeId}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-100 p-3 text-center text-sm text-gray-600">
            <p>Please present this pass at the entrance for entry</p>
            <p>www.ids-cologne.de</p>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 text-center print:hidden">
          <p>You can save this pass by printing it as PDF or printing a physical copy.</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalPassPage;