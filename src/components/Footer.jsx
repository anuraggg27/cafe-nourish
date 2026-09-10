import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/menu', label: 'Menu' },
  { to: '/meal-finder', label: 'AI Meal Finder' },
  { to: '/approach', label: 'Our Approach' },
  { to: '/food-facts', label: 'Food Facts' },
  { to: '/about', label: 'About' },
];

export default function Footer() {
  return (
    <footer className="bg-[#24352A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-semibold font-serif">Café Nourish</span>
              <span className="text-base">🌿</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Good food. Better choices.
            </p>
            <p className="text-white/40 text-xs mt-3 leading-relaxed">
              A project exploring how AI can support better everyday food choices without replacing human judgment.
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-3">
            {footerLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-white/60 hover:text-white transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Tagline column */}
          <div className="max-w-xs">
            <p className="text-white/40 text-xs font-medium tracking-widest uppercase mb-4">Our principle</p>
            <p className="text-white/80 text-sm leading-relaxed italic font-serif">
              "AI generates. Evidence verifies. Humans decide."
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 Café Nourish. A student AI project.
          </p>
          <p className="text-white/40 text-xs max-w-md text-right">
            General wellness information only. Not medical or dietary advice. Always consult a qualified professional for personal dietary guidance.
          </p>
        </div>
      </div>
    </footer>
  );
}
