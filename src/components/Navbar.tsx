import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../lib/useAuth';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const solid = scrolled || !isHome || open;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      solid ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          {solid ? (
            <img src="/logo.png" alt="eLearning Creations" className="h-10 lg:h-12 w-auto object-contain" />
          ) : (
            <img src="/logoimage1.png" alt="eLearning Creations" className="h-10 lg:h-12 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          )}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? solid ? 'text-sky-600 bg-sky-50' : 'text-white bg-white/20'
                    : solid ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `ml-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-sky-600 text-white' : 'bg-sky-600 text-white hover:bg-sky-700'
                }`
              }
            >
              Admin
            </NavLink>
          )}
          {!isAdmin && (
            <Link
              to="/contact"
              className="ml-2 px-5 py-2 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className={`md:hidden p-2 rounded-md transition-colors ${solid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'text-sky-600 bg-sky-50' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" className="block px-4 py-2.5 rounded-md text-sm font-medium bg-sky-600 text-white text-center mt-2">
                Admin
              </NavLink>
            )}
            {!isAdmin && (
              <Link to="/contact" className="block px-4 py-2.5 rounded-md text-sm font-semibold bg-sky-600 text-white text-center mt-2">
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
