import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    // Generate a unique ID for the attendee (would come from your backend in a real app)
    const attendeeId = `IDS2025-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Navigate to confirmation page with form data
    navigate('/registration-confirmation', { 
      state: { 
        ...formData,
        attendeeId 
      } 
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Register for IDS 2025</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company/Organization *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your country</option>
              <option value="Germany">Germany</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest (select all that apply)</p>
          <div className="grid md:grid-cols-2 gap-2">
            {['Dental Equipment', 'Materials', 'Technology', 'Preventive Care', 'Aesthetics', 'Oral Surgery'].map(interest => (
              <div key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  id={interest}
                  name="interests"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleCheckbox}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={interest} className="ml-2 text-sm text-gray-700">
                  {interest}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;