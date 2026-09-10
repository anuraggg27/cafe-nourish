import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Leaf, Eye, Zap, Bot, ExternalLink } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { featuredItems } from '../data/menu';

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const whyCards = [
  {
    num: '01',
    icon: <Leaf size={20} className="text-[#8FA58C]" />,
    title: 'Balanced',
    body: 'We consider variety, balance and moderation rather than labelling foods simply as "good" or "bad."',
  },
  {
    num: '02',
    icon: <Eye size={20} className="text-[#8FA58C]" />,
    title: 'Transparent',
    body: 'Know what is in your food before you order. Every item lists its ingredients and food profile.',
  },
  {
    num: '03',
    icon: <Zap size={20} className="text-[#8FA58C]" />,
    title: 'Practical',
    body: 'Familiar ingredients and options designed with students in mind — affordable, accessible and satisfying.',
  },
];

const sources = [
  {
    logo: 'WHO',
    name: 'World Health Organization',
    headline: 'Healthy Diet',
    color: 'bg-[#e8f0ef]',
    textColor: 'text-[#2a4a47]',
    url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
  },
  {
    logo: 'ICMR',
    name: 'ICMR–NIN',
    headline: 'Dietary Guidelines for Indians',
    color: 'bg-[#eaf2ea]',
    textColor: 'text-[#24352A]',
    url: 'https://www.nin.res.in/downloads/DietaryGuidelinesforNINwebsite.pdf',
  },
  {
    logo: 'FSSAI',
    name: 'Eat Right India',
    headline: 'Food Safety & Informed Choices',
    color: 'bg-[#fef3e8]',
    textColor: 'text-[#7a3e10]',
    url: 'https://eatrightindia.gov.in/',
  },
];

