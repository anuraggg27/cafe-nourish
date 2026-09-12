import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import FoodModal from '../components/FoodModal';
import { menuItems, filterTags, filterMenu } from '../data/menu';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [modalItem,    setModalItem]    = useState(null);

  const filtered = useMemo(() => {
    let items = filterMenu(menuItems, activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }
    return items;
  }, [activeFilter, searchQuery]);

  // Group by category only in "all" flat view
  const grouped = useMemo(() => {
    const f = activeFilter.toLowerCase();
    if (['breakfast','lunch','snacks','drinks'].includes(f)) return null;
    if (searchQuery.trim()) return null;
    const g = {};
    filtered.forEach(item => {
      if (!g[item.category]) g[item.category] = [];
      g[item.category].push(item);
    });
    return g;
  }, [filtered, activeFilter, searchQuery]);

  const categoryOrder = ['Breakfast', 'Lunch', 'Snacks', 'Drinks'];

  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-16">

      {/* modal */}
      {modalItem && <FoodModal item={modalItem} onClose={() => setModalItem(null)} />}

      {/* ── header ── */}
      <section className="bg-white border-b border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="section-label mb-4">Our Menu</motion.p>
            <motion.h1 variants={fadeUp}
              className="font-serif text-[#26382C] text-5xl md:text-6xl mb-4 max-w-2xl">
              The Balanced Menu
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#707870] text-lg max-w-xl leading-relaxed">
              Explore our food by what you're looking for — not by restrictive labels.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── sticky filter bar ── */}
      <div className="sticky top-16 z-30 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* search */}
          <div className="relative shrink-0">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707870]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search items or ingredients…"
              className="pl-9 pr-8 py-2 rounded-xl bg-white border border-[#EDE6D8] text-sm
                text-[#26302A] placeholder-[#707870] focus:outline-none focus:border-[#91A38E]
                transition-colors w-52"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707870] hover:text-[#26302A]">
                <X size={13} />
              </button>
            )}
          </div>

          {/* filter pills */}
          <div className="flex gap-2 flex-wrap">
            {filterTags.map(tag => (
              <button key={tag.id} onClick={() => setActiveFilter(tag.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  activeFilter === tag.id
                    ? 'bg-[#26382C] text-white shadow-sm'
                    : 'bg-white text-[#707870] border border-[#EDE6D8] hover:border-[#91A38E] hover:text-[#26302A]'
                }`}>
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── content ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <p className="text-4xl mb-4">🍽</p>
            <p className="text-[#707870] text-lg mb-2">No items match your search.</p>
            <button onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="mt-6 btn-outline">
              Clear filters
            </button>
          </motion.div>

        ) : grouped ? (
          /* grouped by category */
          <div className="space-y-16">
            {categoryOrder.filter(cat => grouped[cat]?.length).map(cat => (
              <div key={cat}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-serif text-[#26382C] text-2xl">{cat}</h2>
                  <div className="flex-1 h-px bg-[#EDE6D8]" />
                  <span className="text-xs text-[#707870]">{grouped[cat].length} items</span>
                </div>
                {/* mobile: 1 col, sm: 2 col, lg: 3 col, xl: 4 col */}
                <motion.div
                  variants={stagger} initial="hidden" whileInView="show"
                  viewport={{ once: true, amount: 0.08 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {grouped[cat].map((item, i) => (
                    <motion.div key={item.id} variants={fadeUp} custom={i}>
                      <FoodCard item={item} onOpenModal={setModalItem} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

        ) : (
          /* flat filtered list */
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter + searchQuery}
              variants={stagger} initial="hidden" animate="show" exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((item, i) => (
                <motion.div key={item.id} variants={fadeUp} custom={i}>
                  <FoodCard item={item} onOpenModal={setModalItem} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {filtered.length > 0 && (
          <p className="text-center text-xs text-[#707870] mt-12">
            Showing {filtered.length} item{filtered.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* allergen footer note */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-[#EDE6D8] rounded-2xl p-6 flex gap-4 items-start">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-[#26382C] mb-1">Allergen information</p>
            <p className="text-sm text-[#707870] leading-relaxed">
              Ingredient information displayed is a general guide only. Cross-contact with allergens
              is possible during preparation. Please speak to café staff about specific allergen
              concerns before ordering.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
