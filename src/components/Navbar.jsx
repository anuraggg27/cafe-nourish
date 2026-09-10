import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/meal-finder', label: 'AI Meal Finder' },
  { to: '/approach', label: 'Our Approach' },
  { to: '/food-facts', label: 'Food Facts' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#F8F6F1]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-lg font-semibold tracking-tight text-[#24352A] font-serif">
            Café Nourish
          </span>
          <span className="text-base leading-none">🌿</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-150 ${
                location.pathname === to
                  ? 'text-[#24352A] font-medium bg-[#EFE9DD]'
                  : 'text-[#6F776F] hover:text-[#24352A] hover:bg-[#EFE9DD]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link to="/meal-finder" className="btn-accent text-sm px-5 py-2">
            Find My Meal →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-[#24352A] hover:bg-[#EFE9DD] transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#F8F6F1]/98 backdrop-blur-md border-t border-[#EFE9DD] ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-3 rounded-xl text-sm transition-colors duration-150 ${
                location.pathname === to
                  ? 'text-[#24352A] font-medium bg-[#EFE9DD]'
                  : 'text-[#6F776F] hover:text-[#24352A]'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/meal-finder"
            className="btn-accent mt-2 justify-center"
          >
            Find My Meal →
          </Link>
        </div>
      </div>
    </header>
  );
}
