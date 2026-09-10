import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ─── Source data ─────────────────────────────────────────────────────────────
const sources = [
  {
    id: 'who',
    logo: 'WHO',
    fullName: 'World Health Organization',
    title: 'Healthy Diet',
    url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
    color: 'bg-[#e8f0ef]',
    borderColor: 'border-[#2a4a47]/10',
    logoBg: 'bg-[#2a4a47]',
    year: '2020',
    keyLearnings: [
      'Eat a variety of foods from different food groups every day',
      'Limit free sugars to less than 10% of total energy intake',
      'Choose minimally processed foods where possible',
      'Include vegetables, fruits, legumes, nuts and whole grains',
      'Avoid labelling individual foods as simply "good" or "bad"',
    ],
    howWeUsedIt: [
      'Informed our "no free-sugar" approach to drinks — all beverages listed with minimal or no added sugar',
      'Guided our use of varied food categories (pulses, grains, dairy, vegetables, fruit) across the menu',
      'Supported our decision not to label any café item as "healthy" or "unhealthy"',
    ],
    quote: 'A healthy diet helps protect against malnutrition in all its forms, as well as noncommunicable diseases.',
  },
  {
    id: 'icmr',
    logo: 'ICMR–NIN',
    fullName: 'Indian Council of Medical Research – National Institute of Nutrition',
    title: 'Dietary Guidelines for Indians',
    url: 'https://www.nin.res.in/downloads/DietaryGuidelinesforNINwebsite.pdf',
    color: 'bg-[#eaf2ea]',
    borderColor: 'border-[#24352A]/10',
    logoBg: 'bg-[#24352A]',
    year: '2011',
    keyLearnings: [
      'Consume a diverse range of food groups daily including cereals, pulses, vegetables and fruits',
      'Include curd, milk or dairy products regularly',
      'Nuts and seeds are a valuable part of the Indian diet',
      'Pulses (rajma, chana, moong, toor dal) are important protein sources for vegetarians',
      'Seasonal vegetables and fruits should be prioritised',
    ],
    howWeUsedIt: [
      'Drove the selection of pulse-based dishes: Rajma Rice Bowl, Chana Masala, Dal Tadka, Moong Chilla',
      'Guided the inclusion of curd-based items: Curd & Fruit Bowl, Lassi',
      'Supported our emphasis on seasonal vegetables across menu categories',
      'Informed the rationale written for each dish on the food detail page',
    ],
    quote: 'Adopt a balanced diet using a variety of foods from different food groups to achieve optimal nutrition.',
  },
  {
    id: 'fssai',
    logo: 'FSSAI',
    fullName: 'Food Safety and Standards Authority of India — Eat Right India',
    title: 'Eat Right India',
    url: 'https://eatrightindia.gov.in/',
    color: 'bg-[#fef3e8]',
    borderColor: 'border-[#C87941]/10',
    logoBg: 'bg-[#C87941]',
    year: '2018–present',
    keyLearnings: [
      'Support informed food choices through transparent ingredient information',
      'Encourage food safety awareness in everyday eating decisions',
      'Promote healthier eating practices without shaming food choices',
      'Make nutritional information accessible and easy to understand',
    ],
    howWeUsedIt: [
      'Shaped our approach to ingredient transparency — every menu item lists what\'s inside',
      'Guided our allergen disclaimer design and the decision to include it on every item',
      'Informed our philosophy of informing without prescribing',
    ],
    quote: 'Eat Right India seeks to transform the country\'s food system to make it safe, healthy and sustainable.',
  },
];

// ─── Trust but Verify data ────────────────────────────────────────────────────
const verifyExamples = [
  {
    aiSaid: '"Everyone should avoid carbohydrates to maintain a healthy weight."',
    weChecked: 'WHO Healthy Diet guidelines and ICMR–NIN Dietary Guidelines for Indians',
    found: 'This is an overgeneralisation. WHO and ICMR–NIN both recommend cereals and grains as a core part of daily food intake. The issue is excess refined carbohydrates, not carbohydrates as a category.',
    weChanged: '"Our menu provides a variety of carbohydrate sources, with an emphasis on minimally processed options such as whole grains and rice."',
    status: 'corrected',
  },
  {
    aiSaid: '"Rajma rice prevents protein deficiency in vegetarians."',
    weChecked: 'ICMR–NIN guidance on pulses and vegetarian protein sources',
    found: 'Rajma is an important pulse-based protein source for vegetarians, as noted by ICMR–NIN. However, making a direct disease-prevention claim is beyond what the evidence supports for a single food item.',
    weChanged: '"Rajma combined with rice provides a pulse-grain combination with complementary plant proteins, consistent with ICMR–NIN guidance on pulse consumption."',
    status: 'corrected',
  },
  {
    aiSaid: '"Turmeric milk cures inflammation and boosts immunity."',
    weChecked: 'WHO guidance on food claims; FSSAI food labelling standards',
    found: 'Turmeric has a long history in traditional Indian food culture. However, making cure or immunity claims for a food item is not supported by WHO or FSSAI food safety standards, and would constitute an unverified health claim.',
    weChanged: '"A warm milk-based drink without refined sugar. Turmeric and pepper are traditional additions with a long history in Indian food culture."',
    status: 'corrected',
  },
  {
    aiSaid: '"Our menu is suitable for people with type 2 diabetes."',
    weChecked: 'WHO guidance on health claims; general responsible AI principles',
    found: 'This statement constitutes a medical claim for a specific health condition. No café menu can be described as suitable for a medical condition without individualised clinical assessment.',
    weChanged: 'Statement removed entirely. Added a disclaimer across the site: "Not medical or dietary advice."',
    status: 'removed',
  },
];

