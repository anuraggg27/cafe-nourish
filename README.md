# Café Nourish 🌿

> Good food. Better choices.

A modern café website built for an AI project — demonstrating how AI can assist food choices without replacing human judgment.

---

## Running the project

### Frontend (React + Vite)

```bash
cd d:/UniRocks/cafe
npm install
npm run dev
```

Opens at **http://localhost:5173**

---

### Backend (FastAPI) — optional

The frontend works fully without the backend (local fallback is built in).  
To run the backend for the full AI recommendation API:

```bash
# From d:/UniRocks/cafe
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

API docs at **http://localhost:8000/docs**

---

## Project structure

```
cafe/
├── index.html
├── src/
│   ├── components/      Navbar, Footer, FoodCard, AIAssistant, Button
│   ├── data/            menu.js — the full menu database
│   ├── pages/           Home, Menu, FoodDetail, MealFinder, FoodFacts, Approach, About
│   ├── services/        api.js (fetch + fallback), localRecommend.js
│   ├── App.jsx          Router + Layout
│   └── index.css        Tailwind v4 + custom palette + typography
├── backend/
│   ├── main.py          FastAPI app + CORS
│   ├── routes/ai.py     GET /api/menu, POST /api/recommend
│   ├── models/menu.py   Pydantic models + menu database
│   └── services/        ai_service.py — safety gate + recommendation logic
└── README.md
```

---

## Tech stack

| Layer     | Tech                                |
|-----------|-------------------------------------|
| Frontend  | React 19 · Vite 8 · Tailwind v4     |
| Animation | Framer Motion                       |
| Icons     | Lucide React                        |
| Routing   | React Router v7                     |
| Backend   | FastAPI · Pydantic · Python         |

---

## Key design decisions

- **AI generates. Evidence verifies. Humans decide.** — every menu item and food claim was checked against WHO, ICMR–NIN and FSSAI.
- **Safety first** — medical queries are blocked at the AI layer before any recommendation is generated.
- **No invented items** — the recommendation system only returns items that exist in the menu database.
- **Fallback architecture** — the frontend works fully offline with local recommendation logic if the backend is unavailable.
- **Indian student menu** — AI suggested Western premium ingredients; we overrode it with affordable, familiar Indian options.

---

## Sources

| Source | Link |
|--------|------|
| WHO Healthy Diet | https://www.who.int/news-room/fact-sheets/detail/healthy-diet |
| ICMR–NIN Dietary Guidelines | https://www.nin.res.in/downloads/DietaryGuidelinesforNINwebsite.pdf |
| FSSAI Eat Right India | https://eatrightindia.gov.in/ |

---

*General wellness information only. Not medical or dietary advice.*  
*© 2026 Café Nourish — A student AI project.*
