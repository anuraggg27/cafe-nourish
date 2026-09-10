"""
Café Nourish — FastAPI backend
Run: uvicorn backend.main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.ai import router

app = FastAPI(
    title="Café Nourish API",
    description="Backend for the Café Nourish AI Meal Finder. Provides menu data and AI-assisted meal recommendations.",
    version="1.0.0",
)

# Allow requests from the Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "service": "Café Nourish API",
        "status": "running",
        "docs": "/docs",
        "endpoints": ["/api/menu", "/api/menu/{id}", "/api/recommend"],
    }
