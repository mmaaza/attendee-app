import { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import toast from 'react-hot-toast';

const HomePageContentPage = () => {
  const [content, setContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      eventDate: 'April 18-20, 2025',
      location: 'Kathmandu, Nepal',
    },
    stats: [
      { value: '', label: '', icon: '🏢' },
      { value: '', label: '', icon: '🌎' },
      { value: '', label: '', icon: '👥' },
      { value: '', label: '', icon: '🎤' }
    ],
    speakers: [
      { name: '', role: '', image: '' },
      { name: '', role: '', image: '' },
      { name: '', role: '', image: '' }
    ],
    testimonials: [
      { text: '', author: '', role: '' },
      { text: '', author: '', role: '' }
    ],
    features: [
      {
        title: '',
        description: '',
        link: '/innovations'
      },
      {
        title: '',
        description: '',
        link: '/networking'
      },
      {
        title: '',
        description: '',
        link: '/education'
      }
    ],
    eventDetails: {
      venue: '',
      hours: '',
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const docRef = doc(collection(db, 'content'), 'homepage');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setContent(docSnap.data());
      }
    } catch (error) {
      toast.error('Error loading content');
      console.error('Error loading content:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(collection(db, 'content'), 'homepage');
      await setDoc(docRef, content, { merge: true });
      toast.success('Content saved successfully');
    } catch (error) {
      toast.error('Error saving content');
      console.error('Error saving content:', error);
    }
    setIsSaving(false);
  };

  const updateHero = (field, value) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateStats = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const updateSpeakers = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      speakers: prev.speakers.map((speaker, i) => 
        i === index ? { ...speaker, [field]: value } : speaker
      )
    }));
  };

  const updateTestimonials = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };

  const updateFeatures = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const updateEventDetails = (field, value) => {
    setContent(prev => ({
      ...prev,
      eventDetails: { ...prev.eventDetails, [field]: value }
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-display text-secondary-900">Homepage Content Management</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-secondary-700 mb-1">Title</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => updateHero('title', e.target.value)}
              className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary-700 mb-1">Subtitle</label>
            <textarea
              value={content.hero.subtitle}
              onChange={(e) => updateHero('subtitle', e.target.value)}
              className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStats(index, 'value', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStats(index, 'label', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speakers Section */}
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Featured Speakers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.speakers.map((speaker, index) => (
            <div key={index} className="space-y-4 p-4 border border-secondary-100 rounded-xl">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Name</label>
                <input
                  type="text"
                  value={speaker.name}
                  onChange={(e) => updateSpeakers(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Role</label>
                <input
                  type="text"
                  value={speaker.role}
                  onChange={(e) => updateSpeakers(index, 'role', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={speaker.image}
                  onChange={(e) => updateSpeakers(index, 'image', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.features.map((feature, index) => (
            <div key={index} className="space-y-4 p-4 border border-secondary-100 rounded-xl">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Title</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeatures(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeatures(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-4 p-4 border border-secondary-100 rounded-xl">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Text</label>
                <textarea
                  value={testimonial.text}
                  onChange={(e) => updateTestimonials(index, 'text', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Author</label>
                <input
                  type="text"
                  value={testimonial.author}
                  onChange={(e) => updateTestimonials(index, 'author', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-1">Role</label>
                <input
                  type="text"
                  value={testimonial.role}
                  onChange={(e) => updateTestimonials(index, 'role', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Section */}
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-secondary-700 mb-1">Venue</label>
            <input
              type="text"
              value={content.eventDetails.venue}
              onChange={(e) => updateEventDetails('venue', e.target.value)}
              className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary-700 mb-1">Hours</label>
            <input
              type="text"
              value={content.eventDetails.hours}
              onChange={(e) => updateEventDetails('hours', e.target.value)}
              className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageContentPage;