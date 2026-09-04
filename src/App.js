import React, { useState } from 'react';
import './App.css';

// Complete dataset mapped to your exact saved image filenames and extensions
const ALL_IMAGES = [
  // Weddings Category (b1 to b5)
  { id: 1, title: 'Wedding Memories 1', category: 'Weddings', url: '/images/b1.jpg' },
  { id: 2, title: 'Wedding Memories 2', category: 'Weddings', url: '/images/b2.jpg' },
  { id: 3, title: 'Wedding Memories 3', category: 'Weddings', url: '/images/b3.jpg' },
  { id: 4, title: 'Wedding Memories 4', category: 'Weddings', url: '/images/b4.jpg' },
  { id: 5, title: 'Wedding Memories 5', category: 'Weddings', url: '/images/b5.jpg' },

  // Nature Category (n1 to n16 with exact extensions .jpg, .avif, .webp)
  { id: 6, title: 'Nature Shot 1', category: 'Nature', url: '/images/n1.jpg' },
  { id: 7, title: 'Nature Shot 2', category: 'Nature', url: '/images/n2.jpg' },
  { id: 8, title: 'Nature Shot 3', category: 'Nature', url: '/images/n3.jpg' },
  { id: 9, title: 'Nature Shot 4', category: 'Nature', url: '/images/n4.jpg' },
  { id: 10, title: 'Nature Shot 5', category: 'Nature', url: '/images/n5.jpg' },
  { id: 11, title: 'Nature Shot 6', category: 'Nature', url: '/images/n6.avif' },
  { id: 12, title: 'Nature Shot 7', category: 'Nature', url: '/images/n7.avif' },
  { id: 13, title: 'Nature Shot 8', category: 'Nature', url: '/images/n8.avif' },
  { id: 14, title: 'Nature Shot 9', category: 'Nature', url: '/images/n9.avif' },
  { id: 15, title: 'Nature Shot 10', category: 'Nature', url: '/images/n10.avif' },
  { id: 16, title: 'Nature Shot 11', category: 'Nature', url: '/images/n11.avif' },
  { id: 17, title: 'Nature Shot 12', category: 'Nature', url: '/images/n12.avif' },
  { id: 18, title: 'Nature Shot 13', category: 'Nature', url: '/images/n13.webp' },
  { id: 19, title: 'Nature Shot 14', category: 'Nature', url: '/images/n14.jpg' },
  { id: 20, title: 'Nature Shot 15', category: 'Nature', url: '/images/n15.webp' },
  { id: 21, title: 'Nature Shot 16', category: 'Nature', url: '/images/n16.webp' },

  // Portraits Category (p1 to p5)
  { id: 22, title: 'Portrait Session 1', category: 'Portraits', url: '/images/p1.jpg' },
  { id: 23, title: 'Portrait Session 2', category: 'Portraits', url: '/images/p2.jpg' },
  { id: 24, title: 'Portrait Session 3', category: 'Portraits', url: '/images/p3.jpg' },
  { id: 25, title: 'Portrait Session 4', category: 'Portraits', url: '/images/p4.jpg' },
  { id: 26, title: 'Portrait Session 5', category: 'Portraits', url: '/images/p5.jpg' },

  // Events & Extra Category
  { id: 27, title: 'Special Event', category: 'Events', url: '/images/w1.jpg' },
  { id: 28, title: 'Studio Portfolio Shot', category: 'Events', url: '/images/images (6).jpg' }
];

const SERVICES = [
  { id: 's1', icon: '📸', title: 'Wedding Photography', desc: 'Comprehensive coverage from Mehndi to Walima with cinematic storytelling.' },
  { id: 's2', icon: '🎬', title: 'Cinematic Videography', desc: '4K ultra-HD event videos, drone shots, highlight teasers, and full coverage.' },
  { id: 's3', icon: '👤', title: 'Portrait & Portfolio', desc: 'High-end studio sessions and outdoor lighting portraits.' },
  { id: 's4', icon: '🎉', title: 'Event Coverage', desc: 'Corporate meets, birthday parties, and fashion shows.' }
];

const PACKAGES = [
  { id: 'p1', name: 'Essential Package', price: 'PKR 45,000', popular: false, features: ['1 Photographer', '4 Hours Coverage', '100 Edited Photos', 'Digital Drive Link'] },
  { id: 'p2', name: 'Signature Package', price: 'PKR 85,000', popular: true, features: ['2 Photographers + 1 Videographer', 'Full Day Coverage', '250+ Edited Photos', '4K Teaser Video', 'Printed Luxury Album'] },
  { id: 'p3', name: 'Royal Package', price: 'PKR 150,000', popular: false, features: ['3 Photographers + 2 Videographers', 'Multi-day Coverage', 'Unlimited Edited Photos', 'Drone Coverage + 2 Acrylic Albums'] }
];

