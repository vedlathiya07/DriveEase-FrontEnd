import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate, useParams } from 'react-router-dom';
import { Role, Car, Booking } from './types';
import { CARS, ADD_ONS, NEARBY_SERVICES } from './data/mockData';

// --- Context & Auth Simulation ---
interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  user: { name: string; email: string } | null;
  setUser: (u: any) => void;
  currentBooking: Partial<Booking>;
  setCurrentBooking: React.Dispatch<React.SetStateAction<Partial<Booking>>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

const AppContext = createContext<AppContextType | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);
  const [user, setUser] = useState(null);
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking>>({});
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'BK-101', carId: 'h1', carName: 'Maruti Suzuki Swift', status: 'Completed', date: '2023-12-01', totalPrice: 3600 },
    { id: 'BK-102', carId: 's1', carName: 'Tata Nexon EV', status: 'Ongoing', date: '2024-05-20', totalPrice: 7500 }
  ]);

  return (
    <AppContext.Provider value={{ role, setRole, user, setUser, currentBooking, setCurrentBooking, bookings, setBookings }}>
      {children}
    </AppContext.Provider>
  );
};

// --- Components ---
const Navbar = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    context?.setRole(null);
    context?.setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
      <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
        <span className="bg-blue-600 text-white p-1 rounded">🚗</span> DriveEase
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/cars" className="text-slate-600 hover:text-blue-600 transition-colors">Browse Cars</Link>
        {context?.role ? (
          <>
            <Link to={context.role === 'user' ? "/dashboard" : "/owner-dashboard"} className="text-slate-600 hover:text-blue-600 transition-colors">Dashboard</Link>
            <button onClick={handleLogout} className="bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 transition-all">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all">Login</Link>
        )}
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-16 px-4 md:px-8 mt-auto">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-white font-bold text-2xl mb-4">DriveEase</h3>
        <p className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
          Revolutionizing personal mobility with smart car rental solutions.
          Our academic prototype showcases the future of transparent,
          IoT-enabled vehicle sharing for Design Engineering (GTU).
        </p>
      </div>
      <div>
        <h3 className="text-white font-bold mb-6">Explore</h3>
        <ul className="text-sm space-y-4">
          <li><Link to="/cars" className="hover:text-blue-400 transition-colors">View All Cars</Link></li>
          <li><Link to="/login" className="hover:text-blue-400 transition-colors">Join as Owner</Link></li>
          <li><Link to="/" className="hover:text-blue-400 transition-colors">Our Vision</Link></li>
          <li><Link to="/" className="hover:text-blue-400 transition-colors">Support Hub</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold mb-6">Contact</h3>
        <ul className="text-sm space-y-4">
          <li className="flex items-center justify-center md:justify-start gap-2 transition-colors hover:text-white cursor-default">📍 Ahmedabad, Gujarat</li>
          <li className="flex items-center justify-center md:justify-start gap-2 transition-colors hover:text-white cursor-default">✉️ support@driveease.edu</li>
          <li className="flex items-center justify-center md:justify-start gap-2 transition-colors hover:text-white cursor-default">📞 +91 98765 43210</li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-xs">
      <p>© 2024 DriveEase Academic Prototype. All rights reserved.</p>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => (
  <div className="flex flex-col">
    {/* Hero Section */}
    <section className="bg-gradient-to-br from-blue-700 to-blue-500 py-24 px-4 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
          GTU Design Engineering Prototype
        </span>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Your Smart Journey <br /> Starts Here</h1>
        <p className="text-xl md:text-2xl mb-12 text-blue-50 opacity-90 leading-relaxed">
          The only car rental platform that combines IoT Smart Locks,
          instant condition reports, and local service integration.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/cars" className="bg-white text-blue-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-slate-100 transition-all hover:scale-105">
            Browse Cars
          </Link>
          <Link to="/login" className="bg-blue-800/40 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg border border-white/20 hover:bg-blue-800/60 transition-all">
            List Your Car
          </Link>
        </div>
      </div>
    </section>

    {/* Statistics Section */}
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Active Users', val: '5,000+' },
          { label: 'Fleet Size', val: '500+' },
          { label: 'Cities Covered', val: '25+' },
          { label: 'Happy Kilometers', val: '1M+' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-black text-blue-600 mb-1">{stat.val}</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black mb-4 text-slate-900">How DriveEase Works</h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">Simplified 3-step process to get you on the road in minutes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { step: '01', title: 'Pick Your Car', desc: 'Browse our massive fleet of 24+ high-quality cars across all segments.', icon: '🔍' },
            { step: '02', title: 'Set Preferences', desc: 'Choose between home delivery, meetup point, or self-pickup via Smart Lock.', icon: '⚙️' },
            { step: '03', title: 'Ride & Report', desc: 'Generate your OTP, unlock the car, and complete a quick condition report.', icon: '🏁' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all">
              <span className="absolute -top-6 left-10 text-6xl font-black text-blue-500/10 group-hover:text-blue-500/20 transition-colors">{item.step}</span>
              <div className="text-5xl mb-8">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Fleet Preview */}
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black mb-4 text-slate-900">Featured Fleet</h2>
            <p className="text-slate-500 text-lg">A glimpse into our curated selection of premium vehicles.</p>
          </div>
          <Link to="/cars" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
            View Full Fleet
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARS.slice(0, 3).map((car) => (
            <div key={car.id} className="bg-slate-50 rounded-[40px] overflow-hidden group border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-64 overflow-hidden relative bg-slate-200">
                <img
                  src={car.image}
                  className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
                  alt={car.name}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase text-blue-600">
                  {car.type}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-slate-800">{car.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-blue-600 font-black text-2xl">₹{car.pricePerDay}<span className="text-slate-400 text-sm font-normal">/day</span></p>
                  <Link to={`/car/${car.id}`} className="p-3 bg-white border border-slate-200 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us section */}
    <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-black mb-8 leading-tight">Why DriveEase is the smarter choice.</h2>
          <div className="space-y-10">
            {[
              { title: 'IoT Enabled Smart Locks', desc: 'Skip the key exchange. Unlock your car directly through the app using a secure one-time token.', icon: '🔓' },
              { title: 'Zero Hidden Costs', desc: 'Transparent pricing from the start. All rentals include comprehensive insurance and assistance.', icon: '💎' },
              { title: 'Instant Condition Reports', desc: 'Automated photo-based condition checks protect you from unfair damage liability.', icon: '🛡️' },
              { title: '24/7 Roadside Hubs', desc: 'Our extensive network of nearby services ensures you are never stranded.', icon: '🛠️' }
            ].map((f, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-3xl bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">{f.icon}</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">{f.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600 opacity-20 blur-[100px] rounded-full"></div>
          <div className="relative z-10 p-4 bg-white/5 rounded-[60px] border border-white/10 shadow-2xl overflow-hidden aspect-square">
            <img
              src="/images/smarter-choice.png"
              alt="Driving Experience"
              className="w-full h-full object-cover rounded-[50px] opacity-90 block"
            />

          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black mb-4 text-slate-900">User Stories</h2>
          <p className="text-slate-500 text-lg">Voices of satisfaction from our growing community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { user: 'Krupali Shah', role: 'Business Traveler', text: 'The self-pickup feature is a total game changer. I reached Ahmedabad at 3 AM and was on my way home in minutes without meeting anyone.', img: 'https://i.pravatar.cc/150?u=kunal' },
            { user: 'Meet Dave', role: 'Adventure Enthusiast', text: 'Rented the Mahindra XUV700 for a Rann of Kutch trip. The car was spotless, and the condition report feature gave me absolute peace of mind.', img: 'https://i.pravatar.cc/150?u=ishita' },
            { user: 'Ishita Patel', role: 'Daily Commuter', text: 'Smart, efficient and affordable. The nearby services integration helped me find a charging station easily during my first EV rental.', img: 'https://i.pravatar.cc/150?u=meet' }
          ].map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-[30px] shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-8">
                <img src={t.img} className="w-14 h-14 rounded-full border-2 border-blue-50" alt={t.user} loading="lazy" />
                <div>
                  <h4 className="font-bold text-slate-800">{t.user}</h4>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
              <p className="text-slate-500 italic flex-grow leading-relaxed">"{t.text}"</p>
              <div className="mt-8 flex text-orange-400 text-sm gap-1">
                {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Final Call to Action */}
    <section className="py-24 px-4 bg-blue-600 text-white text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 blur-[100px] rounded-full"></div>
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-5xl font-black mb-8 leading-tight">Your premium rental <br /> experience awaits.</h2>
        <p className="text-xl mb-12 opacity-90 max-w-xl mx-auto leading-relaxed">Join 50,000+ happy travelers across 25+ cities in India. Experience mobility like never before.</p>
        <Link to="/cars" className="bg-white text-blue-600 px-14 py-5 rounded-[30px] font-black text-xl shadow-2xl hover:scale-110 transition-transform inline-block">
          Explore All Cars
        </Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] opacity-50">Free Cancellation • Full Insurance Included</p>
      </div>
    </section>
  </div>
);

const LoginPage = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [role, setRole] = useState<'user' | 'owner'>('user');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    context?.setRole(role);
    context?.setUser({ name: role === 'user' ? 'Test User' : 'Test Owner', email: 'test@example.com' });
    navigate(role === 'user' ? '/dashboard' : '/owner-dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 py-12 bg-slate-50">
      <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-2xl w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🚗</div>
          <h2 className="text-3xl font-black text-slate-900">Sign In</h2>
          <p className="text-slate-400 text-sm mt-2">Access your personalized dashboard</p>
        </div>

        <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-10">
          <button
            onClick={() => setRole('user')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${role === 'user' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >Renter</button>
          <button
            onClick={() => setRole('owner')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${role === 'owner' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >Owner</button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Account Identifier</label>
            <input type="text" placeholder="email@example.com" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all" required />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:translate-y-[-2px]">
            Sign In as {role === 'user' ? 'Renter' : 'Owner'}
          </button>
        </form>
      </div>
    </div>
  );
};

const CarListingPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredCars = filter === 'All' ? CARS : CARS.filter(c => c.type === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black mb-2 text-slate-900">Our 2024 Fleet</h1>
          <p className="text-slate-500 text-lg">Select the perfect companion for your journey.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-4 md:pb-0">
          {['All', 'SUV', 'Sedan', 'Hatchback'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all border-2 ${filter === type ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 hover:border-blue-100'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCars.map(car => (
          <div key={car.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <div className="relative h-64 overflow-hidden bg-slate-200">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 block"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md shadow-lg px-4 py-2 rounded-full text-[10px] font-black tracking-widest text-blue-600 border border-white">
                {car.availability}
              </div>
              <div className="absolute bottom-6 left-6 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold border border-white/10">
                ★ {car.rating}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 leading-tight mb-1">{car.name}</h3>
                  <p className="text-blue-500 text-xs font-black uppercase tracking-widest">{car.type} • {car.fuel}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">₹{car.pricePerDay}</span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">per day</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-50 mb-8 mt-auto">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Seats</p>
                  <p className="text-sm font-black text-slate-800">{car.seats}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Gearbox</p>
                  <p className="text-sm font-black text-slate-800">{car.transmission}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Fuel</p>
                  <p className="text-sm font-black text-slate-800">{car.fuel}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/car/${car.id}`)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl active:scale-95"
              >Full Specifications</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const car = CARS.find(c => c.id === id);

  if (!car) return <div className="p-20 text-center font-black text-2xl text-slate-900">Car Profile Not Found.</div>;

  const handleBookNow = () => {
    context?.setCurrentBooking({ carId: car.id, carName: car.name, totalPrice: car.pricePerDay });
    navigate('/preferences');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2 space-y-12">
        <div className="bg-white rounded-[60px] overflow-hidden border border-slate-100 shadow-2xl p-6 flex flex-col items-center">
          <div className="w-full h-[500px] bg-slate-200 rounded-[45px] overflow-hidden relative shadow-inner">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover block absolute inset-0"
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200';
              }}
            />
          </div>
        </div>
        <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
            <h3 className="font-black text-3xl text-slate-800">Advanced Specifications</h3>
          </div>
          <table className="w-full">
            <tbody className="divide-y divide-slate-100">
              {[
                ['Model Signature', car.name],
                ['Vehicle Classification', car.type],
                ['Engine & Performance', car.fuel === 'Electric' ? '450km Full Charge Range' : '1.5L Turbo 18kmpl'],
                ['Transmission Control', car.transmission],
                ['Drivetrain Battery', car.fuel === 'Electric' ? '60.5 kWh Hi-Volt' : '1498 cc Multi-Port'],
                ['Maximum Peak Torque', '250 Nm @ 1500-3500 rpm'],
                ['Ownership Profile', `Verified Hub - Managed by ${car.owner}`],
                ['Prototype Features', 'SmartLock IoT Ready, GPS Integrated']
              ].map(([k, v], i) => (
                <tr key={i} className="group">
                  <td className="py-6 text-sm font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{k}</td>
                  <td className="py-6 text-right font-black text-slate-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-10 rounded-[50px] border-4 border-blue-600 shadow-2xl sticky top-24">
          <div className="mb-10 text-center lg:text-left">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Daily Rental Rate</p>
            <div className="flex items-baseline justify-center lg:justify-start gap-2">
              <span className="text-6xl font-black text-slate-900">₹{car.pricePerDay}</span>
              <span className="text-slate-500 font-bold">/ INR</span>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Active Rental Hub</p>
              <p className="text-lg font-black text-slate-900">Gujarat Hub, Ahmedabad</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl shadow-sm">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Hardware Linkage</p>
              <p className="text-lg font-black text-green-600">IoT Keypad Online</p>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-95"
          >Continue to Preferences</button>

          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fleet Rating</p>
              <p className="text-lg font-black text-slate-800">★ {car.rating}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Safety Index</p>
              <p className="text-lg font-black text-blue-600">A+</p>
            </div>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-6 uppercase tracking-widest font-bold">GTU Academic Design Prototype</p>
        </div>
      </div>
    </div>
  );
};

const PreferencesPage = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [option, setOption] = useState('self');
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-black mb-4 text-slate-900">Pick-up Logistics</h1>
        <p className="text-slate-500 text-lg">Choose the protocol for vehicle acquisition.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { id: 'home', title: 'Home Delivery', icon: '🏠', desc: 'Doorstep dispatch via service agent. (+₹300)' },
          { id: 'fixed', title: 'Meet-up Point', icon: '📍', desc: 'Acquire at designated commercial hubs.' },
          { id: 'self', title: 'Self Pickup', icon: '🔑', desc: 'Unattended pickup via IoT Smart Token.' }
        ].map(item => (
          <div
            key={item.id}
            onClick={() => setOption(item.id)}
            className={`cursor-pointer p-10 rounded-[40px] border-4 transition-all text-center flex flex-col items-center ${option === item.id ? 'border-blue-600 bg-blue-50 shadow-xl scale-105' : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
            <div className="text-6xl mb-6 bg-white w-24 h-24 rounded-3xl flex items-center justify-center shadow-inner border border-slate-50">{item.icon}</div>
            <h3 className="font-black text-xl mb-3 text-slate-800">{item.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">{item.desc}</p>
          </div>
        ))}
      </div>

      {option === 'self' && (
        <div className="bg-slate-900 text-white p-12 rounded-[50px] text-center mb-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')]"></div>
          <div className="relative z-10">
            <h4 className="text-2xl font-black mb-4">Smart Lock IoT Integration</h4>
            <p className="text-slate-400 text-sm mb-10 max-w-sm mx-auto">This simulates the backend generation of a unique hardware-level access code for the vehicle keypad.</p>
            {!showOtp ? (
              <button
                onClick={() => setShowOtp(true)}
                className="bg-blue-600 text-white px-12 py-5 rounded-3xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
              >Generate Virtual Access Token</button>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500">
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-400 mb-6">Encrypted Token Generated</p>
                <div className="flex justify-center gap-4">
                  {[4, 8, 2, 9].map((n, i) => (
                    <div key={i} className="w-16 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-5xl font-black border border-white/10 text-white shadow-lg">
                      {n}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-10 font-bold uppercase tracking-widest">VALID FOR 24H • ENCRYPTED SESSION</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="px-10 py-4 text-slate-400 font-black hover:text-slate-600 transition-colors uppercase tracking-widest text-xs">← Fleet</button>
        <button onClick={() => navigate('/add-ons')} className="bg-slate-900 text-white px-12 py-5 rounded-[25px] font-black shadow-2xl hover:bg-blue-600 transition-all uppercase tracking-widest text-sm">Add-ons Review →</button>
      </div>
    </div>
  );
};

const AddOnsPage = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [selected, setSelected] = useState<string[]>([]);

  const basePrice = context?.currentBooking?.totalPrice || 0;
  const addOnsTotal = selected.reduce((acc, id) => {
    const item = ADD_ONS.find(a => a.id === id);
    return acc + (item?.price || 0);
  }, 0);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleNext = () => {
    context?.setCurrentBooking(prev => ({ ...prev, totalPrice: basePrice + addOnsTotal }));
    navigate('/nearby');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-black mb-4 text-slate-900">Trip Enhancements</h1>
        <p className="text-slate-500 text-lg">Select hardware components to optimize your travel environment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {ADD_ONS.map(item => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`cursor-pointer p-8 rounded-[40px] border-4 flex items-center justify-between transition-all ${selected.includes(item.id) ? 'border-blue-600 bg-blue-50 shadow-xl translate-y-[-5px]' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}
          >
            <div className="flex items-center gap-6">
              <span className="text-4xl bg-slate-50 w-16 h-16 rounded-3xl shadow-inner flex items-center justify-center border border-slate-100">{item.icon}</span>
              <div>
                <p className="font-black text-lg text-slate-800">{item.name}</p>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">+ ₹{item.price} / Day</p>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${selected.includes(item.id) ? 'bg-blue-600 border-blue-600 shadow-lg' : 'border-slate-100 bg-slate-50'}`}>
              {selected.includes(item.id) && <span className="text-white font-black text-xl">✓</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-14 rounded-[60px] flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 opacity-20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 text-center md:text-left">
          <p className="text-blue-400 text-xs font-black uppercase tracking-[0.4em] mb-4">Comprehensive Total Estimate</p>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-7xl font-black">₹{basePrice + addOnsTotal}</span>
            <span className="text-slate-500 font-bold uppercase text-sm tracking-widest">Final</span>
          </div>
        </div>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-16 py-7 rounded-[35px] font-black text-xl mt-12 md:mt-0 hover:bg-blue-700 shadow-[0_25px_60px_rgba(37,99,235,0.4)] transition-all relative z-10 hover:scale-105 active:scale-95"
        >Review Booking Summary</button>
      </div>
    </div>
  );
};

const NearbyServicesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4 text-slate-900">Intelligent Route Assistant</h1>
        <p className="text-slate-500 text-lg">Local logistics and essential service synchronization.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm">
            <h3 className="font-black text-2xl mb-10 flex items-center gap-4 text-slate-800">
              <span className="text-blue-600 bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">📍</span> Proximity Essentials
            </h3>
            <div className="space-y-6">
              {NEARBY_SERVICES.map(s => (
                <div key={s.id} className="flex items-center justify-between p-7 bg-slate-50 rounded-[35px] hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all group cursor-default">
                  <div className="flex items-center gap-6">
                    <span className="p-4 bg-white rounded-2xl shadow-sm text-3xl group-hover:scale-110 transition-transform">
                      {s.type === 'Petrol' ? '⛽' : s.type === 'EV' ? '🔌' : s.type === 'Wash' ? '🧼' : '☕'}
                    </span>
                    <div>
                      <p className="font-black text-slate-800 text-lg">{s.name}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.type} Infrastructure</p>
                    </div>
                  </div>
                  <p className="text-sm font-black text-blue-600 px-5 py-2 bg-blue-50 rounded-full border border-blue-100">{s.distance}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => navigate('/payment')} className="w-full bg-slate-900 text-white py-7 rounded-[35px] font-black text-xl shadow-2xl transition-all hover:bg-blue-600 hover:translate-y-[-5px]">Finalize Checkout Protocol</button>
        </div>

        <div className="bg-white p-6 rounded-[60px] border border-slate-100 shadow-2xl h-[700px] relative overflow-hidden group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117506.3149806874!2d72.43912953258814!3d23.020211110757755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fccd11674a987f1!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716382000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            className="rounded-[50px] transition-all duration-700 grayscale group-hover:grayscale-0"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
          <div className="absolute bottom-12 left-12 right-12 bg-slate-900/95 backdrop-blur-xl p-10 rounded-[45px] shadow-2xl border border-white/10 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">IoT Location Sync Enabled</p>
            <p className="text-white text-sm leading-relaxed font-semibold">Real-time GPS integration allows the model to suggest optimized pitstops based on telemetry data and current route load.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const newBooking: Booking = {
        id: 'BK-' + Math.floor(Math.random() * 9000 + 1000),
        carId: context?.currentBooking?.carId || 's1',
        carName: context?.currentBooking?.carName || 'Vehicle',
        status: 'Upcoming',
        date: new Date().toISOString().split('T')[0],
        totalPrice: context?.currentBooking?.totalPrice || 0
      };
      context?.setBookings(prev => [newBooking, ...prev]);
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] p-4 text-center bg-slate-50">
        <div className="w-28 h-28 bg-green-100 text-green-600 rounded-[45px] flex items-center justify-center text-6xl mb-12 shadow-2xl shadow-green-200 animate-bounce">✓</div>
        <h1 className="text-6xl font-black mb-6 text-slate-900">Transaction Successful</h1>
        <p className="text-slate-500 mb-16 max-w-sm text-xl font-semibold leading-relaxed">System has allocated your assets. Review your IoT access tokens in the dashboard.</p>
        <button onClick={() => navigate('/dashboard')} className="bg-blue-600 text-white px-16 py-6 rounded-[35px] font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Navigate To Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl font-black mb-12 text-slate-900 leading-tight">Billing & Authorization</h2>
          <div className="bg-white p-12 rounded-[60px] border border-slate-100 shadow-2xl space-y-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Allocated Unit</p>
                <p className="text-3xl font-black text-slate-800">{context?.currentBooking?.carName}</p>
              </div>
              <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Base Unit Rental', val: `₹${CARS.find(c => c.id === context?.currentBooking?.carId)?.pricePerDay || 0}` },
                { label: 'Peripheral Add-ons', val: `₹${(context?.currentBooking?.totalPrice || 0) - (CARS.find(c => c.id === context?.currentBooking?.carId)?.pricePerDay || 0)}` },
                { label: 'Taxes & Compliance', val: 'PROTOTYPE FEE: ₹0' },
                { label: 'Refundable Collateral', val: 'AUTH ONLY' }
              ].map((line, i) => (
                <div key={i} className="flex justify-between items-center text-sm font-black border-b border-slate-50 pb-4 last:border-0">
                  <span className="text-slate-400 uppercase tracking-widest text-[11px]">{line.label}</span>
                  <span className="text-slate-800">{line.val}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 p-10 rounded-[45px] shadow-2xl">
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-black uppercase text-xs tracking-[0.4em]">Net Authorization Total</span>
                <span className="text-5xl font-black text-white">₹{context?.currentBooking?.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[60px] border-4 border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 -rotate-45 translate-x-24 -translate-y-24 opacity-50"></div>
          <h2 className="text-3xl font-black mb-12 text-slate-800">Secure Gateway Integration</h2>
          <div className="space-y-6 mb-12">
            <div className="p-8 border-4 border-blue-600 rounded-[35px] bg-blue-50/50 flex items-center justify-between shadow-lg ring-4 ring-blue-600/5">
              <div className="flex items-center gap-6">
                <span className="text-5xl">💳</span>
                <span className="font-black text-slate-800 text-lg">Card Terminal (Demo)</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow-xl"></div>
            </div>
            <div className="p-8 border-4 border-slate-50 rounded-[35px] flex items-center justify-between grayscale opacity-30 cursor-not-allowed">
              <div className="flex items-center gap-6 text-slate-400">
                <span className="text-5xl">📱</span>
                <span className="font-black text-lg text-slate-400">UPI Interface</span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <input type="text" placeholder="Authorized Cardholder" className="w-full px-10 py-6 rounded-3xl border-2 border-slate-100 outline-none font-bold text-lg bg-slate-50 focus:bg-white focus:border-blue-500 transition-all" disabled />
            <input type="text" placeholder="0000 •••• •••• 1234" className="w-full px-10 py-6 rounded-3xl border-2 border-slate-100 outline-none font-bold text-lg bg-slate-50 focus:bg-white focus:border-blue-500 transition-all text-center tracking-[0.2em]" disabled />
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="EX: MM/YY" className="w-full px-10 py-6 rounded-3xl border-2 border-slate-100 outline-none font-bold text-lg text-center bg-slate-50" disabled />
              <input type="text" placeholder="SEC: •••" className="w-full px-10 py-6 rounded-3xl border-2 border-slate-100 outline-none font-bold text-lg text-center bg-slate-50" disabled />
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-8 rounded-[35px] font-black text-2xl mt-14 shadow-2xl disabled:bg-slate-300 hover:bg-blue-600 transition-all flex items-center justify-center gap-6 group overflow-hidden relative"
          >
            {loading ? (
              <span className="flex items-center gap-4">
                <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Syncing Authorization...
              </span>
            ) : (
              <>Authorize ₹{context?.currentBooking?.totalPrice} <span className="group-hover:translate-x-3 transition-transform duration-500 text-3xl">→</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-black mb-3 text-slate-900">Control Hub</h1>
          <p className="text-slate-500 text-xl font-medium">Hello, {context?.user?.name || 'Authorized User'}. Welcome back.</p>
        </div>
        <Link to="/cars" className="bg-blue-600 text-white px-12 py-5 rounded-[25px] font-black shadow-2xl hover:scale-105 transition-transform active:scale-95 text-sm uppercase tracking-widest">+ Reserve Vehicle</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        {[
          { label: 'Cumulative Rides', val: context?.bookings.length || 0, icon: '🚗' },
          { label: 'Active Session', val: 'BK-102', icon: '🔑', color: 'text-blue-600' },
          { label: 'Eco Tokens', val: '1,250', icon: '🌱', color: 'text-green-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-xl flex items-center gap-10 hover:shadow-2xl transition-all">
            <div className="text-5xl bg-slate-50 w-24 h-24 rounded-3xl flex items-center justify-center shadow-inner border border-slate-50">{stat.icon}</div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color || 'text-slate-900'}`}>{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[60px] border border-slate-100 shadow-2xl overflow-hidden mb-16">
        <div className="bg-slate-50 px-12 py-10 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-800">Operational History</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] bg-slate-50/50">
              <tr>
                <th className="px-12 py-8">Ref ID</th>
                <th className="px-12 py-8">Unit Profile</th>
                <th className="px-12 py-8">Timestamp</th>
                <th className="px-12 py-8">Fiscal Load</th>
                <th className="px-12 py-8">Session State</th>
                <th className="px-12 py-8">Audit Log</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold divide-y divide-slate-50">
              {context?.bookings.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="px-12 py-8 font-mono font-black text-blue-600 text-lg">{b.id}</td>
                  <td className="px-12 py-8 font-black text-slate-800">{b.carName}</td>
                  <td className="px-12 py-8 text-slate-400 font-semibold">{b.date}</td>
                  <td className="px-12 py-8 font-black text-slate-900">₹{b.totalPrice}</td>
                  <td className="px-12 py-8">
                    <span className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm ${b.status === 'Ongoing' ? 'bg-blue-100 text-blue-600' : b.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-12 py-8">
                    <button onClick={() => navigate(`/condition/${b.id}`)} className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-[11px] font-black hover:bg-blue-600 transition-all uppercase tracking-[0.2em] shadow-lg group-hover:scale-105">Digital Scan</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ConditionReportPage = () => {
  const { id } = useParams();
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const [damage, setDamage] = useState('No Visual Anomalies Detected');

  const handleUpload = (type: 'before' | 'after', e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'before') setBeforeImg(url);
      else setAfterImg(url);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-16">
        <h1 className="text-5xl font-black mb-4 text-slate-900">Vehicle Assurance Protocol</h1>
        <p className="text-slate-500 text-xl font-medium">Session Identifier: {id} • Visual compliance documentation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div className="space-y-8">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Pre-Operation Telemetry (Visual)</label>
          <div className="border-4 border-dashed border-slate-200 rounded-[60px] aspect-video flex flex-col items-center justify-center bg-white overflow-hidden relative group hover:border-blue-300 transition-all shadow-2xl">
            {beforeImg ? (
              <img src={beforeImg} alt="Before" className="w-full h-full object-cover block absolute inset-0" />
            ) : (
              <div className="text-center group-hover:scale-110 transition-transform p-10">
                <span className="text-7xl mb-6 block">📸</span>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Initialize Handover Scan</p>
                <p className="text-[9px] text-slate-300 mt-2 font-bold">CLICK TO CAPTURE PRIMARY VIEW</p>
              </div>
            )}
            <input type="file" onChange={(e) => handleUpload('before', e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
          </div>
        </div>
        <div className="space-y-8">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Post-Operation Telemetry (Visual)</label>
          <div className="border-4 border-dashed border-slate-200 rounded-[60px] aspect-video flex flex-col items-center justify-center bg-white overflow-hidden relative group hover:border-blue-300 transition-all shadow-2xl">
            {afterImg ? (
              <img src={afterImg} alt="After" className="w-full h-full object-cover block absolute inset-0" />
            ) : (
              <div className="text-center group-hover:scale-110 transition-transform p-10">
                <span className="text-7xl mb-6 block">📸</span>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Initialize Return Scan</p>
                <p className="text-[9px] text-slate-300 mt-2 font-bold">CLICK TO CAPTURE PRIMARY VIEW</p>
              </div>
            )}
            <input type="file" onChange={(e) => handleUpload('after', e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
          </div>
        </div>
      </div>

      <div className="bg-white p-14 rounded-[60px] border border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <h3 className="font-black text-3xl mb-12 flex items-center gap-6 text-slate-800">
          <span className="w-16 h-1.5 bg-blue-600 rounded-full"></span> Manual Verification Audit
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Structural Integrity Assessment</label>
            <select value={damage} onChange={(e) => setDamage(e.target.value)} className="w-full px-10 py-6 rounded-[30px] border-2 border-slate-100 focus:border-blue-500 bg-slate-50 font-black text-lg outline-none transition-all shadow-sm">
              <option>No Visual Anomalies Detected (Pristine)</option>
              <option>Superficial Scratches / Micro-Abrasion</option>
              <option>Visible Structural Dent / Impact Point</option>
              <option>Operational Non-Compliance (Mechanical)</option>
            </select>
          </div>
          <div className="space-y-6">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Extended Audit Remarks</label>
            <textarea placeholder="Identify any anomalies observed during hardware handover. Include specific coordinates if applicable." className="w-full px-10 py-6 rounded-[35px] border-2 border-slate-100 focus:border-blue-500 bg-slate-50 font-bold text-lg outline-none transition-all shadow-sm" rows={4}></textarea>
          </div>
        </div>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-slate-50">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="text-3xl">ℹ️</div>
            <p className="text-[11px] font-bold max-w-sm leading-relaxed">Submission of these visual assets serves as a binding record for hardware condition. Discrepancies will be audited using the baseline dataset.</p>
          </div>
          <button className="bg-slate-900 text-white px-16 py-6 rounded-[30px] font-black text-xl shadow-2xl hover:bg-blue-600 transition-all uppercase tracking-[0.3em]">Finalize Log</button>
        </div>
      </div>
    </div>
  );
};

const OwnerDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div>
          <h1 className="text-5xl font-black mb-3 text-slate-900">Fleet Master Console</h1>
          <p className="text-slate-500 text-xl font-medium">Real-time Telemetry & Asset Monetization</p>
        </div>
        <button className="bg-blue-600 text-white px-12 py-5 rounded-[25px] font-black shadow-2xl hover:scale-105 transition-transform active:scale-95 text-sm uppercase tracking-widest transition-all">+ Register New Asset</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20">
        {[
          { label: 'Asset Fleet Count', val: '8', icon: '🚙', color: 'text-slate-800' },
          { label: 'Active Deployments', val: '5', icon: '🔑', color: 'text-blue-600' },
          { label: 'Fiscal Velocity', val: '₹1.8L', icon: '💰', color: 'text-green-600' },
          { label: 'System Trust Rating', val: '98%', icon: '⭐', color: 'text-orange-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[45px] border border-slate-100 shadow-xl text-center flex flex-col items-center hover:shadow-2xl transition-all">
            <div className="text-5xl mb-6 bg-slate-50 w-24 h-24 rounded-3xl flex items-center justify-center shadow-inner border border-slate-50">{stat.icon}</div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <h2 className="text-3xl font-black flex items-center gap-6 text-slate-800">
            <span className="w-12 h-1.5 bg-blue-600 rounded-full"></span> Asset Inventory Status
          </h2>
          <div className="bg-white rounded-[60px] border border-slate-100 shadow-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/70 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                <tr>
                  <th className="px-12 py-10">Unit Signature</th>
                  <th className="px-12 py-10">Operational State</th>
                  <th className="px-12 py-10">Usage Cycle</th>
                  <th className="px-12 py-10">Governance</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold divide-y divide-slate-50">
                {[
                  { name: 'Tata Nexon EV (s1)', status: 'Operational', util: '85%', color: 'bg-green-100 text-green-600' },
                  { name: 'Skoda Slavia (d3)', status: 'Deployed', util: '92%', color: 'bg-blue-100 text-blue-600' },
                  { name: 'Volkswagen Virtus (d4)', status: 'Service Maintenance', util: '10%', color: 'bg-orange-100 text-orange-600' }
                ].map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-12 py-8 font-black text-slate-800 text-lg">{c.name}</td>
                    <td className="px-12 py-8">
                      <span className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm ${c.color}`}>{c.status}</span>
                    </td>
                    <td className="px-12 py-8 text-slate-400 text-base">{c.util}</td>
                    <td className="px-12 py-8">
                      <button className="text-blue-600 font-black hover:underline text-[11px] uppercase tracking-[0.2em] group-hover:scale-105 transition-transform">Hub Config</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-12">
          <h2 className="text-3xl font-black text-slate-800">Critical Notifications</h2>
          <div className="bg-white p-12 rounded-[60px] border border-slate-100 shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-1/2 translate-y-1/2"></div>
            <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-[40px] border-l-8 border-blue-600 shadow-sm relative z-10">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-md border border-slate-50">📸</div>
              <div className="flex-grow">
                <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">Telemetry Audit</p>
                <p className="text-base font-black text-slate-800">New condition log: Unit BK-102</p>
              </div>
            </div>
            <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-[40px] border-l-8 border-green-600 shadow-sm relative z-10">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-md border border-slate-50">💰</div>
              <div className="flex-grow">
                <p className="text-[11px] font-black text-green-600 uppercase tracking-[0.3em] mb-1">Revenue Inbound</p>
                <p className="text-base font-black text-slate-800">Cycle Payout: ₹14,200 Processed</p>
              </div>
            </div>
            <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-[40px] border-l-8 border-orange-500 shadow-sm relative z-10">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-md border border-slate-50">🔧</div>
              <div className="flex-grow">
                <p className="text-[11px] font-black text-orange-600 uppercase tracking-[0.3em] mb-1">Maintenance Cycle</p>
                <p className="text-base font-black text-slate-800">Unit Virtus: 5,000km check due</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App Layout Wrapper ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-slate-50">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

// --- Router and Exports ---

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cars" element={<CarListingPage />} />
            <Route path="/car/:id" element={<CarDetailsPage />} />
            <Route path="/preferences" element={<PreferencesPage />} />
            <Route path="/add-ons" element={<AddOnsPage />} />
            <Route path="/nearby" element={<NearbyServicesPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/condition/:id" element={<ConditionReportPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

export default App;