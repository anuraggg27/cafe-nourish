import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Bot, AlertCircle, RotateCcw, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRecommendations } from '../services/api';

// ─── Animation variants ──────────────────────────────────────────────────────
const slideIn = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ─── Step data ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'mealTime',
    question: "What are you looking for?",
    subtitle: "Pick a meal time to start.",
    options: [
      { value: 'breakfast', label: 'Breakfast', emoji: '☀️' },
      { value: 'lunch', label: 'Lunch', emoji: '🥗' },
      { value: 'snack', label: 'Snack', emoji: '🍎' },
      { value: 'drink', label: 'Drink', emoji: '☕' },
      { value: 'any', label: 'Any time', emoji: '✨' },
    ],
  },
  {
    id: 'preference',
    question: "What's your preference?",
    subtitle: "We'll use this to filter the menu.",
    options: [
      { value: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
      { value: 'plant-forward', label: 'Plant Forward', emoji: '🌱' },
      { value: 'any', label: 'No preference', emoji: '🤷' },
    ],
  },
  {
    id: 'priority',
    question: "Anything you'd like to prioritise?",
    subtitle: "Choose one that matters most right now.",
    options: [
      { value: 'less-sweet', label: 'Less sweet', emoji: '🚫🍭' },
      { value: 'more-vegetables', label: 'More vegetables', emoji: '🥕' },
      { value: 'filling', label: 'Filling', emoji: '💪' },
      { value: 'light', label: 'Light', emoji: '🪶' },
      { value: 'budget-friendly', label: 'Budget friendly', emoji: '💰' },
      { value: 'any', label: 'No preference', emoji: '✓' },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function MealFinder() {
  const [step, setStep] = useState(0); // 0-2 = guided steps, 3 = budget, 4 = results
  const [selections, setSelections] = useState({ mealTime: '', preference: '', priority: '' });
  const [budget, setBudget] = useState(200);
  const [freeText, setFreeText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalSteps = 4; // 3 option steps + budget

  function select(field, value) {
    setSelections(prev => ({ ...prev, [field]: value }));
    // Auto advance after brief pause
    setTimeout(() => setStep(s => s + 1), 300);
  }

  async function handleFind() {
    setLoading(true);
    try {
      const res = await getRecommendations({ ...selections, budget, freeText });
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
    setStep(0);
    setSelections({ mealTime: '', preference: '', priority: '' });
    setBudget(200);
    setFreeText('');
    setResult(null);
  }

  const progress = Math.min((step / totalSteps) * 100, 100);

  return (
    <main className="min-h-screen bg-[#F8F6F1] pt-16">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#24352A] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#8FA58C] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#C87941] blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden" animate="show" variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-6">
              <Bot size={18} className="text-[#8FA58C]" />
              <span className="section-label text-[#8FA58C]">AI Meal Finder</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-white text-5xl md:text-6xl mb-5">
              Not sure what to order?
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed">
              Tell us what you're looking for. We'll help you explore the menu.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Guided flow ───────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        {step < 4 && (
          <>
            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#6F776F]">Step {Math.min(step + 1, totalSteps)} of {totalSteps}</span>
                <span className="text-xs text-[#6F776F]">{Math.round(progress)}% complete</span>
              </div>
              <div className="h-1.5 bg-[#EFE9DD] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#24352A] rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Steps 0-2: Option selection */}
              {step <= 2 && (
                <motion.div
                  key={`step-${step}`}
                  variants={slideIn}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <h2 className="font-serif text-[#24352A] text-3xl mb-2">{STEPS[step].question}</h2>
                    <p className="text-[#6F776F] text-sm mb-8">{STEPS[step].subtitle}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {STEPS[step].options.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => select(STEPS[step].id, opt.value)}
                          className={`group flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 hover:border-[#24352A] hover:bg-[#F8F6F1] ${
                            selections[STEPS[step].id] === opt.value
                              ? 'border-[#24352A] bg-[#F8F6F1]'
                              : 'border-[#EFE9DD] bg-white'
                          }`}
                        >
                          <span className="text-2xl">{opt.emoji}</span>
                          <span className="text-sm font-medium text-[#263029]">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Back button */}
                  {step > 0 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="mt-6 flex items-center gap-2 text-sm text-[#6F776F] hover:text-[#24352A] transition-colors"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                </motion.div>
              )}

              {/* Step 3: Budget + free text + submit */}
              {step === 3 && (
                <motion.div
                  key="step-budget"
                  variants={slideIn}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <h2 className="font-serif text-[#24352A] text-3xl mb-2">Your budget</h2>
                    <p className="text-[#6F776F] text-sm mb-8">Drag to set your maximum spend.</p>

                    {/* Slider */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#6F776F]">₹80</span>
                        <span className="text-2xl font-semibold text-[#24352A] font-serif">₹{budget}</span>
                        <span className="text-xs text-[#6F776F]">₹250</span>
                      </div>
                      <input
                        type="range"
                        min={80}
                        max={250}
                        step={10}
                        value={budget}
                        onChange={e => setBudget(Number(e.target.value))}
                        className="w-full accent-[#24352A] cursor-pointer"
                      />
                    </div>

                    {/* Optional free text */}
                    <div className="mb-8">
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-3">
                        Anything else? (optional)
                      </label>
                      <input
                        type="text"
                        value={freeText}
                        onChange={e => setFreeText(e.target.value)}
                        placeholder="e.g. something warm, no onion…"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#EFE9DD] text-sm text-[#263029] placeholder-[#6F776F] focus:outline-none focus:border-[#8FA58C] transition-colors"
                      />
                    </div>

                    {/* Summary of selections */}
                    <div className="bg-[#F8F6F1] rounded-2xl p-5 mb-8">
                      <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-3">Your preferences</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          selections.mealTime && `Meal: ${selections.mealTime}`,
                          selections.preference && `Diet: ${selections.preference}`,
                          selections.priority && `Priority: ${selections.priority}`,
                          `Budget: ₹${budget}`,
                        ]
                          .filter(Boolean)
                          .map(s => (
                            <span key={s} className="px-3 py-1 bg-white rounded-full text-xs text-[#263029] border border-[#EFE9DD]">
                              {s}
                            </span>
                          ))}
                      </div>
                    </div>

                    <button
                      onClick={handleFind}
                      disabled={loading}
                      className="btn-accent w-full justify-center text-base py-4 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Finding your meal…
                        </span>
                      ) : (
                        <>Find My Meal <ArrowRight size={16} /></>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => setStep(s => s - 1)}
                    className="mt-6 flex items-center gap-2 text-sm text-[#6F776F] hover:text-[#24352A] transition-colors"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* ── Results ─────────────────────────────────────────────────────── */}
        {step === 4 && result && (
          <AnimatePresence>
            <motion.div
              key="results"
              initial="hidden"
              animate="show"
              variants={stagger}
            >
              {/* Safety block */}
              {result.type === 'safety' ? (
                <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 shadow-sm border border-[#C87941]/20">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#fef9f0] flex items-center justify-center shrink-0">
                      <AlertCircle size={20} className="text-[#C87941]" />
                    </div>
                    <div>
                      <h2 className="font-serif text-[#24352A] text-2xl mb-2">This one's outside our scope</h2>
                      <p className="text-[#6F776F] text-sm leading-relaxed">
                        It looks like your question involves a medical or health condition. Our AI assistant is designed only for general menu suggestions — not medical or dietary advice for health conditions.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#fef9f0] rounded-2xl p-5 mb-6">
                    <p className="text-sm text-[#6F776F] leading-relaxed">
                      For personalised dietary guidance related to a health condition, please speak to a registered dietitian, doctor or qualified healthcare professional. They can provide advice tailored to your specific needs.
                    </p>
                  </div>
                  <p className="text-sm text-[#6F776F] mb-6">
                    Want to start over with a general preference instead?
                  </p>
                  <button onClick={reset} className="btn-primary flex items-center gap-2">
                    <RotateCcw size={14} /> Try again
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <motion.div variants={fadeUp} className="mb-8">
                    <p className="section-label mb-3">AI Suggestions</p>
                    <h2 className="font-serif text-[#24352A] text-4xl mb-3">
                      Here are a few options to explore.
                    </h2>
                    {result.type === 'relaxed' && (
                      <div className="flex items-start gap-2 bg-[#EFE9DD] rounded-2xl p-4 mt-4">
                        <AlertCircle size={14} className="text-[#6F776F] mt-0.5 shrink-0" />
                        <p className="text-sm text-[#6F776F]">
                          We relaxed your filters a little because nothing exactly matched — here's what we found nearby.
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* Result cards */}
                  <div className="space-y-4 mb-8">
                    {result.items.map((item, i) => (
                      <motion.div
                        key={item.id}
                        variants={fadeUp}
                        custom={i}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex gap-0"
                      >
                        {/* Image */}
                        <div className="w-28 sm:w-36 shrink-0 bg-[#EFE9DD]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop'; }}
                          />
                        </div>
                        {/* Info */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-[#263029] text-base">{item.name}</h3>
                              <span className="text-[#24352A] font-semibold shrink-0">₹{item.price}</span>
                            </div>
                            <p className="text-[#6F776F] text-sm mb-3">{item.shortDesc}</p>
                            <span className={`tag ${item.labelStyle} text-xs`}>
                              {item.label === 'Plant Forward' && '🌱 '}
                              {item.label === 'Fresh' && '🍃 '}
                              {item.label === 'Nourish' && '✦ '}
                              {item.label}
                            </span>
                          </div>
                          <div className="mt-4">
                            <Link
                              to={`/menu/${item.id}`}
                              className="text-sm text-[#C87941] font-medium hover:underline flex items-center gap-1"
                            >
                              View menu item <ExternalLink size={12} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* AI disclaimer */}
                  <motion.div
                    variants={fadeUp}
                    className="bg-[#F8F6F1] rounded-2xl p-5 flex gap-3 items-start mb-8"
                  >
                    <Bot size={15} className="text-[#8FA58C] mt-0.5 shrink-0" />
                    <p className="text-xs text-[#6F776F] leading-relaxed">
                      <strong className="text-[#263029]">AI note:</strong> These suggestions are based on the preferences you provided and are limited to items on the Café Nourish menu. They are general food-choice suggestions only and are <strong>not medical or dietary advice</strong>. For personalised dietary guidance, consult a qualified professional.
                    </p>
                  </motion.div>

                  {/* Actions */}
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

        {/* ── Demo: Try a medical question ──────────────────────────────── */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-[#EFE9DD] rounded-2xl p-6"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-3">Responsible AI demo</p>
            <p className="text-sm text-[#263029] mb-4">
              Want to see how the AI handles a medical question? Complete the steps above, then type something like <em>"I have diabetes"</em> in the optional text field — and watch what happens.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white rounded-full text-xs text-[#6F776F]">🔒 Privacy first</span>
              <span className="px-3 py-1.5 bg-white rounded-full text-xs text-[#6F776F]">🩺 No diagnosis</span>
              <span className="px-3 py-1.5 bg-white rounded-full text-xs text-[#6F776F]">👤 Humans decide</span>
            </div>
          </motion.div>
        )}
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-[#EFE9DD]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">How it works</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-3xl mb-10">
              Transparent by design.
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: '🎯', title: 'You set the preferences', desc: 'Meal time, dietary choice, priority and budget — all chosen by you.' },
                { icon: '🔍', title: 'We filter the menu', desc: 'The system only looks at items that actually exist in our café menu.' },
                { icon: '✅', title: 'Safety rules run first', desc: 'Medical or health-condition questions are blocked before any suggestion is made.' },
                { icon: '📋', title: 'You see the source', desc: 'Every suggestion links back to the full menu item with complete ingredient info.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-4 p-5 bg-[#F8F6F1] rounded-2xl"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#24352A] mb-1">{item.title}</p>
                    <p className="text-sm text-[#6F776F] leading-relaxed">{item.desc}</p>
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
