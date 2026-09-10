import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const principles = [
  {
    title: 'Evidence over assumptions.',
    body: 'Every food claim and menu principle is checked against named, publicly available sources. We do not assume — we verify.',
  },
  {
    title: 'Transparency over marketing claims.',
    body: 'We list ingredients, describe food profiles and explain why each item is on the menu. We do not use vague wellness language.',
  },
  {
    title: 'Human judgment over blind automation.',
    body: 'AI generates ideas and drafts. A human reviews, revises, rejects or overrides every output before it reaches the user.',
  },
  {
    title: 'Practicality over perfection.',
    body: 'Our menu is designed for students. Affordability, familiarity and accessibility matter more than following an idealised nutrition model.',
  },
];

const team = [
  { role: 'Research', name: 'Member 1', focus: 'WHO · ICMR–NIN · FSSAI evidence gathering' },
  { role: 'Menu Design', name: 'Member 2', focus: 'Menu items · Ingredients · Food categories' },
  { role: 'UI / UX', name: 'Member 3', focus: 'Design system · Figma wireframes · Visual language' },
  { role: 'Frontend', name: 'Member 4', focus: 'React · Tailwind · Component architecture' },
  { role: 'AI Engineering', name: 'Member 5', focus: 'AI Meal Finder · Safety rules · Recommendation logic' },
  { role: 'Verification', name: 'Member 6', focus: 'AI Integrity Log · Testing · Presentation evidence' },
];

const timeline = [
  { day: 'Day 1', task: 'Concept, brand identity, colour palette, project scope.' },
  { day: 'Day 2', task: 'Research sprint — evidence sheet with claim, source, finding, use.' },
  { day: 'Day 3', task: 'Figma wireframes for all 6 pages.' },
  { day: 'Days 4–6', task: 'Frontend build — all pages and components.' },
  { day: 'Days 7–8', task: 'AI backend — FastAPI, recommendation logic, safety layer.' },
  { day: 'Day 9', task: 'Integration — AI connected to menu database.' },
  { day: 'Day 10', task: 'Testing — normal, edge-case, medical, allergen queries.' },
  { day: 'Day 11', task: 'AI Integrity Log documentation.' },
  { day: 'Day 12–13', task: 'Presentation polish and viva preparation.' },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F6F1] pt-16">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#EFE9DD] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="section-label mb-4">About</motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-[#24352A] text-5xl md:text-6xl mb-6 max-w-2xl leading-tight">
              More than a café.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#6F776F] text-lg max-w-2xl leading-relaxed">
              Café Nourish was created as part of an AI project exploring how technology can support better everyday food choices — without replacing human judgment, inventing health claims, or pretending to be something it isn't.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text */}
            <div>
              <motion.p variants={fadeUp} className="section-label mb-4">The idea</motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl mb-6">
                A concept born from a question.
              </motion.h2>
              <motion.div variants={stagger} className="space-y-4 text-[#6F776F] text-base leading-relaxed">
                <motion.p variants={fadeUp}>
                  What would a student café look like if it was designed around transparency, balance and evidence — rather than marketing language and vague wellness claims?
                </motion.p>
                <motion.p variants={fadeUp}>
                  We used AI to explore ideas, generate drafts and test the menu. Then we checked every output against authoritative sources — WHO, ICMR–NIN and FSSAI. Where the AI was wrong, we corrected it. Where it was biased, we overrode it. Where it crossed a line, we blocked it.
                </motion.p>
                <motion.p variants={fadeUp}>
                  The result is Café Nourish — a working demonstration of how AI can assist design without being trusted blindly.
                </motion.p>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              variants={fadeUp}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#EFE9DD] shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop"
                alt="Café interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24352A]/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-serif text-xl">Café Nourish</p>
                <p className="text-white/70 text-sm">Good food. Better choices.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Principles ────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Our Principles</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl md:text-5xl mb-14 max-w-xl">
              What guides every decision.
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  custom={i}
                  className="p-8 bg-[#F8F6F1] rounded-2xl hover:bg-[#EFE9DD] transition-colors duration-300"
                >
                  <h3 className="font-serif text-[#24352A] text-xl mb-3">{p.title}</h3>
                  <p className="text-sm text-[#6F776F] leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">The Team</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl md:text-5xl mb-4 max-w-xl">
              Six people. One café.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6F776F] text-base leading-relaxed max-w-xl mb-12">
              Each member owns a distinct role, but the viva is individual — everyone understands the full project.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {team.map((member, i) => (
                <motion.div
                  key={member.role}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white p-6 rounded-2xl hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EFE9DD] flex items-center justify-center mb-4">
                    <span className="text-sm font-semibold text-[#24352A]">{i + 1}</span>
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-1">{member.role}</p>
                  <p className="font-semibold text-[#263029] mb-2">{member.name}</p>
                  <p className="text-sm text-[#6F776F] leading-relaxed">{member.focus}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Project Timeline</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-[#24352A] text-4xl mb-12 max-w-xl">
              13 days. One working product.
            </motion.h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-0 bottom-0 w-px bg-[#EFE9DD] hidden sm:block" />
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.day}
                    variants={fadeUp}
                    custom={i}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#24352A] flex items-center justify-center shrink-0 relative z-10">
                      <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-xs font-semibold tracking-widest uppercase text-[#8FA58C] mb-1">{item.day}</p>
                      <p className="text-sm text-[#263029] leading-relaxed">{item.task}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Visit / Contact ───────────────────────────────────────────────── */}
      <section className="bg-[#24352A] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.p variants={fadeUp} className="section-label text-[#8FA58C] mb-4">Visit us</motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-white text-4xl mb-6">
                Come say hello.
              </motion.h2>
              <motion.div variants={stagger} className="space-y-4">
                {[
                  { label: 'Location', value: 'Campus Food Court, Ground Floor, Block C' },
                  { label: 'Hours', value: 'Mon–Fri, 8:00 am – 6:00 pm' },
                  { label: 'Contact', value: 'cafenourish@university.edu' },
                ].map(item => (
                  <motion.div key={item.label} variants={fadeUp} className="flex gap-4">
                    <p className="text-white/40 text-sm w-20 shrink-0">{item.label}</p>
                    <p className="text-white/80 text-sm">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="bg-white/10 border border-white/10 rounded-3xl p-8">
              <p className="font-serif text-white text-2xl mb-4">Ready to explore the menu?</p>
              <p className="text-white/60 text-sm mb-8 leading-relaxed">
                Browse all items, use the AI meal finder, or read about how we made every decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/menu" className="btn-accent justify-center">
                  Browse Menu <ArrowRight size={14} />
                </Link>
                <Link to="/meal-finder" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 text-sm hover:border-white/40 hover:text-white transition-all duration-200">
                  AI Meal Finder
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
