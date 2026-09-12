import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, AlertCircle, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// ── Macros bar chart ──────────────────────────────────────────────────────────
function MacroBar({ label, value, max, color, icon }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-[#707870] flex items-center gap-1.5">
          <span>{icon}</span>{label}
        </span>
        <span className="text-xs font-semibold text-[#26382C]">{value}g</span>
      </div>
      <div className="h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((value / max) * 100, 100)}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────
export default function FoodModal({ item, onClose }) {
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [imgError, setImgError]               = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop';

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  const macroMax = Math.max(60, item.nutrition?.protein, item.nutrition?.fat, item.nutrition?.carbs);

  return (
    <AnimatePresence>
      {/* backdrop */}
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* panel — stop propagation so clicking inside doesn't close */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh]
            overflow-y-auto"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
              flex items-center justify-center text-[#707870] hover:text-[#26382C]
              hover:bg-[#EDE6D8] transition-colors shadow-sm"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* image */}
          <div className="relative h-64 bg-[#EDE6D8] overflow-hidden rounded-t-3xl">
            <img
              src={imgError ? fallback : item.image}
              alt={item.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm
              text-[#26382C] text-xs font-medium px-3 py-1.5 rounded-full">
              {item.category}
            </span>
            {item.nutrition && (
              <span className="absolute top-4 right-14 bg-[#26382C]/90 backdrop-blur-sm
                text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                💪 {item.nutrition.protein}g protein / 100g
              </span>
            )}
          </div>

          {/* body */}
          <div className="p-7 md:p-9">

            {/* name + price + label */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="font-serif text-[#26382C] text-3xl mb-1">{item.name}</h2>
                <span className={`tag ${item.labelStyle}`}>
                  {item.label === 'Plant Forward' && '🌱 '}
                  {item.label === 'Fresh'         && '🍃 '}
                  {item.label === 'Nourish'       && '✦ '}
                  {item.label}
                </span>
              </div>
              <span className="text-3xl font-semibold text-[#26382C] shrink-0">₹{item.price}</span>
            </div>

            <p className="text-[#707870] text-sm leading-relaxed mb-7">{item.description}</p>

            {/* two-column grid on md+ */}
            <div className="grid md:grid-cols-2 gap-7">

              {/* left col */}
              <div className="space-y-6">

                {/* what's inside */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-3">
                    What's inside?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.slice(0, 7).map(ing => (
                      <span key={ing}
                        className="px-3 py-1.5 bg-[#F7F5EF] rounded-full text-sm text-[#26302A]">
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 7 && (
                      <span className="px-3 py-1.5 bg-[#F7F5EF] rounded-full text-sm text-[#707870]">
                        +{item.ingredients.length - 7} more
                      </span>
                    )}
                  </div>
                </div>

                {/* menu profile */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-3">
                    Menu profile
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.profile.map(p => (
                      <span key={p}
                        className="px-3 py-1.5 bg-[#EDE6D8] rounded-full text-sm text-[#26302A]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* why on menu */}
                <div className="p-4 bg-[#F7F5EF] rounded-2xl">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-2">
                    Why it's on our menu
                  </p>
                  <p className="text-sm text-[#26302A] leading-relaxed">{item.whyOnMenu}</p>
                </div>

                {/* expandable ingredient list */}
                <div className="border border-[#EDE6D8] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setIngredientsOpen(!ingredientsOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5
                      text-sm font-medium text-[#26302A] hover:bg-[#F7F5EF] transition-colors"
                  >
                    Full ingredient list
                    {ingredientsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {ingredientsOpen && (
                    <div className="px-5 pb-5 border-t border-[#EDE6D8]">
                      <ul className="mt-4 space-y-1.5">
                        {item.ingredients.map(ing => (
                          <li key={ing} className="flex items-center gap-2 text-sm text-[#707870]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#91A38E] shrink-0" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* right col — nutrition */}
              {item.nutrition && (
                <div className="space-y-5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E]">
                    Nutrition <span className="font-normal normal-case text-[#707870]">per 100g</span>
                  </p>

                  {/* calorie tile */}
                  <div className="flex items-center gap-4 p-4 bg-[#26382C] rounded-2xl">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="text-2xl font-semibold text-white leading-none">
                        {item.nutrition.calories}
                        <span className="text-sm font-normal text-white/60 ml-1">kcal</span>
                      </p>
                      <p className="text-xs text-white/50 mt-0.5">Calories per 100g</p>
                    </div>
                  </div>

                  {/* macro bars */}
                  <div className="bg-[#F7F5EF] rounded-2xl p-5 space-y-4">
                    <MacroBar label="Protein"       value={item.nutrition.protein} max={macroMax} color="bg-[#26382C]" icon="💪" />
                    <MacroBar label="Carbohydrates" value={item.nutrition.carbs}   max={macroMax} color="bg-[#91A38E]" icon="🌾" />
                    <MacroBar label="Fat"           value={item.nutrition.fat}     max={macroMax} color="bg-[#C77A45]" icon="🥑" />
                  </div>

                  {/* 3 summary tiles */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: '💪', label: 'Protein', value: item.nutrition.protein, unit: 'g', bg: 'bg-[#e6eeec]', tc: 'text-[#26382C]' },
                      { icon: '🌾', label: 'Carbs',   value: item.nutrition.carbs,   unit: 'g', bg: 'bg-[#EDE6D8]', tc: 'text-[#26382C]' },
                      { icon: '🥑', label: 'Fat',     value: item.nutrition.fat,     unit: 'g', bg: 'bg-[#fef3e8]', tc: 'text-[#C77A45]' },
                    ].map(t => (
                      <div key={t.label} className={`${t.bg} rounded-xl p-3 text-center`}>
                        <p className="text-base mb-0.5">{t.icon}</p>
                        <p className={`text-base font-semibold ${t.tc}`}>{t.value}<span className="text-xs font-normal ml-0.5">{t.unit}</span></p>
                        <p className="text-xs text-[#707870]">{t.label}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-[#707870] leading-relaxed">
                    Approximate values. Actual values may vary. Not a substitute for professional dietary advice.
                  </p>
                </div>
              )}
            </div>

            {/* allergen note */}
            <div className="mt-6 flex gap-3 items-start p-4 bg-[#fef9f0] rounded-2xl border border-[#C77A45]/15">
              <AlertCircle size={14} className="text-[#C77A45] mt-0.5 shrink-0" />
              <p className="text-xs text-[#707870] leading-relaxed">{item.allergens}</p>
            </div>

            {/* CTA row */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/meal-finder" onClick={onClose} className="btn-accent flex items-center gap-2">
                <Bot size={14} /> Find similar options →
              </Link>
              <Link
                to={`/menu/${item.id}`}
                onClick={onClose}
                className="btn-outline flex items-center gap-2"
              >
                View full page →
              </Link>
              <button onClick={onClose} className="btn-ghost">Close</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
