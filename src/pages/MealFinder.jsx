import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Bot, AlertCircle, RotateCcw, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRecommendations } from '../services/api';
import FoodModal from '../components/FoodModal';

// ── animation variants ────────────────────────────────────────────────────────
const slideIn = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, x: -30, transition: { duration: 0.22 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

// ── step definitions ──────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'mealTime',
    question: 'What are you looking for?',
    subtitle: 'Pick a meal time to start.',
    multi: false,
    options: [
      { value: 'breakfast', label: 'Breakfast', emoji: '☀️' },
      { value: 'lunch',     label: 'Lunch',     emoji: '🥗' },
      { value: 'snack',     label: 'Snack',     emoji: '🍎' },
      { value: 'drink',     label: 'Drink',     emoji: '☕' },
      { value: 'any',       label: 'Any time',  emoji: '✨' },
    ],
  },
  {
    id: 'preference',
    question: "What's your preference?",
    subtitle: "We'll use this to filter the menu.",
    multi: false,
    options: [
      { value: 'vegetarian',    label: 'Vegetarian',    emoji: '🥬' },
      { value: 'plant-forward', label: 'Plant Forward', emoji: '🌱' },
      { value: 'any',           label: 'No preference', emoji: '🤷' },
    ],
  },
  {
    id: 'priority',
    question: "What matters today?",
    subtitle: 'Select one or more.',
    multi: true,   // ← multi-select
    options: [
      { value: 'less-sweet',      label: 'Less sweet',      emoji: '🚫🍭' },
      { value: 'more-vegetables', label: 'More vegetables', emoji: '🥕' },
      { value: 'filling',         label: 'Filling',         emoji: '💪' },
      { value: 'light',           label: 'Light',           emoji: '🪶' },
      { value: 'budget-friendly', label: 'Budget friendly', emoji: '💰' },
      { value: 'protein',         label: 'High protein',    emoji: '🥩' },
      { value: 'any',             label: 'No preference',   emoji: '✓' },
    ],
  },
];

