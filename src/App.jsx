import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationConfirmationPage from './pages/RegistrationConfirmationPage';
import DigitalPassPage from './pages/DigitalPassPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
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
