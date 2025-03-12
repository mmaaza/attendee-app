import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationConfirmationPage from './pages/RegistrationConfirmationPage';
import DigitalPassPage from './pages/DigitalPassPage';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Global Toast container */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
          },
          success: {
            duration: 2000,
            style: {
              background: '#4ade80',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4ade80',
            }
          },
          error: {
            duration: 4000,
            style: {
              background: '#f87171',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#f87171',
            }
          },
          loading: {
            style: {
              background: '#60a5fa',
              color: '#fff',
            }
          }
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="registration-confirmation" element={<RegistrationConfirmationPage />} />
          <Route path="digital-pass" element={<DigitalPassPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
