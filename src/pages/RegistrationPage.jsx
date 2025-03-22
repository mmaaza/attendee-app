import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { QRCodeSVG } from 'qrcode.react'; // Fix: correct import for qrcode.react

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    country: '',
    interests: []
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, interests: [...prev.interests, value] };
      } else {
        return { ...prev, interests: prev.interests.filter(interest => interest !== value) };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.firstName.trim()) {
      toast.error('Please enter your first name');
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error('Please enter your last name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.company.trim()) {
      toast.error('Please enter your company/organization');
      return;
    }
    if (!formData.jobTitle.trim()) {
      toast.error('Please enter your job title');
      return;
    }
    if (!formData.country) {
      toast.error('Please select your country');
      return;
    }
    if (formData.interests.length === 0) {
      toast.error('Please select at least one area of interest');
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading('Processing your registration...');

    try {
      // Generate a custom document ID
      const customId = `NEPDENT-${Math.floor(10000 + Math.random() * 90000)}`;

      // Save data to Firestore with custom ID
      const docRef = await addDoc(collection(db, 'users'), {
        ...formData,
        createdAt: new Date(), // Add a timestamp
        uid: customId // Add custom UID
      });

      // Generate QR code URL with the Firestore document ID
      const qrCodeUrl = `https://nepdent.netlify.app/check-in/${docRef.id}`;
      
      // Update the document with the QR code URL
      await updateDoc(doc(db, 'users', docRef.id), {
        qrCodeUrl: qrCodeUrl
      });

      // Dismiss loading toast and show success message
      toast.dismiss(loadingToast);
      toast.success('Registration successful! Redirecting to confirmation page...');

      // Navigate to confirmation page with custom ID and QR code URL
      navigate('/registration-confirmation', {
        state: {
          ...formData,
          attendeeId: customId, // Use custom ID as attendee ID
          documentId: docRef.id, // Pass the Firestore document ID
          qrCodeUrl: qrCodeUrl // Pass QR code URL to confirmation page
        }
      });
    } catch (error) {
      // Handle errors
      toast.dismiss(loadingToast);
      toast.error('Registration failed. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 py-12">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-900 mb-2">
            Register for NepDent IDS 2025
          </h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Join us in Kathmandu on April 18-20, 2025 for the premier dental event in Nepal
          </p>
        </div>

        {/* Registration form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl shadow-card border border-secondary-100 p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-secondary-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors"
                placeholder="Your first name"
                autoComplete="off"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-secondary-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors"
                placeholder="Your last name"
                autoComplete="off"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-secondary-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors"
                placeholder="you@example.com"
                autoComplete="off"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-secondary-700 mb-1">
                Company/Organization *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors"
                placeholder="Your organization"
                autoComplete="off"
              />
            </div>

            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-semibold text-secondary-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors"
                placeholder="Your role"
                autoComplete="off"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-secondary-700 mb-1">
                Country *
              </label>
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors bg-white pr-10"
                >
                  <option value="">Select your country</option>
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                  <option value="Germany">Germany</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="mt-8">
            <p className="block text-sm font-semibold text-secondary-700 mb-3">Areas of Interest (select all that apply)</p>
            <div className="bg-secondary-50 p-5 rounded-xl border border-secondary-100">
              <div className="grid md:grid-cols-2 gap-4">
                {['Dental Equipment', 'Materials', 'Technology', 'Preventive Care', 'Aesthetics', 'Oral Surgery', 'Digital Dentistry', 'Education'].map(interest => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={interest}
                      name="interests"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleCheckbox}
                      className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded transition-colors"
                    />
                    <label htmlFor={interest} className="ml-3 text-secondary-700 hover:text-primary-600 transition-colors">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-10 text-center">
            <button
              type="submit"
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:bg-primary-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Complete Registration
            </button>
            <p className="text-sm text-secondary-500 mt-4">
              By registering, you agree to our <a href="#" className="text-primary-600 hover:text-primary-700 underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</a>
            </p>
          </div>
        </form>

        {/* Registration info */}
        <div className="mt-8 bg-white p-5 rounded-xl shadow-sm border border-secondary-100">
          <div className="flex items-start gap-3">
            <div className="text-accent-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-secondary-900 font-semibold">Registration Information</h3>
              <p className="text-secondary-600 text-sm mt-1">
                After registration, you will receive a confirmation email with your attendee ID and detailed event information. For assistance, contact <span className="text-primary-600">support@nepdent.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;