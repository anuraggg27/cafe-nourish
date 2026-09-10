"""
Pydantic models and the in-memory menu database for Café Nourish.
All AI recommendations are restricted to items in MENU_ITEMS.
"""
from pydantic import BaseModel
from typing import List, Optional


class MenuItem(BaseModel):
    id: str
    name: str
    category: str          # Breakfast | Lunch | Snacks | Drinks
    tags: List[str]
    label: str
    price: int
    description: str
    short_desc: str
    ingredients: List[str]
    profile: List[str]
    why_on_menu: str
    allergens: str
    image: str


class RecommendRequest(BaseModel):
    meal_time: Optional[str] = None     # breakfast | lunch | snack | drink | any
    preference: Optional[str] = None    # vegetarian | plant-forward | any
    priority: Optional[str] = None      # less-sweet | more-vegetables | filling | light | budget-friendly | any
    budget: int = 250
    free_text: Optional[str] = None


class RecommendResponse(BaseModel):
    type: str           # normal | relaxed | safety
    items: List[MenuItem]
    disclaimer: str = (
        "These suggestions are based on the preferences you provided and are limited "
        "to items on the Café Nourish menu. They are general food-choice suggestions "
        "only and are not medical or dietary advice. For personalised dietary guidance, "
        "consult a qualified professional."
    )


