import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ─── AI Integrity Log ────────────────────────────────────────────────────────
const integrityLog = [
  {
    use: 'Menu brainstorming',
    what: 'AI generated a list of 20+ café menu ideas.',
    outcome: '8 items retained after review for affordability, familiarity and ingredient availability.',
    decision: 'Partial accept',
    tag: 'accepted',
  },
  {
    use: 'Ingredient descriptions',
    what: 'AI wrote short descriptions for each menu item.',
    outcome: 'All descriptions reviewed. Language modified to remove implied health benefit claims.',
    decision: 'Revised',
    tag: 'revised',
  },
  {
    use: 'Unsupported health claims',
    what: 'AI generated claims like "prevents disease" and "boosts immunity."',
    outcome: 'All such claims identified and removed. Replaced with factual ingredient descriptions.',
    decision: 'Rejected',
    tag: 'rejected',
  },
  {
    use: 'Menu recommendations (western bias)',
    what: 'Initial AI suggestions heavily favoured avocado toast, quinoa salad, acai bowls.',
    outcome: 'Menu replaced with affordable Indian options: poha, rajma, dal, curd, chana.',
    decision: 'Human override',
    tag: 'override',
  },
  {
    use: 'AI meal finder logic',
    what: 'AI assistant generated overly broad dietary advice.',
    outcome: 'Safety rules added. Medical queries now blocked. All suggestions limited to menu items only.',
    decision: 'Safety rule added',
    tag: 'safety',
  },
  {
    use: 'Food category labels',
    what: 'AI suggested using "Healthy" / "Unhealthy" tags on menu items.',
    outcome: 'Binary labelling rejected. Replaced with descriptive tags: Plant Forward, Fresh, Nourish.',
    decision: 'Human override',
    tag: 'override',
  },
  {
    use: 'Allergen information',
    what: 'AI provided specific cross-contact assurances it could not verify.',
    outcome: 'Specific claims removed. Replaced with standard guidance to speak to café staff.',
    decision: 'Revised',
    tag: 'revised',
  },
];

const tagStyles = {
  accepted: 'bg-[#eaf2ea] text-[#26382C]',
  revised: 'bg-[#e8f0ef] text-[#2a4a47]',
  rejected: 'bg-[#fef3e8] text-[#C77A45]',
  override: 'bg-[#EDE6D8] text-[#707870]',
  safety: 'bg-[#26382C] text-white',
};

// ─── Human override comparison ───────────────────────────────────────────────
const aiSuggested = [
  { emoji: '🥑', label: 'Avocado Toast', note: 'Imported, expensive' },
  { emoji: '🫐', label: 'Berry Smoothie', note: 'Out of season' },
  { emoji: '🥗', label: 'Quinoa Salad', note: 'Unfamiliar, pricey' },
  { emoji: '🥣', label: 'Acai Bowl', note: 'Unavailable locally' },
  { emoji: '🧇', label: 'Protein Waffle', note: 'Not student-friendly' },
];

const weChose = [
  { emoji: '🥣', label: 'Poha', note: 'Affordable, familiar' },
  { emoji: '🌱', label: 'Rajma', note: 'High protein, cheap' },
  { emoji: '🫘', label: 'Chana', note: 'Widely available' },
  { emoji: '🥛', label: 'Curd & Lassi', note: 'Everyday dairy' },
  { emoji: '🍌', label: 'Seasonal Fruit', note: 'Fresh and local' },
];

// ─── Responsible AI principles ───────────────────────────────────────────────
const principles = [
  {
    icon: '🔒',
    title: 'Privacy first',
    body: 'No real personal information is required to use the AI meal finder. We do not collect, store or transmit user preferences.',
  },
  {
    icon: '🩺',
    title: 'No diagnosis',
    body: 'The AI assistant does not diagnose, treat or advise on medical conditions. Medical queries are blocked before any response is generated.',
  },
  {
    icon: '🔎',
    title: 'Verify everything',
    body: 'Every food claim and recommendation principle has been checked against WHO, ICMR–NIN and FSSAI guidance by a human reviewer.',
  },
  {
    icon: '👤',
    title: 'Humans decide',
    body: 'AI assists our team in generating ideas and drafts. All final decisions — menu items, labels, claims, safety rules — are made by humans.',
  },
  {
    icon: '🚫',
    title: 'No invented information',
    body: 'The AI recommendation system only suggests items that exist in our menu database. It cannot invent food items or nutritional values.',
  },
  {
    icon: '🗂',
    title: 'Transparent log',
    body: 'Every significant AI use is documented on this page. We do not hide where AI was involved or where it was wrong.',
  },
];

