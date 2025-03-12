import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CountdownTimer from '../components/CountdownTimer';

const HomePage = () => {  
  // Stats for the event
  const stats = [
    { value: '500+', label: 'Exhibitors', icon: '🏢' },
    { value: '50+', label: 'Countries', icon: '🌎' },
    { value: '25K+', label: 'Attendees', icon: '👥' },
    { value: '100+', label: 'Speakers', icon: '🎤' }
  ];
  
  // Featured speakers
  const speakers = [
    { name: 'Dr. Emma Wilson', role: 'Digital Dentistry Expert', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Dr. James Chen', role: 'Implantology Specialist', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Dr. Sarah Johnson', role: 'Orthodontics Innovator', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  ];
  
  // Testimonials
  const testimonials = [
    { text: "IDS 2023 was absolutely game-changing for my practice. The innovations I discovered there have transformed how we work.", author: "Dr. Michael Stevens", role: "Dental Surgeon" },
    { text: "The networking opportunities at IDS are unmatched. I've established partnerships that have been instrumental to my career growth.", author: "Dr. Linda Murray", role: "Orthodontist" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30"></div>
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-accent-700 bg-accent-50 rounded-full shadow-sm">
                April 18-20, 2025 • Kathmandu, Nepal
              </span>
              <h1 className="mt-4 text-5xl font-display font-bold tracking-tight text-secondary-900 sm:text-6xl">
                <span className="block text-primary-600">International</span>
                <span className="block">Dental Show 2025</span>
              </h1>
              <p className="mt-4 text-xl text-secondary-600">
                The world's leading trade fair for cutting-edge dental innovation, professional networking, and industry insights.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-xl bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Register Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="/program" className="inline-flex items-center px-6 py-3 text-lg font-medium border-2 border-primary-600 text-primary-700 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                View Program
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-accent-100 transform rotate-3 rounded-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img 
                src="https://images.pexels.com/photos/4687360/pexels-photo-4687360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Dental Exhibition" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Countdown Timer */}
      <CountdownTimer />
      
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-card hover:shadow-xl transition-shadow duration-300 border border-secondary-100 transform hover:-translate-y-1">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-700">{stat.value}</div>
              <div className="text-secondary-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 font-display">Event Highlights</h2>
          <p className="max-w-2xl mx-auto text-secondary-600">Discover why IDS 2025 is the most anticipated dental event globally</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-card group hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-primary-600 flex items-center justify-center group-hover:bg-primary-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Latest Innovations</h3>
              <p className="text-secondary-600">Experience firsthand the cutting-edge technologies transforming the dental industry, from AI diagnostics to 3D printing solutions.</p>
              <Link to="/innovations" className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-card group hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-accent-500 flex items-center justify-center group-hover:bg-accent-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Networking Events</h3>
              <p className="text-secondary-600">Connect with peers and industry leaders through structured networking sessions, social events, and specialized matchmaking programs.</p>
              <Link to="/networking" className="mt-4 inline-flex items-center text-accent-600 hover:text-accent-700">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-card group hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-success flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Educational Programs</h3>
              <p className="text-secondary-600">Enhance your skills with comprehensive workshops, seminars, and hands-on training sessions led by internationally recognized experts.</p>
              <Link to="/education" className="mt-4 inline-flex items-center text-success hover:text-green-600">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Speakers Section */}
      <div className="bg-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 font-display">Featured Speakers</h2>
            <p className="max-w-2xl mx-auto text-secondary-600">Learn from the brightest minds in dentistry</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-xl">{speaker.name}</h3>
                    <p>{speaker.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/speakers" className="inline-flex items-center px-6 py-3 border border-secondary-300 rounded-xl text-secondary-700 hover:bg-secondary-100 transition-colors">
              View All Speakers
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 font-display">What Attendees Say</h2>
          <p className="max-w-2xl mx-auto text-secondary-600">Hear from professionals who've experienced the impact of IDS</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-card border border-secondary-100 relative">
              <div className="absolute top-4 left-4 text-5xl text-primary-200">"</div>
              <div className="relative z-10">
                <p className="text-lg text-secondary-700 mb-6">{testimonial.text}</p>
                <div>
                  <p className="font-bold text-secondary-900">{testimonial.author}</p>
                  <p className="text-secondary-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-display">Secure Your Place at the World's Premier Dental Event</h2>
          <p className="text-xl text-primary-100 mb-8">March 10-14, 2025 • Koelnmesse, Cologne, Germany</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl bg-white text-primary-700 shadow-lg hover:bg-primary-50 transition-colors">
              Register Now
            </Link>
            <Link to="/program" className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors">
              View Full Program
            </Link>
          </div>
        </div>
      </div>
      
      {/* Event Details with Map */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 font-display">Event Details</h2>
            <dl className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-primary-100 p-3 rounded-lg text-primary-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <dt className="font-semibold text-secondary-900">Date</dt>
                  <dd className="text-secondary-600">March 10-14, 2025</dd>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-primary-100 p-3 rounded-lg text-primary-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <dt className="font-semibold text-secondary-900">Venue</dt>
                  <dd className="text-secondary-600">Koelnmesse, Cologne, Germany</dd>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-primary-100 p-3 rounded-lg text-primary-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <dt className="font-semibold text-secondary-900">Hours</dt>
                  <dd className="text-secondary-600">9:00 AM - 6:00 PM Daily</dd>
                </div>
              </div>
            </dl>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-lg border border-secondary-200 h-80 bg-secondary-100">
            <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=Koelnmesse,Cologne,Germany&zoom=14&size=600x400&markers=Koelnmesse,Cologne,Germany&key=YOUR_API_KEY')"}}>
              {/* Replace with actual map or image */}
              <div className="w-full h-full flex items-center justify-center bg-secondary-200">
                <span className="text-secondary-600">Event Location Map</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;