function SourceCard({ source }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-3xl border ${source.borderColor} ${source.color} overflow-hidden`}
    >
      {/* Header */}
      <div className="p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className={`${source.logoBg} text-white text-sm font-bold px-3 py-2 rounded-xl`}>
              {source.logo}
            </span>
            <div>
              <p className="text-xs text-[#6F776F] mb-0.5">{source.fullName}</p>
              <p className="text-xs text-[#6F776F]">{source.year}</p>
            </div>
          </div>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#6F776F] hover:text-[#24352A] transition-colors shrink-0"
          >
            Read source <ExternalLink size={11} />
          </a>
        </div>

        <h3 className="font-serif text-[#24352A] text-2xl mb-4">{source.title}</h3>
        <blockquote className="border-l-2 border-[#8FA58C] pl-4 text-sm text-[#6F776F] italic leading-relaxed mb-6">
          "{source.quote}"
        </blockquote>

        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-3">What we learned</p>
          <ul className="space-y-2">
            {source.keyLearnings.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#263029]">
                <CheckCircle2 size={14} className="text-[#8FA58C] mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm text-[#24352A] font-medium hover:opacity-70 transition-opacity"
        >
          {open ? 'Hide' : 'Show'} how we used this source
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expandable: how we used it */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white/60 px-8 py-6 border-t border-white/40">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-3">How we used it</p>
              <ul className="space-y-2">
                {source.howWeUsedIt.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#263029]">
                    <ArrowRight size={12} className="text-[#C87941] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FoodFacts() {
  return (
    <main className="min-h-screen bg-[#F8F6F1] pt-16">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#EFE9DD] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="section-label mb-4">Food Facts</motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-[#24352A] text-5xl md:text-6xl mb-5 max-w-2xl">
              Food, backed by evidence.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#6F776F] text-lg max-w-xl leading-relaxed">
              We don't expect you to trust an AI-generated answer. We check it. Every principle behind our menu comes from a named, publicly available source.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Sources ───────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="space-y-8"
        >
          {sources.map((src, i) => (
            <motion.div key={src.id} variants={fadeUp} custom={i}>
              <SourceCard source={src} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Trust but Verify ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Trust but Verify</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl md:text-5xl mb-4 max-w-2xl">
              AI said it.<br />We checked it.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6F776F] text-base max-w-xl leading-relaxed mb-14">
              Here are four real examples of AI-generated claims we reviewed, what we found when we checked them, and what we changed.
            </motion.p>

            <div className="space-y-6">
              {verifyExamples.map((ex, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="bg-[#F8F6F1] rounded-3xl overflow-hidden"
                >
                  <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#EFE9DD]">
                    {/* AI said */}
                    <div className="p-7">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-6 h-6 rounded-full bg-[#C87941]/15 flex items-center justify-center">
                          <span className="text-xs font-bold text-[#C87941]">AI</span>
                        </span>
                        <p className="text-xs font-semibold tracking-widest uppercase text-[#C87941]">AI said</p>
                      </div>
                      <p className="text-sm text-[#263029] italic leading-relaxed">{ex.aiSaid}</p>
                    </div>

                    {/* We checked */}
                    <div className="p-7">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-6 h-6 rounded-full bg-[#8FA58C]/20 flex items-center justify-center">
                          <span className="text-xs">🔍</span>
                        </span>
                        <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C]">We checked</p>
                      </div>
                      <p className="text-xs text-[#6F776F] mb-2 font-medium">Source: {ex.weChecked}</p>
                      <p className="text-sm text-[#263029] leading-relaxed">{ex.found}</p>
                    </div>

                    {/* We changed */}
                    <div className="p-7">
                      <div className="flex items-center gap-2 mb-4">
                        {ex.status === 'removed' ? (
                          <>
                            <XCircle size={16} className="text-[#24352A]" />
                            <p className="text-xs font-semibold tracking-widest uppercase text-[#24352A]">Removed</p>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={16} className="text-[#24352A]" />
                            <p className="text-xs font-semibold tracking-widest uppercase text-[#24352A]">We changed it to</p>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-[#263029] leading-relaxed font-medium">{ex.weChanged}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F6F1] py-16 border-t border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-serif text-[#24352A] text-2xl mb-2">Curious how we used AI?</p>
            <p className="text-[#6F776F] text-sm">See the full AI decision log, human overrides and our responsible AI principles.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/approach" className="btn-primary">
              Our Approach <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
