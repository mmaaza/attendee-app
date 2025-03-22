import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CountdownTimer from '../components/CountdownTimer';

const HomePage = () => {  
  // Stats for the event
  const stats = [
    { value: '500+', label: 'Expected Exhibitors', icon: '🏢' },
    { value: '50+', label: 'Countries', icon: '🌎' },
    { value: '25K+', label: 'Expected Attendees', icon: '👥' },
    { value: '100+', label: 'Renowned Speakers', icon: '🎤' }
  ];
  
  // Featured speakers
  const speakers = [
    { name: 'Dr. Emma Wilson', role: 'Digital Dentistry Expert', image: 'https://images.pexels.com/photos/6194365/pexels-photo-6194365.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Dr. James Chen', role: 'Implantology Specialist', image: 'https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Dr. Sarah Johnson', role: 'Orthodontics Innovator', image: 'https://images.pexels.com/photos/6608313/pexels-photo-6608313.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];
  
  // Testimonials - updated for anticipation rather than past experience
  const testimonials = [
    { text: "As an industry leader, I'm eagerly looking forward to the first DTS in Nepal. It represents a milestone for dental innovation in the region.", author: "Dr. Michael Stevens", role: "Dental Surgeon" },
    { text: "The inaugural DTS in Nepal promises unprecedented networking opportunities for dental professionals across Asia and beyond.", author: "Dr. Linda Murray", role: "Orthodontist" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 md:w-64 md:h-64 bg-accent-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-40 left-10 w-36 h-36 md:w-72 md:h-72 bg-primary-200 rounded-full blur-3xl opacity-30"></div>
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 pt-8 md:pt-16 pb-6 md:pb-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-8">
            <div>
              <span className="inline-block px-2 py-1 text-xs md:text-sm font-semibold text-accent-700 bg-accent-50 rounded-full shadow-sm">
                April 18-20, 2025 • Kathmandu, Nepal
              </span>
              <h1 className="mt-3 md:mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight text-secondary-900 sm:text-6xl">
                <span className="block text-primary-600">Dental Trade</span>
                <span className="block">Show 2025</span>
              </h1>
              <p className="mt-3 md:mt-4 text-base md:text-xl text-secondary-600">
                The inaugural edition of Nepal's premier dental exhibition, bringing together global innovation, professional networking, and industry insights.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/register" className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg font-medium rounded-xl bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Register Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="relative mt-6 md:mt-0">
            <div className="absolute inset-0 bg-accent-100 transform rotate-3 rounded-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img 
                src="https://images.pexels.com/photos/4687360/pexels-photo-4687360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Dental Exhibition" 
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Countdown Timer */}
      <CountdownTimer />
      
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-card hover:shadow-xl transition-shadow duration-300 border border-secondary-100 transform hover:-translate-y-1">
              <div className="text-2xl md:text-4xl mb-2 md:mb-3">{stat.icon}</div>
              <div className="text-xl md:text-3xl font-bold text-primary-700">{stat.value}</div>
              <div className="text-sm md:text-base text-secondary-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-3 md:mb-4 font-display">What to Expect</h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-secondary-600">Join us for the historic first edition of DTS Nepal 2025</p>
        </div>
        
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl overflow-hidden shadow-card group hover:shadow-xl transition-all duration-300">
            <div className="h-36 md:h-48 bg-primary-600 flex items-center justify-center group-hover:bg-primary-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-secondary-900 mb-2">Global Innovations</h3>
              <p className="text-sm md:text-base text-secondary-600">Be among the first to witness cutting-edge dental technologies making their debut in Nepal, from AI diagnostics to 3D printing solutions.</p>
              <Link to="/innovations" className="mt-3 md:mt-4 inline-flex items-center text-primary-600 hover:text-primary-700 text-sm md:text-base">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-card group hover:shadow-xl transition-all duration-300">
            <div className="h-36 md:h-48 bg-accent-500 flex items-center justify-center group-hover:bg-accent-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-secondary-900 mb-2">Networking Opportunities</h3>
              <p className="text-sm md:text-base text-secondary-600">Form valuable connections with industry leaders and peers from across Asia and beyond through our carefully designed networking programs.</p>
              <Link to="/networking" className="mt-3 md:mt-4 inline-flex items-center text-accent-600 hover:text-accent-700 text-sm md:text-base">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-card group hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="h-36 md:h-48 bg-success flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-secondary-900 mb-2">Knowledge Exchange</h3>
              <p className="text-sm md:text-base text-secondary-600">Participate in groundbreaking workshops, seminars, and hands-on training sessions led by internationally recognized dental experts.</p>
              <Link to="/education" className="mt-3 md:mt-4 inline-flex items-center text-success hover:text-green-600 text-sm md:text-base">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Speakers Section */}
      <div className="bg-secondary-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-3 md:mb-4 font-display">Featured Speakers</h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-secondary-600">Learn from the brightest minds in dentistry</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 text-white">
                    <h3 className="font-bold text-lg md:text-xl">{speaker.name}</h3>
                    <p className="text-sm md:text-base">{speaker.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-10">
            <Link to="/speakers" className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 text-sm md:text-base border border-secondary-300 rounded-xl text-secondary-700 hover:bg-secondary-100 transition-colors">
              View All Speakers
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials - Updated for anticipation */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-3 md:mb-4 font-display">Industry Excitement</h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-secondary-600">Hear what dental professionals are saying about the first-ever DTS in Nepal</p>
        </div>
        
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-5 md:p-8 rounded-xl shadow-card border border-secondary-100 relative">
              <div className="absolute top-3 md:top-4 left-3 md:left-4 text-4xl md:text-5xl text-primary-200">"</div>
              <div className="relative z-10 pt-4 md:pt-0">
                <p className="text-base md:text-lg text-secondary-700 mb-4 md:mb-6">{testimonial.text}</p>
                <div>
                  <p className="font-bold text-secondary-900">{testimonial.author}</p>
                  <p className="text-sm md:text-base text-secondary-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-10 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 font-display">Be Part of Dental History in Nepal</h2>
          <p className="text-base md:text-xl text-primary-100 mb-6 md:mb-8">April 18-20, 2025 • Kathmandu, Nepal</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Link to="/register" className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium rounded-xl bg-white text-primary-700 shadow-lg hover:bg-primary-50 transition-colors">
              Register Now
            </Link>
            <Link to="/program" className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors">
              View Full Program
            </Link>
          </div>
        </div>
      </div>
      
      {/* Event Details with Map */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4 md:mb-6 font-display">Event Details</h2>
            <dl className="space-y-3 md:space-y-4">
              <div className="flex gap-3 md:gap-4 items-start">
                <div className="bg-primary-100 p-2 md:p-3 rounded-lg text-primary-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <dt className="font-semibold text-secondary-900">Date</dt>
                  <dd className="text-sm md:text-base text-secondary-600">April 18-20, 2025</dd>
                </div>
              </div>
              
              <div className="flex gap-3 md:gap-4 items-start">
                <div className="bg-primary-100 p-2 md:p-3 rounded-lg text-primary-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <dt className="font-semibold text-secondary-900">Venue</dt>
                  <dd className="text-sm md:text-base text-secondary-600">Kathmandu Exhibition Center, Nepal</dd>
                </div>
              </div>
              
              <div className="flex gap-3 md:gap-4 items-start">
                <div className="bg-primary-100 p-2 md:p-3 rounded-lg text-primary-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <dt className="font-semibold text-secondary-900">Hours</dt>
                  <dd className="text-sm md:text-base text-secondary-600">9:00 AM - 6:00 PM Daily</dd>
                </div>
              </div>
            </dl>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-lg border border-secondary-200 h-60 md:h-80 bg-secondary-100 mt-4 md:mt-0">
            <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=Kathmandu,Nepal&zoom=14&size=600x400&markers=Kathmandu,Nepal&key=YOUR_API_KEY')"}}>
              <div className="w-full h-full flex items-center justify-center bg-secondary-200">
                <span className="text-secondary-600 text-sm md:text-base">Event Location Map</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;