export default function Approach() {
  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-16">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#EDE6D8] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="section-label mb-4">Our Approach</motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-[#26382C] text-5xl md:text-6xl mb-5 max-w-2xl">
              AI generates.<br />Evidence verifies.<br />Humans decide.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#707870] text-lg max-w-xl leading-relaxed">
              This is the single principle behind every decision we made — from menu design to the AI meal finder to the way we write about food.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Human Override ────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Human Override</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#26382C] text-4xl md:text-5xl mb-4 max-w-xl">
              AI suggested. We chose differently.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#707870] text-base leading-relaxed max-w-xl mb-14">
              When we asked the AI for menu ideas, it returned a Western-biased list of premium ingredients. We rejected it. Our target users are students — we needed affordability, familiarity and practical availability.
            </motion.p>

            <motion.div variants={fadeUp} className="bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#EDE6D8]">
                {/* AI suggested */}
                <div className="p-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-7 h-7 rounded-full bg-[#C77A45]/15 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#C77A45]">AI</span>
                    </span>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#C77A45]">AI suggested</p>
                  </div>
                  <ul className="space-y-4">
                    {aiSuggested.map(item => (
                      <li key={item.label} className="flex items-center justify-between">
                        <span className="flex items-center gap-3 text-sm text-[#26302A]">
                          <span className="text-lg">{item.emoji}</span>
                          {item.label}
                        </span>
                        <span className="text-xs text-[#C77A45] bg-[#fef3e8] px-2.5 py-1 rounded-full">
                          {item.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* We chose */}
                <div className="p-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-7 h-7 rounded-full bg-[#eaf2ea] flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </span>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#26382C]">We chose</p>
                  </div>
                  <ul className="space-y-4">
                    {weChose.map(item => (
                      <li key={item.label} className="flex items-center justify-between">
                        <span className="flex items-center gap-3 text-sm text-[#26302A]">
                          <span className="text-lg">{item.emoji}</span>
                          {item.label}
                        </span>
                        <span className="text-xs text-[#26382C] bg-[#eaf2ea] px-2.5 py-1 rounded-full">
                          {item.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reason */}
              <div className="bg-[#F7F5EF] px-10 py-6 border-t border-[#EDE6D8]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E] mb-2">Why?</p>
                <p className="text-sm text-[#707870] leading-relaxed max-w-2xl">
                  Our target users are students. We prioritised affordability, accessibility, familiarity and practical ingredient availability — factors the AI did not consider without being explicitly prompted.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AI Integrity Log ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">AI Integrity Log</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#26382C] text-4xl md:text-5xl mb-4 max-w-xl">
              Every AI use, documented.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#707870] text-base leading-relaxed max-w-xl mb-12">
              We don't hide where AI was involved. Below is a simplified version of our AI use log. This directly informs our submission evidence.
            </motion.p>

            {/* Table */}
            <motion.div variants={fadeUp} className="bg-[#F7F5EF] rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="hidden lg:grid grid-cols-4 gap-4 px-7 py-4 border-b border-[#EDE6D8]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E]">AI Use</p>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E]">What happened</p>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E]">Our outcome</p>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#91A38E]">Decision</p>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#EDE6D8]">
                {integrityLog.map((row, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    className="grid lg:grid-cols-4 gap-4 px-7 py-5 hover:bg-[#EDE6D8]/50 transition-colors"
                  >
                    <p className="text-sm font-semibold text-[#26302A]">{row.use}</p>
                    <p className="text-sm text-[#707870] leading-relaxed">{row.what}</p>
                    <p className="text-sm text-[#707870] leading-relaxed">{row.outcome}</p>
                    <div>
                      <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${tagStyles[row.tag]}`}>
                        {row.decision}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xs text-[#707870] mt-4">
              Full AI Integrity Log with timestamps and detailed evidence is available in the project submission documentation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Responsible AI Principles ─────────────────────────────────────── */}
      <section className="py-20 border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Our AI Promise</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#26382C] text-4xl md:text-5xl mb-14 max-w-xl">
              Responsible AI, by design.
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white p-7 rounded-2xl hover:shadow-md transition-all duration-300"
                >
                  <span className="text-3xl mb-4 block">{p.icon}</span>
                  <h3 className="font-semibold text-[#26382C] text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-[#707870] leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Architecture diagram ──────────────────────────────────────────── */}
      <section className="bg-[#26382C] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label text-[#91A38E] mb-4">System Architecture</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-white text-3xl md:text-4xl mb-12 max-w-xl">
              How the AI works in our system.
            </motion.h2>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: 'User', sub: 'Preference form' },
                { label: 'Safety check', sub: 'Medical query filter' },
                { label: 'Menu database', sub: 'Real items only' },
                { label: 'Recommendation', sub: 'Filtered results' },
                { label: 'Disclaimer', sub: 'Not medical advice' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-4 text-center min-w-[120px]">
                    <p className="text-white text-sm font-semibold mb-1">{step.label}</p>
                    <p className="text-white/50 text-xs">{step.sub}</p>
                  </div>
                  {i < 4 && (
                    <ArrowRight size={16} className="text-white/30 shrink-0" />
                  )}
                </div>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-white/40 text-xs mt-8 max-w-xl">
              The AI never invents menu items. It never stores user data. It never provides medical or dietary advice. All recommendations are filtered through safety rules before reaching the user.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F5EF] py-16 border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-serif text-[#26382C] text-2xl mb-2">See the evidence behind our menu</p>
            <p className="text-[#707870] text-sm">WHO, ICMR–NIN and FSSAI — all checked, all linked.</p>
          </div>
          <Link to="/food-facts" className="btn-primary shrink-0">
            Food Facts <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
