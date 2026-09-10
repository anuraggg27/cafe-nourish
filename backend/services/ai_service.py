"""
AI recommendation service for Café Nourish.

Architecture:
  User preferences → Safety check → Menu filter → Ranked results → Disclaimer

Safety rules enforced BEFORE any recommendation is generated.
The system ONLY recommends items that exist in MENU_ITEMS.
It NEVER invents food items or nutritional values.
"""
import re
from typing import List
from ..models.menu import MenuItem, RecommendRequest, RecommendResponse, MENU_ITEMS

# ─── Safety patterns ─────────────────────────────────────────────────────────
# Any query matching these patterns triggers the safety block.
# DO NOT:
#   - diagnose medical conditions
#   - recommend treatment
#   - claim disease prevention
#   - make unsupported health claims
#   - advise for specific medical conditions

MEDICAL_PATTERNS = [
    r"diabet", r"cancer", r"\bdisease\b", r"diagnos", r"treat",
    r"medic(?:ation|ine|al)", r"prescri", r"\bcure\b", r"symptom",
    r"lose weight", r"weight.?loss", r"calorie.?deficit",
    r"eating.?disorder", r"blood.?sugar", r"cholesterol",
    r"blood.?pressure", r"heart.?condition", r"\ballerg", r"intoleran",
    r"celiac", r"\bibs\b", r"crohn", r"anemia", r"anaemia",
    r"thyroid", r"pcos", r"kidney",
]

_medical_re = re.compile("|".join(MEDICAL_PATTERNS), re.IGNORECASE)


def _is_medical_query(text: str) -> bool:
    return bool(_medical_re.search(text))


# ─── Category mapping ─────────────────────────────────────────────────────────
MEAL_TIME_MAP = {
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "snack": "Snacks",
    "drink": "Drinks",
}


# ─── Core recommendation logic ────────────────────────────────────────────────
def get_recommendations(req: RecommendRequest) -> RecommendResponse:
    """
    Filter and rank menu items based on user preferences.

    Safety check runs first — medical queries are blocked unconditionally.
    Recommendations are limited to items in MENU_ITEMS (no invented items).
    """
    # 1. Safety gate
    if req.free_text and _is_medical_query(req.free_text):
        return RecommendResponse(type="safety", items=[])

    items: List[MenuItem] = list(MENU_ITEMS)

    # 2. Filter by meal time
    if req.meal_time and req.meal_time != "any":
        category = MEAL_TIME_MAP.get(req.meal_time.lower())
        if category:
            items = [i for i in items if i.category == category]

    # 3. Filter by dietary preference
    if req.preference and req.preference != "any":
        items = [i for i in items if req.preference.lower() in i.tags]

    # 4. Filter by priority
    if req.priority and req.priority != "any":
        priority_tag = req.priority.lower()
        priority_filtered = [i for i in items if priority_tag in i.tags]
        # Only apply priority filter if it doesn't empty the list
        if priority_filtered:
            items = priority_filtered

    # 5. Filter by budget
    items = [i for i in items if i.price <= req.budget]

    # 6. Fallback — relax all filters except budget
    if not items:
        fallback = [i for i in MENU_ITEMS if i.price <= req.budget]
        if not fallback:
            fallback = sorted(MENU_ITEMS, key=lambda x: x.price)[:4]
        return RecommendResponse(type="relaxed", items=fallback[:4])

    # 7. Simple ranking: prefer items with more matching tags
    def score(item: MenuItem) -> int:
        s = 0
        if req.preference and req.preference != "any" and req.preference.lower() in item.tags:
            s += 2
        if req.priority and req.priority != "any" and req.priority.lower() in item.tags:
            s += 2
        if req.meal_time and req.meal_time != "any":
            expected_cat = MEAL_TIME_MAP.get(req.meal_time.lower(), "")
            if item.category == expected_cat:
                s += 1
        return s

    items.sort(key=score, reverse=True)

    return RecommendResponse(type="normal", items=items[:4])
