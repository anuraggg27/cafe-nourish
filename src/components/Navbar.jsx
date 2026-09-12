import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/',            label: 'Home' },
  { to: '/menu',        label: 'Menu' },
  { to: '/meal-finder', label: 'AI Meal Finder' },
  { to: '/approach',    label: 'Our Approach' },
  { to: '/food-facts',  label: 'Food Facts' },
  { to: '/about',       label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location                = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#F7F5EF]/96 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex flex-col leading-none group">
          <span className="text-base font-semibold tracking-tight text-[#26382C] font-serif flex items-center gap-1.5">
            Café Nourish <span className="text-sm">🌿</span>
          </span>
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#91A38E] mt-0.5">
            Good food. Better choices.
          </span>
        </Link>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`px-3.5 py-2 rounded-xl text-sm transition-colors duration-150 ${
                location.pathname === to
                  ? 'text-[#26382C] font-medium bg-[#EDE6D8]'
                  : 'text-[#707870] hover:text-[#26382C] hover:bg-[#EDE6D8]'
              }`}>
              {label}
            </Link>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="hidden md:flex">
          <Link to="/meal-finder" className="btn-accent text-sm px-5 py-2.5">
            Find My Meal →
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl text-[#26382C] hover:bg-[#EDE6D8] transition-colors"
          aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300
        bg-[#F7F5EF]/98 backdrop-blur-md border-t border-[#EDE6D8]
        ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`px-4 py-3 rounded-xl text-sm transition-colors duration-150 ${
                location.pathname === to
                  ? 'text-[#26382C] font-medium bg-[#EDE6D8]'
                  : 'text-[#707870] hover:text-[#26382C]'
              }`}>
              {label}
            </Link>
          ))}
          <Link to="/meal-finder" className="btn-accent mt-3 justify-center">
            Find My Meal →
          </Link>
        </div>
      </div>
    </header>
  );
}