# ─── In-memory menu database ─────────────────────────────────────────────────
MENU_ITEMS: List[MenuItem] = [
    # BREAKFAST
    MenuItem(
        id="b1", name="Poha Bowl", category="Breakfast",
        tags=["vegetarian", "light", "plant-forward"],
        label="Plant Forward", price=79,
        description="Flattened rice with mustard seeds, turmeric, onion and fresh coriander.",
        short_desc="Poha · Vegetables · Herbs",
        ingredients=["Flattened rice (poha)", "Onion", "Green chilli", "Mustard seeds", "Turmeric", "Curry leaves", "Fresh coriander", "Lemon", "Salt"],
        profile=["🌱 Plant Forward", "🌾 Grain-based", "🥕 Contains vegetables"],
        why_on_menu="A familiar, affordable breakfast staple. Light, easy to digest and made with minimally processed ingredients.",
        allergens="Contains mustard. Please check with café staff for cross-contact details.",
        image="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="b2", name="Moong Chilla", category="Breakfast",
        tags=["vegetarian", "protein", "plant-forward", "filling"],
        label="Nourish", price=99,
        description="Savoury lentil pancakes made from soaked moong dal, served with mint chutney.",
        short_desc="Moong dal · Herbs · Mint chutney",
        ingredients=["Yellow moong dal", "Ginger", "Green chilli", "Cumin", "Coriander", "Salt", "Mint chutney"],
        profile=["🌱 Plant Forward", "💪 Pulse-based protein", "🥬 Contains legumes"],
        why_on_menu="Pulses like moong dal are highlighted in ICMR-NIN dietary guidelines as an important protein source for vegetarian diets.",
        allergens="Please check with café staff regarding cross-contact and specific ingredients.",
        image="https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="b3", name="Curd & Fruit Bowl", category="Breakfast",
        tags=["vegetarian", "fresh", "light", "less-sweet"],
        label="Fresh", price=119,
        description="Plain curd with seasonal fruit, a drizzle of honey and a sprinkle of seeds.",
        short_desc="Curd · Seasonal fruit · Seeds",
        ingredients=["Plain curd (dahi)", "Seasonal fruit", "Flaxseeds", "Chia seeds", "Honey (optional)"],
        profile=["🍓 Contains fruit", "🥛 Dairy-based", "🌱 Plant Forward"],
        why_on_menu="Curd and fruit together provide variety across food groups — aligned with ICMR-NIN guidance on diverse daily food intake.",
        allergens="Contains dairy. Seeds may be present. Please check with café staff.",
        image="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="b4", name="Banana Peanut Toast", category="Breakfast",
        tags=["vegetarian", "filling", "budget-friendly"],
        label="Nourish", price=89,
        description="Wholegrain toast with natural peanut butter, sliced banana and a pinch of cinnamon.",
        short_desc="Wholegrain bread · Peanut butter · Banana",
        ingredients=["Wholegrain bread", "Natural peanut butter", "Banana", "Cinnamon"],
        profile=["🌾 Grain-based", "🍌 Contains fruit", "🥜 Contains nuts"],
        why_on_menu="Combines whole grains, natural nut butter and fruit — a practical combination providing variety without added complexity.",
        allergens="Contains gluten, peanuts. Please check with café staff.",
        image="https://images.unsplash.com/photo-1484723091739-30990604718b?w=600&auto=format&fit=crop",
    ),
    # LUNCH
    MenuItem(
        id="l1", name="Rajma Rice Bowl", category="Lunch",
        tags=["vegetarian", "plant-forward", "filling", "budget-friendly"],
        label="Plant Forward", price=149,
        description="Red kidney beans slow-simmered in a tomato-onion gravy, served with steamed rice and seasonal vegetables.",
        short_desc="Rajma · Rice · Seasonal vegetables",
        ingredients=["Rajma (kidney beans)", "Basmati rice", "Tomato", "Onion", "Ginger-garlic", "Cumin", "Coriander powder", "Garam masala", "Seasonal vegetables", "Fresh coriander"],
        profile=["🌱 Plant Forward", "💪 Pulse-based protein", "🌾 Grain-based", "🥕 Contains vegetables"],
        why_on_menu="A combination of pulses and grains providing complementary plant proteins. Familiar, affordable and filling — designed with students in mind.",
        allergens="Please check with café staff regarding cross-contact and specific ingredients.",
        image="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="l2", name="Paneer Grain Bowl", category="Lunch",
        tags=["vegetarian", "protein", "filling", "more-vegetables"],
        label="Nourish", price=179,
        description="Grilled paneer cubes over a bed of whole grain, roasted vegetables and herb dressing.",
        short_desc="Paneer · Whole grain · Vegetables",
        ingredients=["Paneer", "Whole grain (millet/wheat)", "Bell pepper", "Zucchini", "Cherry tomato", "Olive oil", "Cumin", "Lemon dressing", "Fresh herbs"],
        profile=["💪 Dairy protein", "🌾 Grain-based", "🥕 Contains vegetables"],
        why_on_menu="Paneer is a practical protein source for vegetarians. Paired with whole grains and vegetables for variety across food groups.",
        allergens="Contains dairy, gluten. Please check with café staff.",
        image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="l3", name="Chana Masala Plate", category="Lunch",
        tags=["vegetarian", "plant-forward", "filling", "budget-friendly", "more-vegetables"],
        label="Plant Forward", price=139,
        description="Spiced chickpeas with a tangy tamarind base, served with two rotis and sliced onion.",
        short_desc="Chickpeas · Roti · Spices",
        ingredients=["Chickpeas (chana)", "Tomato", "Onion", "Tamarind", "Cumin", "Coriander", "Amchur", "Garam masala", "Whole wheat roti"],
        profile=["🌱 Plant Forward", "💪 Pulse-based protein", "🌾 Grain-based"],
        why_on_menu="Chickpeas are among the legumes recommended by ICMR-NIN. A budget-friendly lunch option with pulses and whole grain bread.",
        allergens="Contains gluten (roti). Please check with café staff.",
        image="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="l4", name="Dal Tadka & Rice", category="Lunch",
        tags=["vegetarian", "plant-forward", "filling", "budget-friendly", "light"],
        label="Plant Forward", price=129,
        description="Yellow toor dal tempered with ghee, cumin and dried red chilli, served with steamed rice.",
        short_desc="Toor dal · Steamed rice · Ghee tadka",
        ingredients=["Toor dal", "Tomato", "Onion", "Turmeric", "Cumin seeds", "Dried red chilli", "Ghee", "Steamed rice", "Fresh coriander"],
        profile=["🌱 Plant Forward", "💪 Pulse-based protein", "🌾 Grain-based"],
        why_on_menu="Dal-rice is one of the most nutritionally complete everyday combinations from traditional Indian diets — pulses plus grains.",
        allergens="Contains ghee (dairy). Please check with café staff.",
        image="https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="l5", name="Vegetable Khichdi", category="Lunch",
        tags=["vegetarian", "plant-forward", "light", "less-sweet", "budget-friendly"],
        label="Plant Forward", price=119,
        description="Soft-cooked rice and moong dal with seasonal vegetables, finished with a cumin-ghee tadka.",
        short_desc="Rice · Moong dal · Seasonal vegetables",
        ingredients=["Rice", "Yellow moong dal", "Seasonal vegetables", "Turmeric", "Cumin", "Ginger", "Ghee", "Salt"],
        profile=["🌱 Plant Forward", "🥕 Contains vegetables", "💪 Pulse-based protein"],
        why_on_menu="A gentle, easy-to-digest dish combining grains and pulses. Particularly suitable when students prefer something light.",
        allergens="Contains ghee (dairy). Please check with café staff.",
        image="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop",
    ),
    # SNACKS
    MenuItem(
        id="s1", name="Sprout Chaat", category="Snacks",
        tags=["vegetarian", "plant-forward", "light", "fresh", "budget-friendly"],
        label="Fresh", price=79,
        description="Mixed sprouted legumes with diced tomato, cucumber, lemon and chaat masala.",
        short_desc="Sprouted legumes · Vegetables · Chaat masala",
        ingredients=["Mixed sprouts (moong, chana)", "Tomato", "Cucumber", "Onion", "Lemon juice", "Chaat masala", "Fresh coriander"],
        profile=["🌱 Plant Forward", "🥕 Contains vegetables", "💪 Sprouted protein"],
        why_on_menu="Sprouts are a simple, affordable way to include legumes. Aligned with FSSAI Eat Right India guidance on increasing pulse consumption.",
        allergens="Please check with café staff regarding cross-contact and specific ingredients.",
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="s2", name="Roasted Makhana", category="Snacks",
        tags=["vegetarian", "light", "less-sweet", "plant-forward", "budget-friendly"],
        label="Plant Forward", price=59,
        description="Fox nuts lightly roasted with rock salt, pepper and a touch of ghee.",
        short_desc="Fox nuts · Rock salt · Pepper",
        ingredients=["Fox nuts (makhana)", "Ghee", "Rock salt", "Black pepper", "Cumin powder"],
        profile=["🌱 Plant Forward", "🌾 Minimally processed"],
        why_on_menu="Makhana is a minimally processed snack option — in line with WHO guidance on choosing less processed foods where possible.",
        allergens="Contains ghee (dairy). Please check with café staff.",
        image="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="s3", name="Banana & Nut Butter", category="Snacks",
        tags=["vegetarian", "filling", "budget-friendly", "plant-forward"],
        label="Nourish", price=69,
        description="A whole banana served with a small pot of natural peanut butter for dipping.",
        short_desc="Banana · Natural peanut butter",
        ingredients=["Banana", "Natural peanut butter"],
        profile=["🍌 Contains fruit", "🥜 Contains nuts"],
        why_on_menu="Fruit and nut combinations are highlighted in ICMR-NIN guidelines as a practical everyday snack option.",
        allergens="Contains peanuts. Please check with café staff.",
        image="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="s4", name="Seasonal Fruit Plate", category="Snacks",
        tags=["vegetarian", "fresh", "light", "less-sweet", "plant-forward", "budget-friendly"],
        label="Fresh", price=89,
        description="A plate of mixed seasonal fruits — whatever is fresh and available today.",
        short_desc="Mixed seasonal fruit",
        ingredients=["Seasonal fruit (changes daily)", "Lemon (optional)", "Chaat masala (optional)"],
        profile=["🍓 Contains fruit", "🌱 Plant Forward", "🌿 Minimally processed"],
        why_on_menu="Daily fruit intake is recommended across WHO, ICMR-NIN and FSSAI guidance. Seasonal availability keeps it affordable and fresh.",
        allergens="Please check with café staff for today's specific fruits and any cross-contact risks.",
        image="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop",
    ),
    # DRINKS
    MenuItem(
        id="d1", name="Unsweetened Masala Tea", category="Drinks",
        tags=["vegetarian", "light", "less-sweet", "budget-friendly"],
        label="Fresh", price=39,
        description="A small cup of chai made with ginger, cardamom and minimal milk — no added sugar.",
        short_desc="Tea · Ginger · Cardamom · No sugar",
        ingredients=["Black tea", "Ginger", "Cardamom", "Cinnamon", "Low-fat milk", "No added sugar"],
        profile=["☕ Warm beverage", "🚫 No added sugar"],
        why_on_menu="Offered without added sugar in line with WHO guidance on limiting free sugars in everyday beverages.",
        allergens="Contains dairy. Please check with café staff.",
        image="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="d2", name="Nimbu Pani", category="Drinks",
        tags=["vegetarian", "fresh", "light", "less-sweet", "budget-friendly", "plant-forward"],
        label="Fresh", price=39,
        description="Fresh lime water with a pinch of rock salt and cumin powder. Lightly sweetened on request.",
        short_desc="Lime · Rock salt · Cumin",
        ingredients=["Fresh lime juice", "Water", "Rock salt", "Cumin powder", "Sugar (optional, minimal)"],
        profile=["🍋 Contains citrus", "🚫 Minimal added sugar", "🌱 Plant Forward"],
        why_on_menu="A simple, hydrating drink with minimal ingredients. Sugar is optional and minimised — consistent with WHO free-sugar guidelines.",
        allergens="Please check with café staff regarding cross-contact and specific ingredients.",
        image="https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="d3", name="Lassi (Plain)", category="Drinks",
        tags=["vegetarian", "filling", "less-sweet", "protein"],
        label="Nourish", price=59,
        description="Chilled churned curd with a pinch of rock salt. Available plain or lightly sweetened.",
        short_desc="Curd · Rock salt · Optional sugar",
        ingredients=["Plain curd (dahi)", "Cold water", "Rock salt", "Sugar (optional, minimal)", "Cumin powder (optional)"],
        profile=["🥛 Dairy-based", "💪 Contains protein", "🌿 Minimally processed"],
        why_on_menu="Curd is highlighted as an important daily food group in ICMR-NIN guidelines. Lassi is a practical, familiar way to include it.",
        allergens="Contains dairy. Please check with café staff.",
        image="https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="d4", name="Cold Brew Coffee", category="Drinks",
        tags=["vegetarian", "light", "less-sweet", "budget-friendly"],
        label="Fresh", price=79,
        description="Slow-steeped black coffee served over ice. No added sugar, milk available on request.",
        short_desc="Cold brew coffee · No added sugar",
        ingredients=["Cold brew concentrate", "Water", "Ice", "Milk (optional)"],
        profile=["☕ Cold beverage", "🚫 No added sugar"],
        why_on_menu="Offered without added sugar. Milk is optional — keeping this a low free-sugar option consistent with WHO guidance.",
        allergens="Dairy-free by default. Contains coffee/caffeine. Please check with café staff.",
        image="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop",
    ),
    MenuItem(
        id="d5", name="Turmeric Milk", category="Drinks",
        tags=["vegetarian", "warm", "less-sweet", "filling"],
        label="Nourish", price=69,
        description="Warm milk with turmeric, black pepper and a touch of honey. No refined sugar.",
        short_desc="Milk · Turmeric · Honey",
        ingredients=["Full-fat milk", "Turmeric", "Black pepper", "Honey", "Cardamom (optional)"],
        profile=["🥛 Dairy-based", "🌿 Minimally processed", "🚫 No refined sugar"],
        why_on_menu="A warm milk-based drink without refined sugar. Turmeric and pepper are traditional additions with a long history in Indian food culture.",
        allergens="Contains dairy, honey. Please check with café staff.",
        image="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop",
    ),
]
