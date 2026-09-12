import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, AlertCircle, Bot } from 'lucide-react';
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

// ─── Macros chart component ──────────────────────────────────────────────────
function MacrosChart({ nutrition }) {
  const total = nutrition.protein + nutrition.fat + nutrition.carbs;

  const macros = [
    {
      key: 'protein',
      label: 'Protein',
      value: nutrition.protein,
      unit: 'g',
      color: 'bg-[#26382C]',
      textColor: 'text-[#26382C]',
      barBg: 'bg-[#26382C]',
      icon: '💪',
      desc: 'per 100g',
    },
    {
      key: 'carbs',
      label: 'Carbohydrates',
      value: nutrition.carbs,
      unit: 'g',
      color: 'bg-[#91A38E]',
      textColor: 'text-[#91A38E]',
      barBg: 'bg-[#91A38E]',
      icon: '🌾',
      desc: 'per 100g',
    },
    {
      key: 'fat',
      label: 'Fat',
      value: nutrition.fat,
      unit: 'g',
      color: 'bg-[#C77A45]',
      textColor: 'text-[#C77A45]',
      barBg: 'bg-[#C77A45]',
      icon: '🥑',
      desc: 'per 100g',
    },
  ];

  // Max value for bar scaling (use 60g as reference max for visual proportion)
  const barMax = Math.max(60, ...macros.map(m => m.value));

  return (
    <div className="bg-[#F7F5EF] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-0.5">
            Nutrition
          </p>
          <p className="text-xs text-[#707870]">Approximate values per 100g of prepared dish</p>
        </div>
        {/* Calorie pill */}
        <div className="bg-[#26382C] text-white px-4 py-2 rounded-full text-center">
          <p className="text-lg font-semibold leading-none">{nutrition.calories}</p>
          <p className="text-xs text-white/60 mt-0.5">kcal</p>
        </div>
      </div>

      {/* Stacked proportion bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-px bg-[#EDE6D8]">
        {macros.map(m => (
          <motion.div
            key={m.key}
            className={`${m.barBg} h-full`}
            initial={{ width: 0 }}
            animate={{ width: `${(m.value / total) * 100}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        ))}
      </div>

      {/* Individual macro rows with animated bars */}
      <div className="space-y-4">
        {macros.map((m, i) => (
          <div key={m.key}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">{m.icon}</span>
                <span className="text-sm font-medium text-[#26302A]">{m.label}</span>
              </div>
              <span className={`text-sm font-semibold ${m.textColor}`}>
                {m.value}{m.unit}
              </span>
            </div>
            {/* Bar */}
            <div className="h-2 bg-[#EDE6D8] rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${m.barBg} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${(m.value / barMax) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i + 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-[#707870] mt-5 pt-4 border-t border-[#EDE6D8] leading-relaxed">
        Nutrition values are approximate and based on standard ingredient data. Actual values may vary with portion size, preparation method and seasonal ingredient variation. Not a substitute for professional dietary advice.
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getMenuItemById(id);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!item) {
    return (
      <main className="min-h-screen bg-[#F7F5EF] pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🍽</p>
          <p className="text-[#707870] text-lg mb-6">Item not found.</p>
          <Link to="/menu" className="btn-primary">Back to menu</Link>
        </div>
      </main>
    );
  }

  const fallback = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop`;

  const related = menuItems
    .filter(m => m.category === item.category && m.id !== item.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-16">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#707870] hover:text-[#26382C] transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-72 lg:h-auto min-h-[400px] bg-[#EDE6D8]"
            >
              <img
                src={imgError ? fallback : item.image}
                alt={item.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-[#26382C] text-xs font-medium px-3 py-1.5 rounded-full">
                {item.category}
              </span>
              {/* Protein badge on image */}
              {item.nutrition && (
                <span className="absolute top-5 right-5 bg-[#26382C]/90 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                  💪 {item.nutrition.protein}g protein / 100g
                </span>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="p-8 lg:p-12 flex flex-col"
            >
              {/* Name + price */}
              <motion.div variants={fadeUp} className="mb-5">
                <h1 className="font-serif text-[#26382C] text-4xl mb-2">{item.name}</h1>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-[#26382C]">₹{item.price}</span>
                  <span className={`tag ${item.labelStyle}`}>
                    {item.label === 'Plant Forward' && '🌱 '}
                    {item.label === 'Fresh' && '🍃 '}
                    {item.label === 'Nourish' && '✦ '}
                    {item.label}
                  </span>
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[#707870] text-base leading-relaxed mb-6">
                {item.description}
              </motion.p>

              {/* What's inside */}
              <motion.div variants={fadeUp} className="mb-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-3">What's inside?</p>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.slice(0, 6).map(ing => (
                    <span key={ing} className="px-3 py-1.5 bg-[#F7F5EF] rounded-full text-sm text-[#26302A]">
                      {ing}
                    </span>
                  ))}
                  {item.ingredients.length > 6 && (
                    <span className="px-3 py-1.5 bg-[#F7F5EF] rounded-full text-sm text-[#707870]">
                      +{item.ingredients.length - 6} more
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Food profile */}
              <motion.div variants={fadeUp} className="mb-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-3">Food profile</p>
                <div className="flex flex-wrap gap-2">
                  {item.profile.map(p => (
                    <span key={p} className="px-3 py-1.5 bg-[#EDE6D8] rounded-full text-sm text-[#26302A]">
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Why on menu */}
              <motion.div variants={fadeUp} className="mb-6 p-5 bg-[#F7F5EF] rounded-2xl">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-2">Why it's on our menu</p>
                <p className="text-sm text-[#26302A] leading-relaxed">{item.whyOnMenu}</p>
              </motion.div>

              {/* Expandable full ingredients */}
              <motion.div variants={fadeUp} className="mb-4 border border-[#EDE6D8] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setIngredientsOpen(!ingredientsOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-[#26302A] hover:bg-[#F7F5EF] transition-colors"
                >
                  Full ingredient list
                  {ingredientsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {ingredientsOpen && (
                  <div className="px-5 pb-5 border-t border-[#EDE6D8]">
                    <ul className="mt-4 space-y-2">
                      {item.ingredients.map(ing => (
                        <li key={ing} className="flex items-center gap-2 text-sm text-[#707870]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#91A38E] shrink-0" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              {/* Allergen note */}
              <motion.div variants={fadeUp} className="mb-6 flex gap-3 items-start p-4 bg-[#fef9f0] rounded-2xl border border-[#C77A45]/15">
                <AlertCircle size={15} className="text-[#C77A45] mt-0.5 shrink-0" />
                <p className="text-xs text-[#707870] leading-relaxed">{item.allergens}</p>
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

      {/* ── Macros chart section ──────────────────────────────────────────── */}
      {item.nutrition && (
        <section className="max-w-7xl mx-auto px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="font-serif text-[#26382C] text-2xl mb-6">Macronutrient breakdown</h2>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Chart */}
                <MacrosChart nutrition={item.nutrition} />

                {/* Context cards */}
                <div className="space-y-4">
                  {/* Quick macro summary cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: '🔥', label: 'Calories', value: item.nutrition.calories, unit: 'kcal', bg: 'bg-[#F7F5EF]', highlight: 'text-[#26382C]' },
                      { icon: '💪', label: 'Protein', value: item.nutrition.protein, unit: 'g', bg: 'bg-[#26382C]', highlight: 'text-white', muted: 'text-white/60', white: true },
                      { icon: '🌾', label: 'Carbs', value: item.nutrition.carbs, unit: 'g', bg: 'bg-[#EDE6D8]', highlight: 'text-[#26382C]' },
                      { icon: '🥑', label: 'Fat', value: item.nutrition.fat, unit: 'g', bg: 'bg-[#fef3e8]', highlight: 'text-[#C77A45]' },
                    ].map(card => (
                      <div key={card.label} className={`${card.bg} rounded-2xl p-4`}>
                        <p className={`text-lg mb-1 ${card.white ? '' : ''}`}>{card.icon}</p>
                        <p className={`text-2xl font-semibold leading-none mb-1 ${card.highlight}`}>
                          {card.value}<span className={`text-sm font-normal ${card.white ? 'text-white/60' : 'text-[#707870]'} ml-1`}>{card.unit}</span>
                        </p>
                        <p className={`text-xs ${card.white ? 'text-white/60' : 'text-[#707870]'}`}>{card.label} / 100g</p>
                      </div>
                    ))}
                  </div>

                  {/* What the numbers mean */}
                  <div className="bg-[#F7F5EF] rounded-2xl p-5">
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-3">What this means</p>
                    <div className="space-y-2">
                      <p className="text-sm text-[#707870] leading-relaxed">
                        <strong className="text-[#26302A]">Protein ({item.nutrition.protein}g)</strong> — contributes to everyday muscle maintenance. ICMR-NIN recommends ~0.8–1g protein per kg body weight daily.
                      </p>
                      <p className="text-sm text-[#707870] leading-relaxed">
                        <strong className="text-[#26302A]">Carbs ({item.nutrition.carbs}g)</strong> — the primary energy source. WHO recommends carbohydrates as a core part of a balanced diet, with a preference for less-processed sources.
                      </p>
                      <p className="text-sm text-[#707870] leading-relaxed">
                        <strong className="text-[#26302A]">Fat ({item.nutrition.fat}g)</strong> — essential for nutrient absorption. WHO recommends unsaturated fats where possible and limiting saturated fat.
                      </p>
                    </div>
                    <p className="text-xs text-[#707870] mt-4 pt-3 border-t border-[#EDE6D8]">
                      These notes are general information only. Not medical or dietary advice. For personalised guidance, consult a qualified professional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Related items ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="font-serif text-[#26382C] text-2xl mb-8">
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
