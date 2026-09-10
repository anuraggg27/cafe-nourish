# Café Nourish 🌿

> **Good food. Better choices.**

A modern café website built as an AI project — demonstrating how AI can assist everyday food choices without replacing human judgment, inventing health claims, or pretending to be something it isn't.

**Live site → [cafe-nourish.vercel.app](https://cafe-nourish.vercel.app)**  
**Repo → [github.com/anuraggg27/cafe-nourish](https://github.com/anuraggg27/cafe-nourish)**

---

## What it is

Café Nourish is a student-friendly café concept website with a real working AI meal finder. Every menu item, food claim and AI output has been reviewed against authoritative sources — WHO, ICMR–NIN and FSSAI. Where the AI was wrong, we corrected it. Where it was biased, we overrode it. Where it crossed a line, we blocked it.

**Core principle: AI generates. Evidence verifies. Humans decide.**

---

## Pages

| Page | Route | What's on it |
|------|-------|--------------|
| Home | `/` | Hero, Why Nourish, Featured Menu, AI teaser, Sources, Our Promise |
| Menu | `/menu` | 52 items with filters, search, nutrition badges |
| Food Detail | `/menu/:id` | Macros chart, ingredients, food profile, allergens |
| AI Meal Finder | `/meal-finder` | 4-step guided flow, budget slider, results, safety block |
| Food Facts | `/food-facts` | WHO / ICMR–NIN / FSSAI cards + Trust But Verify section |
| Our Approach | `/approach` | Human Override, AI Integrity Log, system architecture |
| About | `/about` | Story, principles, team, timeline, contact |

---

## Menu

**52 items** across 4 categories — all Indian, all student-friendly, all verified.

| Category | Items | Price range |
|----------|-------|-------------|
| Breakfast | 12 | ₹79 – ₹119 |
| Lunch | 15 | ₹119 – ₹179 |
| Snacks | 12 | ₹29 – ₹99 |
| Drinks | 13 | ₹39 – ₹79 |

Every item includes:
- Per-100g nutrition data — calories, protein, fat, carbs
- Protein badge visible on every card without clicking
- Animated macros bar chart on the detail page
- Ingredient list, food profile, allergen note, and evidence-based rationale

---

## AI Meal Finder

A guided 4-step flow:

1. **Meal time** — Breakfast / Lunch / Snack / Drink / Any
2. **Preference** — Vegetarian / Plant Forward / No preference
3. **Priority** — Less sweet / More vegetables / Filling / Light / Budget friendly
4. **Budget** — Slider ₹80–₹250 + optional free text

**Safety layer** — if the free text contains medical keywords (diabetes, disease, diagnosis, etc.) the system blocks the request entirely and redirects to a professional. No menu items are shown. This is deliberately demonstrable during a viva.

**Fallback** — the entire recommendation engine runs locally in the browser if the backend is unreachable. No broken state.

---

## Responsible AI

### What the AI was used for
- Menu brainstorming (20 ideas generated → 8 retained)
- Ingredient descriptions (all reviewed and modified)
- Food profile copy (unsupported health claims removed)

### What we rejected
- "Everyone should avoid carbohydrates" → overgeneralisation, corrected
- "Rajma rice prevents protein deficiency" → unverified claim, reworded
- "Turmeric milk cures inflammation" → unsupported, removed
- "Menu suitable for type 2 diabetes" → medical claim, removed entirely
- Western menu (avocado, quinoa, acai) → replaced with poha, rajma, chana, curd

### Safety rules enforced in code
```
DO NOT: diagnose · treat · prescribe · cure · claim disease prevention
DO NOT: invent menu items · invent nutritional values · give personalised medical advice
```

Full log on the [Our Approach](https://cafe-nourish.vercel.app/approach) page.

---

## Tech stack

| Layer | Tech |
|-------|------|
| Frontend | React 19 · Vite 8 · Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Routing | React Router v7 |
| Backend | FastAPI · Pydantic · Python |
| Deployment | Vercel (frontend) |

---

## Running locally

### Frontend

```bash
npm install
npm run dev
# → http://localhost:5173
```

### Backend (optional)

The frontend works fully without the backend — local recommendation logic is built in.

```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
# → http://localhost:8000/docs
```

---

## Project structure

```
cafe/
├── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         Sticky, scroll-aware, mobile hamburger
│   │   ├── Footer.jsx         Dark green footer with links
│   │   ├── FoodCard.jsx       Card with protein badge + macro strip
│   │   ├── AIAssistant.jsx    Floating chat — safety filter built in
│   │   └── Button.jsx         Variant-based button component
│   ├── data/
│   │   └── menu.js            52 items with nutrition data
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx           Sticky filters + search + grouped cards
│   │   ├── FoodDetail.jsx     Animated macros chart
│   │   ├── MealFinder.jsx     4-step guided AI flow + safety block
│   │   ├── FoodFacts.jsx      Evidence cards + Trust But Verify
│   │   ├── Approach.jsx       Human override + AI Integrity Log
│   │   └── About.jsx
│   ├── services/
│   │   ├── api.js             Fetch backend with 5s timeout + fallback
│   │   └── localRecommend.js  Local mirror of Python safety + filter logic
│   ├── App.jsx
│   └── index.css              Tailwind v4 · Playfair Display + Inter
├── backend/
│   ├── main.py                FastAPI app + CORS
│   ├── routes/ai.py           GET /api/menu · GET /api/menu/{id} · POST /api/recommend
│   ├── models/menu.py         Pydantic models + full 52-item database + Nutrition model
│   └── services/ai_service.py Safety gate · filter logic · ranking · fallback
└── README.md
```

---

## Evidence sources

| Source | What we used it for | Link |
|--------|---------------------|------|
| WHO — Healthy Diet | Free sugar limits, variety, minimally processed foods | [who.int](https://www.who.int/news-room/fact-sheets/detail/healthy-diet) |
| ICMR–NIN — Dietary Guidelines for Indians | Pulse recommendations, dairy, seasonal vegetables, nuts/seeds | [nin.res.in](https://www.nin.res.in/downloads/DietaryGuidelinesforNINwebsite.pdf) |
| FSSAI — Eat Right India | Informed food choices, food safety, ingredient transparency | [eatrightindia.gov.in](https://eatrightindia.gov.in/) |

---

## Design system

| Token | Value |
|-------|-------|
| Background | `#F8F6F1` |
| Primary dark | `#24352A` |
| Sage | `#8FA58C` |
| Cream | `#EFE9DD` |
| Accent | `#C87941` |
| Heading font | Playfair Display |
| Body font | Inter |

---

*General wellness information only. Not medical or dietary advice.*  
*© 2026 Café Nourish — A student AI project.*
