import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Leaf, Bot, ExternalLink } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import FoodModal from '../components/FoodModal';
import { featuredItems } from '../data/menu';

// ── animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };

// ── static data ──────────────────────────────────────────────────────────────
const trustItems = [
  'Transparent ingredients',
  'Student-friendly choices',
  'Evidence-informed',
  'AI-assisted recommendations',
];

const problemCards = [
  {
    icon: '⏱',
    title: 'Convenience',
    body: 'Food that fits into a busy student day without demanding complicated decisions.',
  },
  {
    icon: '🔍',
    title: 'Clarity',
    body: 'Simple information about ingredients and menu choices — no jargon, no vague wellness claims.',
  },
  {
    icon: '🎯',
    title: 'Practicality',
    body: 'Accessible, familiar foods rather than unrealistic "health food" trends that students can\'t afford.',
  },
];

// fix #5 — use the shared featuredItems export instead of hardcoded IDs
// featuredItems = items where featured: true in menu.js (b2, b3, l1, l2, d5)
// We show the first 3 to keep the section to exactly 3 cards as per spec
const featured3 = featuredItems.slice(0, 3);

const sources = [
  {
    logo: 'WHO',
    name: 'World Health Organization',
    headline: 'Healthy Diet',
    color: 'bg-[#e6eeec]',
    textColor: 'text-[#26382C]',
    url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
  },
  {
    logo: 'ICMR–NIN',
    name: 'ICMR – National Institute of Nutrition',
    headline: 'Dietary Guidelines for Indians',
    color: 'bg-[#e8f2e8]',
    textColor: 'text-[#26382C]',
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
  { icon: '🔐', title: 'Privacy first',     body: 'No personal information required to use the AI assistant.' },
  { icon: '🚫', title: 'No diagnosis',      body: 'The assistant never diagnoses or treats medical conditions.' },
  { icon: '🔎', title: 'Verify everything', body: 'Health-related claims are checked against authoritative sources.' },
  { icon: '👤', title: 'Humans decide',     body: 'AI assists the team. It does not make final decisions.' },
];

// ── component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [modalItem, setModalItem] = useState(null);
  return (
    <main className="overflow-x-hidden">
      {modalItem && <FoodModal item={modalItem} onClose={() => setModalItem(null)} />}

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen bg-[#F7F5EF] flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col">

            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-[#EDE6D8] text-[#707870]
                text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                <Leaf size={12} className="text-[#91A38E]" />
                Balanced · Transparent · Evidence-Informed
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}
              className="font-serif text-[#26382C] text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-6">
              Good food.<br /><em>Better choices.</em>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}
              className="text-[#707870] text-lg leading-relaxed mb-10 max-w-md">
              A student-friendly café designed around balanced choices, transparent ingredients
              and evidence-informed food information.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mb-10">
              <Link to="/menu"        className="btn-primary">Explore the Menu →</Link>
              <Link to="/meal-finder" className="btn-outline flex items-center gap-2">
                Find My Meal ✨
              </Link>
            </motion.div>

            {/* trust strip */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-5">
              {trustItems.map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-[#707870]">
                  <CheckCircle2 size={14} className="text-[#91A38E]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* right — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop"
                alt="Colourful grain bowl with vegetables"
                className="w-full h-full object-cover"
              />
              {/* floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md
                rounded-2xl px-5 py-4 shadow-lg">
                <p className="text-xs text-[#91A38E] font-semibold tracking-widest uppercase mb-1">Today's pick</p>
                <p className="text-[#26382C] font-semibold text-sm">Rajma Rice Bowl</p>
                <p className="text-[#707870] text-xs mt-0.5">Rajma · Rice · Seasonal vegetables — ₹149</p>
              </div>
            </div>
            <div className="absolute -z-10 top-8 -right-8 w-64 h-64 rounded-full bg-[#EDE6D8] opacity-60 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          THE PROBLEM
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={stagger}>

            <motion.p variants={fadeUp} className="section-label mb-4">Why Café Nourish?</motion.p>
            <motion.h2 variants={fadeUp}
              className="font-serif text-[#26382C] text-4xl md:text-5xl mb-5 max-w-xl">
              Choosing food shouldn't feel complicated.
            </motion.h2>
            <motion.p variants={fadeUp}
              className="text-[#707870] text-base leading-relaxed max-w-2xl mb-14">
              Students often choose café food based on convenience, price and taste.
              Café Nourish explores how a menu can make everyday food choices easier to understand
              without turning wellness information into medical advice.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6">
              {problemCards.map((c, i) => (
                <motion.div key={c.title} variants={fadeUp} custom={i}
                  className="group p-8 rounded-2xl bg-[#F7F5EF] hover:bg-[#EDE6D8] transition-colors duration-300">
                  <span className="text-3xl mb-5 block">{c.icon}</span>
                  <h3 className="font-serif text-[#26382C] text-2xl mb-3">{c.title}</h3>
                  <p className="text-[#707870] text-sm leading-relaxed">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURED MENU — 3 large cards
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F5EF] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <motion.p variants={fadeUp} className="section-label mb-4">Featured Menu</motion.p>
                <motion.h2 variants={fadeUp}
                  className="font-serif text-[#26382C] text-4xl md:text-5xl max-w-lg">
                  Made for everyday choices.
                </motion.h2>
              </div>
              <motion.div variants={fadeUp}>
                <Link to="/menu" className="btn-outline">
                  Explore Full Menu <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* exactly 3 large cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured3.map((item, i) => (
                <motion.div key={item.id} variants={fadeUp} custom={i}>
                  <FoodCard item={item} onOpenModal={setModalItem} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          AI TEASER — large prominent card
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#26382C] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#91A38E] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#C77A45] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center">

            {/* text */}
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
                <Bot size={18} className="text-[#91A38E]" />
                <span className="section-label text-[#91A38E]">AI Meal Finder</span>
              </motion.div>
              <motion.h2 variants={fadeUp}
                className="font-serif text-white text-4xl md:text-5xl mb-5">
                Not sure what to order?
              </motion.h2>
              <motion.p variants={fadeUp}
                className="text-white/60 text-lg leading-relaxed mb-8">
                Tell us what you're looking for. Our assistant filters the menu by your meal time,
                preferences, priority and budget — and suggests options to explore.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link to="/meal-finder" className="btn-accent">
                  Find My Meal ✨
                </Link>
                <Link to="/approach"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20
                    text-white/70 text-sm hover:border-white/40 hover:text-white transition-all duration-200">
                  How we use AI
                </Link>
              </motion.div>
            </div>

            {/* sample query chips */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="flex flex-col gap-3">
              {[
                { q: 'Something filling for lunch',         badge: 'Lunch · Filling' },
                { q: 'Vegetarian, budget under ₹150',       badge: 'Vegetarian · Budget' },
                { q: 'Light breakfast, less sweet',         badge: 'Breakfast · Light' },
                { q: 'High-protein snack under ₹100',      badge: 'Snack · Protein' },
              ].map((item, i) => (
                <div key={i}
                  className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5
                    flex items-center justify-between gap-4">
                  <span className="text-white/70 text-sm italic">"{item.q}"</span>
                  <span className="text-[#91A38E] text-xs font-medium bg-white/5 px-2.5 py-1 rounded-full shrink-0">
                    {item.badge}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          AI SUGGESTED. WE VERIFIED.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <motion.p variants={fadeUp} className="section-label mb-4">Our Process</motion.p>
              <motion.h2 variants={fadeUp}
                className="font-serif text-[#26382C] text-4xl md:text-5xl mb-6">
                AI suggested.<br />We verified.
              </motion.h2>
              <motion.p variants={fadeUp}
                className="text-[#707870] text-base leading-relaxed mb-8">
                Every item, every food claim and every AI recommendation has been reviewed against
                WHO, ICMR–NIN and FSSAI. We show you exactly what the AI said and what we changed.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/approach" className="btn-primary">
                  See our approach <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            <motion.div variants={stagger} className="flex flex-col gap-4">
              {[
                { step: '01', label: 'AI generates ideas',        desc: 'Menu items, descriptions and food information.' },
                { step: '02', label: 'We check the sources',      desc: 'WHO, ICMR–NIN and FSSAI guidance reviewed.' },
                { step: '03', label: 'We correct and revise',     desc: 'Overgeneralisations and unsupported claims removed.' },
                { step: '04', label: 'Humans make final decisions', desc: 'AI assists. The team decides what goes on the menu.' },
              ].map((s, i) => (
                <motion.div key={s.step} variants={fadeUp} custom={i}
                  className="flex gap-5 p-5 rounded-2xl bg-[#F7F5EF] items-start">
                  <span className="text-xs font-bold text-[#91A38E] tracking-widest pt-0.5 w-6 shrink-0">{s.step}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#26382C] mb-0.5">{s.label}</p>
                    <p className="text-sm text-[#707870]">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SOURCES
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F5EF] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>

            <motion.p variants={fadeUp} className="section-label mb-4">Our Sources</motion.p>
            <motion.h2 variants={fadeUp}
              className="font-serif text-[#26382C] text-4xl md:text-5xl mb-14 max-w-xl">
              Food, backed by evidence.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {sources.map((src, i) => (
                <motion.a key={src.logo} href={src.url} target="_blank" rel="noopener noreferrer"
                  variants={fadeUp} custom={i}
                  className={`group block p-8 rounded-2xl ${src.color}
                    hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
                  <div className="flex items-start justify-between mb-5">
                    <span className={`text-xl font-bold font-serif ${src.textColor}`}>{src.logo}</span>
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

      {/* ══════════════════════════════════════════════════════════════════
          OUR PROMISE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>

            <motion.p variants={fadeUp} className="section-label mb-4">Our AI Promise</motion.p>
            <motion.h2 variants={fadeUp}
              className="font-serif text-[#26382C] text-4xl md:text-5xl mb-14 max-w-lg">
              Responsible AI, by design.
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {promises.map((p, i) => (
                <motion.div key={p.title} variants={fadeUp} custom={i}
                  className="p-7 rounded-2xl bg-[#F7F5EF] hover:bg-[#EDE6D8] transition-colors duration-300">
                  <span className="text-3xl mb-4 block">{p.icon}</span>
                  <h3 className="font-semibold text-[#26382C] text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-[#707870] leading-relaxed">{p.body}</p>
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
