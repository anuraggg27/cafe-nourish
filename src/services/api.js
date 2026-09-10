/**
 * Café Nourish — Frontend API service
 *
 * Calls the FastAPI backend at localhost:8000.
 * Falls back to local recommendation logic if the backend is unavailable.
 * API keys are NEVER exposed in frontend code — all AI logic runs server-side.
 */
import { localRecommend } from './localRecommend.js';
import { menuItems } from '../data/menu.js';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Get AI meal recommendations from the backend.
 * Falls back to local matching if backend is unreachable.
 */
export async function getRecommendations({ mealTime, preference, priority, budget, freeText }) {
  try {
    const res = await fetch(`${BASE_URL}/api/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meal_time: mealTime || null,
        preference: preference || null,
        priority: priority || null,
        budget: budget ?? 250,
        free_text: freeText || null,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch {
    // Backend unavailable — use local fallback
    return localRecommend({ mealTime, preference, priority, budget, freeText });
  }
}

/**
 * Fetch the full menu from the backend.
 */
export async function getMenu() {
  try {
    const res = await fetch(`${BASE_URL}/api/menu`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch {
    return menuItems;
  }
}
