import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, AlertCircle, Bot, ExternalLink } from 'lucide-react';
import { getMenuItemById, menuItems } from '../data/menu';
import FoodCard from '../components/FoodCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getMenuItemById(id);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!item) {
    return (
      <main className="min-h-screen bg-[#F8F6F1] pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🍽</p>
          <p className="text-[#6F776F] text-lg mb-6">Item not found.</p>
          <Link to="/menu" className="btn-primary">Back to menu</Link>
        </div>
      </main>
    );
  }

  const fallback = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop`;

  // Related items: same category, not this item
  const related = menuItems
    .filter(m => m.category === item.category && m.id !== item.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F8F6F1] pt-16">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#6F776F] hover:text-[#24352A] transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-72 lg:h-auto min-h-[400px] bg-[#EFE9DD]"
            >
              <img
                src={imgError ? fallback : item.image}
                alt={item.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
              {/* Category badge */}
              <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-[#24352A] text-xs font-medium px-3 py-1.5 rounded-full">
                {item.category}
              </span>
            </motion.div>

            {/* Info */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="p-8 lg:p-12 flex flex-col"
            >
              {/* Name + price */}
              <motion.div variants={fadeUp} className="mb-6">
                <h1 className="font-serif text-[#24352A] text-4xl mb-2">{item.name}</h1>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-[#24352A]">₹{item.price}</span>
                  <span className={`tag ${item.labelStyle}`}>
                    {item.label === 'Plant Forward' && '🌱 '}
                    {item.label === 'Fresh' && '🍃 '}
                    {item.label === 'Nourish' && '✦ '}
                    {item.label}
                  </span>
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[#6F776F] text-base leading-relaxed mb-8">
                {item.description}
              </motion.p>

              {/* What's inside */}
              <motion.div variants={fadeUp} className="mb-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-4">What's inside?</p>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.slice(0, 6).map(ing => (
                    <span key={ing} className="px-3 py-1.5 bg-[#F8F6F1] rounded-full text-sm text-[#263029]">
                      {ing}
                    </span>
                  ))}
                  {item.ingredients.length > 6 && (
                    <span className="px-3 py-1.5 bg-[#F8F6F1] rounded-full text-sm text-[#6F776F]">
                      +{item.ingredients.length - 6} more
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Food profile */}
              <motion.div variants={fadeUp} className="mb-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-4">Food profile</p>
                <div className="flex flex-wrap gap-2">
                  {item.profile.map(p => (
                    <span key={p} className="px-3 py-1.5 bg-[#EFE9DD] rounded-full text-sm text-[#263029]">
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Why on menu */}
              <motion.div variants={fadeUp} className="mb-8 p-5 bg-[#F8F6F1] rounded-2xl">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-3">Why it's on our menu</p>
                <p className="text-sm text-[#263029] leading-relaxed">{item.whyOnMenu}</p>
              </motion.div>

              {/* Expandable full ingredients */}
              <motion.div variants={fadeUp} className="mb-4 border border-[#EFE9DD] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setIngredientsOpen(!ingredientsOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-[#263029] hover:bg-[#F8F6F1] transition-colors"
                >
                  Full ingredient list
                  {ingredientsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {ingredientsOpen && (
                  <div className="px-5 pb-5 border-t border-[#EFE9DD]">
                    <ul className="mt-4 space-y-2">
                      {item.ingredients.map(ing => (
                        <li key={ing} className="flex items-center gap-2 text-sm text-[#6F776F]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8FA58C] shrink-0" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              {/* Allergen note */}
              <motion.div variants={fadeUp} className="mb-8 flex gap-3 items-start p-4 bg-[#fef9f0] rounded-2xl border border-[#C87941]/15">
                <AlertCircle size={15} className="text-[#C87941] mt-0.5 shrink-0" />
                <p className="text-xs text-[#6F776F] leading-relaxed">{item.allergens}</p>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-auto">
                <Link to="/meal-finder" className="btn-accent flex items-center gap-2">
                  <Bot size={15} /> Find more like this
                </Link>
                <Link to="/menu" className="btn-outline">
                  Back to full menu
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Related items ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="font-serif text-[#24352A] text-2xl mb-8">
            More from {item.category}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(rel => (
              <FoodCard key={rel.id} item={rel} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