const REVIEWS = [
  { id: 1, name: 'Ayesha & Bilal', role: 'Wedding Client', text: 'Captured our special moments so beautifully! The photos and album look stunning.', rating: '★★★★★' },
  { id: 2, name: 'Hamza Malik', role: 'Corporate Client', text: 'Extremely professional team. Delivered our corporate event photos right on time.', rating: '★★★★★' },
  { id: 3, name: 'Zainab Shah', role: 'Portrait Client', text: 'Super comfortable solo photoshoot experience. Highly recommended!', rating: '★★★★★' }
];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', date: '', pkg: 'Signature Package' });

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    alert(`Thank you ${booking.name}! Your booking request for ${booking.date} has been submitted.`);
    setBooking({ name: '', email: '', phone: '', date: '', pkg: 'Signature Package' });
  };

  const filteredGallery = activeCategory === 'All' 
    ? ALL_IMAGES 
    : ALL_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">CaptureStudio</div>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#gallery">Gallery</a>
          <a href="#services">Services</a>
          <a href="#packages">Packages</a>
          <a href="#about">About</a>
          <a href="#favorites">Favorites ({favorites.length})</a>
          <a href="#booking">Booking</a>
        </div>

        {/* Login / Logout State Toggle Button */}
        {isLoggedIn ? (
          <button className="btn-login logged-in" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="btn-login" onClick={() => setShowLoginModal(true)}>Login</button>
        )}
      </nav>

      {/* Hero Section using local hero-bg.jpg image */}
      <section 
        id="hero" 
        className="hero-section" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/hero-bg.jpg')` }}
      >
        <div className="hero-content">
          <h1>Capturing Timeless Stories</h1>
          <p>Professional photography and videography for Weddings, Portraits, Nature, and Events.</p>
          <a href="#booking" className="btn-primary">Book Your Session</a>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-container">
        <div className="section-header">
          <h2>Our Portfolio ({filteredGallery.length} Photos)</h2>
          <p>Browse through our work across different categories</p>
        </div>

        {/* Category Filters */}
        <div className="filter-bar">
          {['All', 'Weddings', 'Portraits', 'Nature', 'Events'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="gallery-grid">
          {filteredGallery.map(img => (
            <div key={img.id} className="gallery-card">
              <div className="img-container">
                <img src={img.url} alt={img.title} loading="lazy" />
                <button 
                  className={`btn-heart ${favorites.includes(img.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(img.id)}
                >
                  ♥
                </button>
              </div>
              <div className="card-info">
                <h4>{img.title}</h4>
                <span>{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-container bg-light">
        <div className="section-header">
          <h2>Services Offered</h2>
        </div>
        <div className="grid-4">
          {SERVICES.map(s => (
            <div key={s.id} className="service-card">
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section-container">
        <div className="section-header">
          <h2>Packages & Pricing</h2>
        </div>
        <div className="grid-3">
          {PACKAGES.map(pkg => (
            <div key={pkg.id} className={`package-card ${pkg.popular ? 'highlighted' : ''}`}>
              {pkg.popular && <span className="badge">Popular Choice</span>}
              <h3>{pkg.name}</h3>
              <div className="price">{pkg.price}</div>
              <ul>
                {pkg.features.map((f, i) => <li key={i}>✓ {f}</li>)}
              </ul>
              <a href="#booking" className="btn-primary" onClick={() => setBooking({...booking, pkg: pkg.name})}>
                Select Package
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* About & Reviews Section */}
      <section id="about" className="section-container bg-light">
        <div className="about-grid">
          <img src="/images/b1.jpg" alt="About Photographer" />
          <div>
            <h2>About CaptureStudio</h2>
            <p>We are a passionate team of photographers and cinematographers specializing in capturing your precious moments with high definition art and emotion.</p>
          </div>
        </div>

        <div className="reviews-section">
          <h3>Client Reviews</h3>
          <div className="grid-3">
            {REVIEWS.map(r => (
              <div key={r.id} className="review-card">
                <div className="rating">{r.rating}</div>
                <p>"{r.text}"</p>
                <h4>- {r.name} ({r.role})</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Favorites Section */}
      <section id="favorites" className="section-container">
        <div className="section-header">
          <h2>Saved Favorites ({favorites.length})</h2>
        </div>
        {favorites.length === 0 ? (
          <p className="text-center">No favorite images added yet. Click the heart icon on any picture above!</p>
        ) : (
          <div className="gallery-grid">
            {ALL_IMAGES.filter(img => favorites.includes(img.id)).map(img => (
              <div key={img.id} className="gallery-card">
                <div className="img-container">
                  <img src={img.url} alt={img.title} />
                  <button className="btn-heart active" onClick={() => toggleFavorite(img.id)}>♥</button>
                </div>
                <div className="card-info">
                  <h4>{img.title}</h4>
                  <span>{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Booking Section */}
      <section id="booking" className="section-container bg-light">
        <div className="booking-card">
          <h2>Book Your Session</h2>
          <form onSubmit={handleBooking}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" required value={booking.name} onChange={e => setBooking({...booking, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required value={booking.email} onChange={e => setBooking({...booking, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" required value={booking.phone} onChange={e => setBooking({...booking, phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" required value={booking.date} onChange={e => setBooking({...booking, date: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Package Tier</label>
              <select value={booking.pkg} onChange={e => setBooking({...booking, pkg: e.target.value})}>
                <option>Essential Package</option>
                <option>Signature Package</option>
                <option>Royal Package</option>
              </select>
            </div>
            <button type="submit" className="btn-primary full-width">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer Social Icons */}
      <footer className="footer">
        <p>&copy; 2026 CaptureStudio. All Rights Reserved.</p>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn instagram" title="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="social-btn whatsapp" title="WhatsApp">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-btn tiktok" title="TikTok">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.3 2.55.01 1.01.55 1.97 1.41 2.48.83.51 1.91.56 2.78.14.88-.41 1.49-1.28 1.58-2.25.03-3.66.02-7.31.02-10.97z"/>
            </svg>
          </a>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-backdrop" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>&times;</button>
            <h3>Account Login</h3>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="yourname@gmail.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" required placeholder="••••••••" />
              </div>
              <button type="submit" className="btn-primary full-width">Sign In</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;