// ── component ─────────────────────────────────────────────────────────────────
export default function MealFinder() {
  const [step,       setStep]       = useState(0);   // 0-2 option steps, 3 budget, 4 results
  const [mealTime,   setMealTime]   = useState('');
  const [preference, setPreference] = useState('');
  const [priorities, setPriorities] = useState([]);  // multi-select array
  const [budget,     setBudget]     = useState(200);
  const [freeText,   setFreeText]   = useState('');
  const [result,     setResult]     = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [modalItem,  setModalItem]  = useState(null);

  const totalSteps = 4;
  const progress   = Math.min((step / totalSteps) * 100, 100);

  // ── selection handlers ──────────────────────────────────────────────────────
  function selectSingle(field, value) {
    if (field === 'mealTime')   setMealTime(value);
    if (field === 'preference') setPreference(value);
    setTimeout(() => setStep(s => s + 1), 280);
  }

  function togglePriority(value) {
    if (value === 'any') {
      setPriorities(['any']);
      return;
    }
    setPriorities(prev => {
      const without = prev.filter(v => v !== 'any');
      return without.includes(value)
        ? without.filter(v => v !== value)
        : [...without, value];
    });
  }

  // ── submit ──────────────────────────────────────────────────────────────────
  async function handleFind() {
    setLoading(true);
    try {
      // fix #4 — pass full priorities array, not just first element
      const res = await getRecommendations({
        mealTime,
        preference,
        priorities,   // full array
        priority: priorities.includes('any') || priorities.length === 0 ? 'any' : priorities[0],
        budget,
        freeText,
      });
      setResult(res);
      setStep(4);
    } catch {
      setResult({ type: 'relaxed', items: [] });
      setStep(4);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(0); setMealTime(''); setPreference('');
    setPriorities([]); setBudget(200); setFreeText(''); setResult(null);
  }

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-16">

      {modalItem && <FoodModal item={modalItem} onClose={() => setModalItem(null)} />}

      {/* ── hero ── */}
      <section className="bg-[#26382C] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#91A38E] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#C77A45] blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-6">
              <Bot size={17} className="text-[#91A38E]" />
              <span className="section-label text-[#91A38E]">AI Meal Finder</span>
            </motion.div>
            <motion.h1 variants={fadeUp}
              className="font-serif text-white text-5xl md:text-6xl mb-5">
              Not sure what to order?
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed">
              Tell us what you're looking for. We'll help you explore the menu.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── guided flow ── */}
      {/* On mobile each step fills the screen naturally; no extra wrapper needed */}
      <section className="max-w-3xl mx-auto px-6 py-12">

        {step < 4 && (
          <>
            {/* progress bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs text-[#707870]">
                  Step {Math.min(step + 1, totalSteps)} of {totalSteps}
                </span>
                <span className="text-xs text-[#707870]">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
                <motion.div className="h-full bg-[#26382C] rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }} />
              </div>
            </div>

            <AnimatePresence mode="wait">

              {/* steps 0 & 1 — single select */}
              {step <= 1 && (
                <motion.div key={`step-${step}`}
                  variants={slideIn} initial="hidden" animate="show" exit="exit">
                  <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <h2 className="font-serif text-[#26382C] text-3xl mb-2">
                      {STEPS[step].question}
                    </h2>
                    <p className="text-[#707870] text-sm mb-8">{STEPS[step].subtitle}</p>
                    {/* mobile: 2 col grid, always */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {STEPS[step].options.map(opt => (
                        <button key={opt.value}
                          onClick={() => selectSingle(STEPS[step].id, opt.value)}
                          className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2
                            transition-all duration-200 hover:border-[#26382C] hover:bg-[#F7F5EF]
                            ${(step === 0 ? mealTime : preference) === opt.value
                              ? 'border-[#26382C] bg-[#F7F5EF]'
                              : 'border-[#EDE6D8] bg-white'}`}>
                          <span className="text-2xl">{opt.emoji}</span>
                          <span className="text-sm font-medium text-[#26302A]">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)}
                      className="mt-6 flex items-center gap-2 text-sm text-[#707870] hover:text-[#26302A] transition-colors">
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                </motion.div>
              )}

              {/* step 2 — multi-select priorities */}
              {step === 2 && (
                <motion.div key="step-priority"
                  variants={slideIn} initial="hidden" animate="show" exit="exit">
                  <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <h2 className="font-serif text-[#26382C] text-3xl mb-2">
                      {STEPS[2].question}
                    </h2>
                    <p className="text-[#707870] text-sm mb-8">{STEPS[2].subtitle}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {STEPS[2].options.map(opt => {
                        const selected = priorities.includes(opt.value);
                        return (
                          <button key={opt.value}
                            onClick={() => togglePriority(opt.value)}
                            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2
                              transition-all duration-150
                              ${selected
                                ? 'border-[#26382C] bg-[#F7F5EF] ring-2 ring-[#26382C]/10'
                                : 'border-[#EDE6D8] bg-white hover:border-[#91A38E]'}`}>
                            <span className="text-2xl">{opt.emoji}</span>
                            <span className="text-sm font-medium text-[#26302A]">{opt.label}</span>
                            {selected && (
                              <span className="w-5 h-5 rounded-full bg-[#26382C] flex items-center justify-center">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {priorities.length > 0 && (
                      <button
                        onClick={() => setStep(3)}
                        className="btn-primary w-full justify-center mt-8">
                        Continue <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                  <button onClick={() => setStep(1)}
                    className="mt-6 flex items-center gap-2 text-sm text-[#707870] hover:text-[#26302A] transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                </motion.div>
              )}

              {/* step 3 — budget + free text */}
              {step === 3 && (
                <motion.div key="step-budget"
                  variants={slideIn} initial="hidden" animate="show" exit="exit">
                  <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <h2 className="font-serif text-[#26382C] text-3xl mb-2">Your budget</h2>
                    <p className="text-[#707870] text-sm mb-8">Drag to set your maximum spend.</p>

                    {/* slider */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#707870]">₹80</span>
                        <span className="text-2xl font-semibold text-[#26382C] font-serif">₹{budget}</span>
                        <span className="text-xs text-[#707870]">₹250</span>
                      </div>
                      <input type="range" min={80} max={250} step={10} value={budget}
                        onChange={e => setBudget(Number(e.target.value))}
                        className="w-full accent-[#26382C] cursor-pointer" />
                    </div>

                    {/* optional free text */}
                    <div className="mb-8">
                      <label className="block text-xs font-semibold tracking-widest uppercase
                        text-[#91A38E] mb-3">
                        Anything else? (optional)
                      </label>
                      <input type="text" value={freeText}
                        onChange={e => setFreeText(e.target.value)}
                        placeholder="e.g. something warm, no onion…"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F7F5EF] border border-[#EDE6D8]
                          text-sm text-[#26302A] placeholder-[#707870]
                          focus:outline-none focus:border-[#91A38E] transition-colors" />
                    </div>

                    {/* summary chips */}
                    <div className="bg-[#F7F5EF] rounded-2xl p-5 mb-8">
                      <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-3">
                        Your preferences
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          mealTime   && `Meal: ${mealTime}`,
                          preference && `Diet: ${preference}`,
                          priorities.length && `Priority: ${priorities.filter(p => p !== 'any').join(', ') || 'any'}`,
                          `Budget: ₹${budget}`,
                        ].filter(Boolean).map(s => (
                          <span key={s}
                            className="px-3 py-1 bg-white rounded-full text-xs text-[#26302A] border border-[#EDE6D8]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button onClick={handleFind} disabled={loading}
                      className="btn-accent w-full justify-center text-base py-4 disabled:opacity-60">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Finding your meal…
                        </span>
                      ) : <>✨ Find My Meal <ArrowRight size={16} /></>}
                    </button>
                  </div>
                  <button onClick={() => setStep(2)}
                    className="mt-6 flex items-center gap-2 text-sm text-[#707870] hover:text-[#26302A] transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* ── results ── */}
        {step === 4 && result && (
          <AnimatePresence>
            <motion.div key="results" initial="hidden" animate="show" variants={stagger}>

              {/* safety block */}
              {result.type === 'safety' ? (
                <motion.div variants={fadeUp}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-[#C77A45]/20">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#fef9f0] flex items-center justify-center shrink-0">
                      <AlertCircle size={20} className="text-[#C77A45]" />
                    </div>
                    <div>
                      <h2 className="font-serif text-[#26382C] text-2xl mb-2">
                        This one's outside our scope
                      </h2>
                      <p className="text-[#707870] text-sm leading-relaxed">
                        It looks like your question involves a medical or health condition.
                        Our AI assistant is designed only for general menu suggestions —
                        not medical or dietary advice for health conditions.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#fef9f0] rounded-2xl p-5 mb-6">
                    <p className="text-sm text-[#707870] leading-relaxed">
                      For personalised dietary guidance related to a health condition, please speak
                      to a registered dietitian, doctor or qualified healthcare professional.
                    </p>
                  </div>
                  <button onClick={reset} className="btn-primary flex items-center gap-2">
                    <RotateCcw size={14} /> Try again
                  </button>
                </motion.div>

              ) : (
                <>
                  {/* header */}
                  <motion.div variants={fadeUp} className="mb-8">
                    <p className="section-label mb-3">AI Suggestions</p>
                    <h2 className="font-serif text-[#26382C] text-4xl mb-3">
                      We found a few options for you.
                    </h2>
                    {result.type === 'relaxed' && (
                      <div className="flex items-start gap-2 bg-[#EDE6D8] rounded-2xl p-4 mt-4">
                        <AlertCircle size={14} className="text-[#707870] mt-0.5 shrink-0" />
                        <p className="text-sm text-[#707870]">
                          We relaxed your filters a little — here's what we found nearby.
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* result cards */}
                  <div className="space-y-4 mb-8">
                    {result.items.map((item, i) => (
                      <motion.div key={item.id} variants={fadeUp} custom={i}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm
                          hover:shadow-md transition-all duration-300 flex">

                        {/* image */}
                        <div className="w-28 sm:w-36 shrink-0 bg-[#EDE6D8]">
                          <img src={item.image} alt={item.name}
                            className="w-full h-full object-cover"
                            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop'; }} />
                        </div>

                        {/* info */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                          <div>
                            {/* ⭐ best match on first result */}
                            {i === 0 && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold
                                text-[#C77A45] bg-[#fef3e8] px-2.5 py-1 rounded-full mb-2">
                                ⭐ Best match
                              </span>
                            )}
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-[#26302A] text-base">{item.name}</h3>
                              <span className="text-[#26382C] font-semibold shrink-0">₹{item.price}</span>
                            </div>
                            <p className="text-[#707870] text-sm mb-2">{item.shortDesc}</p>
                            <span className={`tag ${item.labelStyle} text-xs`}>
                              {item.label === 'Plant Forward' && '🌱 '}
                              {item.label === 'Fresh'         && '🍃 '}
                              {item.label === 'Nourish'       && '✦ '}
                              {item.label}
                            </span>
                          </div>
                          <button
                            onClick={() => setModalItem(item)}
                            className="mt-3 text-sm text-[#C77A45] font-medium hover:underline
                              flex items-center gap-1 self-start">
                            View item <ExternalLink size={12} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* AI disclaimer */}
                  <motion.div variants={fadeUp}
                    className="bg-[#F7F5EF] rounded-2xl p-5 flex gap-3 items-start mb-8">
                    <Bot size={14} className="text-[#91A38E] mt-0.5 shrink-0" />
                    <p className="text-xs text-[#707870] leading-relaxed">
                      <strong className="text-[#26302A]">AI note:</strong> Suggestions are based
                      on the preferences you provided and are limited to items on the Café Nourish
                      menu. They are general food-choice suggestions only and are{' '}
                      <strong>not medical or dietary advice</strong>. For personalised dietary
                      guidance, consult a qualified professional.
                    </p>
                  </motion.div>

                  {/* actions */}
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                    <button onClick={reset} className="btn-outline flex items-center gap-2">
                      <RotateCcw size={14} /> Start over
                    </button>
                    <Link to="/menu" className="btn-primary">
                      Browse full menu <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* responsible AI hint on step 0 */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-[#EDE6D8] rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-3">
              Responsible AI demo
            </p>
            <p className="text-sm text-[#26302A] mb-4 leading-relaxed">
              Complete the steps above, then type something like{' '}
              <em>"I have diabetes"</em> in the optional field — and watch what happens.
            </p>
            <div className="flex flex-wrap gap-2">
              {['🔒 Privacy first', '🚫 No diagnosis', '👤 Humans decide'].map(t => (
                <span key={t}
                  className="px-3 py-1.5 bg-white rounded-full text-xs text-[#707870]">{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* ── how it works ── */}
      <section className="bg-white py-20 border-t border-[#EDE6D8]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="section-label mb-4">How it works</motion.p>
            <motion.h2 variants={fadeUp}
              className="font-serif text-[#26382C] text-3xl mb-10">
              Transparent by design.
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: '🎯', title: 'You set the preferences',  desc: 'Meal time, dietary choice, priority and budget — all chosen by you.' },
                { icon: '🔍', title: 'We filter the menu',       desc: 'The system only looks at items that actually exist in our café menu.' },
                { icon: '✅', title: 'Safety rules run first',   desc: 'Medical or health-condition questions are blocked before any suggestion is made.' },
                { icon: '📋', title: 'You see the source',       desc: 'Every suggestion links back to the full menu item with complete ingredient info.' },
              ].map((item, i) => (
                <motion.div key={item.title} variants={fadeUp} custom={i}
                  className="flex gap-4 p-5 bg-[#F7F5EF] rounded-2xl">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#26382C] mb-1">{item.title}</p>
                    <p className="text-sm text-[#707870] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
