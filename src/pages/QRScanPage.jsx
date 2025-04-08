import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const QRScanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    
    const checkUserAndRedirect = async (user) => {
      try {
        // Check if the attendee exists
        const attendeeRef = doc(db, 'users', id);
        const attendeeSnap = await getDoc(attendeeRef);
        
        if (!attendeeSnap.exists()) {
          setError('No registration found with this ID');
          setLoading(false);
          return;
        }

        // If user is authenticated (admin/security), redirect to check-in page
        if (user) {
          navigate(`/check-in/${id}`);
        } else {
          // For regular users, redirect to digital pass page
          navigate(`/digital-pass/${id}`);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to process QR code');
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkUserAndRedirect(user);
    });

    return () => unsubscribe();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary-700 text-lg">Processing QR code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Error</h2>
          <p className="text-secondary-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null; // This component only handles redirection
};

export default QRScanPage;