const promises = [
  { icon: '🔒', title: 'Privacy first', body: 'No personal information is required to use the AI assistant.' },
  { icon: '🩺', title: 'No diagnosis', body: 'The assistant does not diagnose or treat medical conditions.' },
  { icon: '🔎', title: 'Verify everything', body: 'Health-related claims are checked against authoritative sources.' },
  { icon: '👤', title: 'Humans decide', body: 'AI assists our team. It does not make final decisions.' },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-[#F8F6F1] flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-[#EFE9DD] text-[#6F776F] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                <Leaf size={12} className="text-[#8FA58C]" />
                Balanced · Simple · Delicious
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-[#24352A] text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-6"
            >
              Good food.<br />
              <em>Better choices.</em>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-[#6F776F] text-lg leading-relaxed mb-10 max-w-md"
            >
              A student-friendly café designed around balanced choices, transparent ingredients and evidence-informed food information.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mb-10">
              <Link to="/menu" className="btn-primary">
                Explore Menu
              </Link>
              <Link to="/meal-finder" className="btn-outline">
                Find My Meal <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Micro-details */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-5">
              {['Transparent ingredients', 'Student-friendly choices', 'Evidence-informed'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-[#6F776F]">
                  <CheckCircle2 size={14} className="text-[#8FA58C]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop"
                alt="Colourful grain bowl with vegetables"
                className="w-full h-full object-cover"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">
                <p className="text-xs text-[#8FA58C] font-semibold tracking-widest uppercase mb-1">Today's pick</p>
                <p className="text-[#24352A] font-semibold text-sm">Rajma Rice Bowl</p>
                <p className="text-[#6F776F] text-xs mt-0.5">Rajma · Rice · Seasonal vegetables — ₹149</p>
              </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute -z-10 top-8 -right-8 w-64 h-64 rounded-full bg-[#EFE9DD] opacity-60 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* ── WHY CAFÉ NOURISH ──────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Why Nourish?</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl md:text-5xl mb-16 max-w-xl">
              A café designed around real student choices.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.num}
                  variants={fadeUp}
                  custom={i}
                  className="group p-8 rounded-2xl bg-[#F8F6F1] hover:bg-[#EFE9DD] transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-semibold text-[#8FA58C] tracking-widest">{card.num}</span>
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      {card.icon}
                    </span>
                  </div>
                  <h3 className="font-serif text-[#24352A] text-2xl mb-3">{card.title}</h3>
                  <p className="text-[#6F776F] text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED MENU ─────────────────────────────────────────────────── */}
      <section className="bg-[#F8F6F1] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <motion.p variants={fadeUp} className="section-label mb-4">Featured Menu</motion.p>
                <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl md:text-5xl max-w-lg">
                  Something good for every kind of day.
                </motion.h2>
              </div>
              <motion.div variants={fadeUp}>
                <Link to="/menu" className="btn-outline">
                  Full menu <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {featuredItems.map((item, i) => (
                <motion.div key={item.id} variants={fadeUp} custom={i}>
                  <FoodCard item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AI TEASER ─────────────────────────────────────────────────────── */}
      <section className="bg-[#24352A] py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#8FA58C] blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#C87941] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <Bot size={18} className="text-[#8FA58C]" />
              <span className="section-label text-[#8FA58C]">AI Meal Finder</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-white text-4xl md:text-5xl mb-6">
              Not sure what to order?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg mb-10 leading-relaxed">
              Tell us what you're looking for. Our AI assistant explores the menu based on your preferences — budget, mood, time of day — and suggests options to consider.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link to="/meal-finder" className="btn-accent">
                Find My Meal <ArrowRight size={14} />
              </Link>
              <Link to="/approach" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 text-sm hover:border-white/40 hover:text-white transition-all duration-200">
                How we use AI
              </Link>
            </motion.div>
          </motion.div>

          {/* Sample AI chips */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col gap-3 max-w-xs"
          >
            {['Something filling for lunch', 'Budget under ₹150', 'Light vegetarian snack', 'Warm drink, no sugar'].map((q, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-sm px-4 py-2.5 rounded-full">
                "{q}"
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AI SUGGESTED. WE VERIFIED. ────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.p variants={fadeUp} className="section-label mb-4">Our Process</motion.p>
                <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl md:text-5xl mb-6">
                  AI suggested.<br />We verified.
                </motion.h2>
                <motion.p variants={fadeUp} className="text-[#6F776F] text-base leading-relaxed mb-8">
                  Every item on our menu, every food claim, and every AI recommendation has been reviewed against authoritative sources — WHO, ICMR–NIN and FSSAI. We show you exactly what the AI said and what we changed.
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Link to="/approach" className="btn-primary">
                    See our approach <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </div>

              {/* Process steps */}
              <motion.div variants={stagger} className="flex flex-col gap-4">
                {[
                  { step: '01', label: 'AI generates ideas', desc: 'Menu items, descriptions and food information.' },
                  { step: '02', label: 'We check the sources', desc: 'WHO, ICMR–NIN and FSSAI guidance reviewed.' },
                  { step: '03', label: 'We correct and revise', desc: 'Overgeneralisations, unsupported claims removed.' },
                  { step: '04', label: 'Humans make final decisions', desc: 'AI assists. The team decides what goes on the menu.' },
                ].map((s, i) => (
                  <motion.div
                    key={s.step}
                    variants={fadeUp}
                    custom={i}
                    className="flex gap-5 p-5 rounded-2xl bg-[#F8F6F1] items-start"
                  >
                    <span className="text-xs font-bold text-[#8FA58C] tracking-widest pt-0.5 w-6 shrink-0">{s.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#24352A] mb-0.5">{s.label}</p>
                      <p className="text-sm text-[#6F776F]">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOURCES ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F6F1] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Our Sources</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl md:text-5xl mb-14 max-w-xl">
              Food, backed by evidence.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {sources.map((src, i) => (
                <motion.a
                  key={src.logo}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  custom={i}
                  className={`group block p-8 rounded-2xl ${src.color} hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className={`text-2xl font-bold font-serif ${src.textColor}`}>{src.logo}</span>
                    <ExternalLink size={14} className={`${src.textColor} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <p className={`text-xs font-semibold tracking-widest uppercase ${src.textColor} opacity-60 mb-2`}>{src.name}</p>
                  <p className={`text-base font-semibold ${src.textColor} mb-4`}>{src.headline}</p>
                  <span className={`text-xs ${src.textColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                    Read source →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OUR PROMISE ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Our AI Promise</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl md:text-5xl mb-14 max-w-lg">
              Responsible AI, by design.
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {promises.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  custom={i}
                  className="p-7 rounded-2xl bg-[#F8F6F1] hover:bg-[#EFE9DD] transition-colors duration-300"
                >
                  <span className="text-3xl mb-4 block">{p.icon}</span>
                  <h3 className="font-semibold text-[#24352A] text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-[#6F776F] leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-10">
              <Link to="/approach" className="btn-outline">
                View full AI approach <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
