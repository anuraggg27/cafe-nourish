"""
AI recommendation route for Café Nourish.

POST /api/recommend  — returns meal recommendations based on user preferences.
GET  /api/menu       — returns the full menu database.
GET  /api/menu/{id}  — returns a single menu item.
"""
from fastapi import APIRouter, HTTPException
from ..models.menu import RecommendRequest, RecommendResponse, MenuItem, MENU_ITEMS
from ..services.ai_service import get_recommendations

router = APIRouter(prefix="/api", tags=["menu", "ai"])


@router.get("/menu", response_model=list[MenuItem])
def get_menu():
    """Return all menu items."""
    return MENU_ITEMS


@router.get("/menu/{item_id}", response_model=MenuItem)
def get_menu_item(item_id: str):
    """Return a single menu item by id."""
    item = next((i for i in MENU_ITEMS if i.id == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item


@router.post("/recommend", response_model=RecommendResponse)
def recommend(req: RecommendRequest):
    """
    Return AI-assisted meal recommendations.

    Safety rules run before any recommendation is generated.
    Only items from the Café Nourish menu database are returned.
    """
    return get_recommendations(req)
