/**
 * Local fallback recommendation engine.
 * Used when the FastAPI backend is unavailable.
 * Mirrors the logic in backend/services/ai_service.py.
 */
import { menuItems } from '../data/menu.js';

const MEDICAL_PATTERNS = [
  /diabet/i, /cancer/i, /disease/i, /diagnos/i, /treat/i,
  /medic/i, /prescri/i, /cure/i, /symptom/i, /lose weight/i,
  /weight.?loss/i, /calorie.?deficit/i, /eating.?disorder/i,
  /blood.?sugar/i, /cholesterol/i, /blood.?pressure/i,
  /heart.?condition/i, /allerg/i, /intoleran/i,
  /celiac/i, /ibs/i, /crohn/i, /anemia/i, /thyroid/i, /pcos/i, /kidney/i,
];

const MEAL_TIME_MAP = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  snack: 'Snacks',
  drink: 'Drinks',
};

export function localRecommend({ mealTime, preference, priority, priorities, budget, freeText }) {
  // Safety gate
  if (freeText && MEDICAL_PATTERNS.some(re => re.test(freeText))) {
    return { type: 'safety', items: [], disclaimer: DISCLAIMER };
  }

  let items = [...menuItems];

  // Filter by meal time
  if (mealTime && mealTime !== 'any') {
    const cat = MEAL_TIME_MAP[mealTime?.toLowerCase()];
    if (cat) items = items.filter(i => i.category === cat);
  }

  // Filter by preference
  if (preference && preference !== 'any') {
    items = items.filter(i => i.tags.includes(preference.toLowerCase()));
  }

  // fix #4 — support both a single priority string AND an array
  // normalise to array, strip 'any', dedupe
  const priorityList = [
    ...(Array.isArray(priorities) ? priorities : []),
    ...(priority && priority !== 'any' ? [priority] : []),
  ].filter(p => p && p !== 'any');

  if (priorityList.length > 0) {
    // Items that match ALL selected priorities (intersection)
    const allMatch = items.filter(i => priorityList.every(p => i.tags.includes(p.toLowerCase())));
    // Fall back to ANY match if intersection is empty
    const anyMatch = items.filter(i => priorityList.some(p => i.tags.includes(p.toLowerCase())));
    const priorityFiltered = allMatch.length > 0 ? allMatch : anyMatch;
    if (priorityFiltered.length > 0) items = priorityFiltered;
  }

  // Filter by budget (default 250 if undefined)
  const maxBudget = budget ?? 250;
  items = items.filter(i => i.price <= maxBudget);

  // Fallback
  if (items.length === 0) {
    const fallback = menuItems.filter(i => i.price <= maxBudget);
    return {
      type: 'relaxed',
      items: (fallback.length ? fallback : menuItems).slice(0, 4),
      disclaimer: DISCLAIMER,
    };
  }

  return { type: 'normal', items: items.slice(0, 4), disclaimer: DISCLAIMER };
}

const DISCLAIMER =
  'These suggestions are based on the preferences you provided and are limited to items on the Café Nourish menu. They are general food-choice suggestions only and are not medical or dietary advice. For personalised dietary guidance, consult a qualified professional.';
