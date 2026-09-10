import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { menuItems, filterTags, filterMenu } from '../data/menu';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let items = filterMenu(menuItems, activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        i =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }
    return items;
  }, [activeFilter, searchQuery]);

  // Group items by category for display
  const grouped = useMemo(() => {
    if (activeFilter !== 'all' && ['breakfast', 'lunch', 'snacks', 'drinks'].includes(activeFilter.toLowerCase())) {
      return null; // flat list when category is selected
    }
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered, activeFilter]);

  const categoryOrder = ['Breakfast', 'Lunch', 'Snacks', 'Drinks'];

  return (
    <main className="min-h-screen bg-[#F8F6F1] pt-16">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">Our Menu</motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-[#24352A] text-5xl md:text-6xl mb-4 max-w-2xl">
              The Balanced Menu
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#6F776F] text-lg max-w-xl leading-relaxed">
              Food that's easy to understand, easy to choose, and made for everyday life.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar (sticky) ───────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-shrink-0">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6F776F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search items or ingredients…"
              className="pl-9 pr-4 py-2 rounded-full bg-white border border-[#EFE9DD] text-sm text-[#263029] placeholder-[#6F776F] focus:outline-none focus:border-[#8FA58C] transition-colors w-56"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F776F] hover:text-[#263029]"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Pills */}
          <div className="flex gap-2 flex-wrap">
            {filterTags.map(tag => (
              <button
                key={tag.id}
                onClick={() => setActiveFilter(tag.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  activeFilter === tag.id
                    ? 'bg-[#24352A] text-white shadow-sm'
                    : 'bg-white text-[#6F776F] border border-[#EFE9DD] hover:border-[#8FA58C] hover:text-[#24352A]'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-4xl mb-4">🍽</p>
            <p className="text-[#6F776F] text-lg mb-2">No items match your search.</p>
            <p className="text-[#6F776F] text-sm">Try a different filter or search term.</p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="mt-6 btn-outline"
            >
              Clear filters
            </button>
          </motion.div>
        ) : grouped ? (
          // Grouped by category (All view)
          <div className="space-y-16">
            {categoryOrder.filter(cat => grouped[cat]?.length).map(cat => (
              <div key={cat}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-serif text-[#24352A] text-2xl">{cat}</h2>
                  <div className="flex-1 h-px bg-[#EFE9DD]" />
                  <span className="text-xs text-[#6F776F]">{grouped[cat].length} items</span>
                </div>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {grouped[cat].map((item, i) => (
                    <motion.div key={item.id} variants={fadeUp} custom={i}>
                      <FoodCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          // Flat filtered list
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + searchQuery}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div key={item.id} variants={fadeUp} custom={i}>
                  <FoodCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Results count */}
        {filtered.length > 0 && (
          <p className="text-center text-xs text-[#6F776F] mt-12">
            Showing {filtered.length} item{filtered.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* ── Allergen footer note ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-[#EFE9DD] rounded-2xl p-6 flex gap-4 items-start">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-[#24352A] mb-1">Allergen information</p>
            <p className="text-sm text-[#6F776F] leading-relaxed">
              Ingredient information displayed is a general guide only. Cross-contact with allergens is possible during preparation. Please speak to café staff about specific allergen concerns before ordering.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
