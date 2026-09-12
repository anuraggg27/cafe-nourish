import { useState } from 'react';

export default function FoodCard({ item, onOpenModal }) {
  const [imgError, setImgError] = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop';

  return (
    <div
      onClick={() => onOpenModal && onOpenModal(item)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer
        hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
    >
      {/* image */}
      <div className="relative h-52 overflow-hidden bg-[#EDE6D8]">
        <img
          src={imgError ? fallback : item.image}
          alt={item.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* category */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm
          text-[#26382C] text-xs font-medium px-2.5 py-1 rounded-full">
          {item.category}
        </span>
        {/* protein badge — always visible */}
        {item.nutrition && (
          <span className="absolute top-3 right-3 bg-[#26382C]/90 backdrop-blur-sm
            text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            💪 {item.nutrition.protein}g
          </span>
        )}
      </div>

      {/* content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-[#26302A] text-base mb-1 leading-snug">{item.name}</h3>
        <p className="text-[#707870] text-sm mb-3 leading-relaxed flex-1">{item.shortDesc}</p>

        {/* macro strip */}
        {item.nutrition && (
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-xs text-[#707870]">🔥 {item.nutrition.calories} kcal</span>
            <span className="w-px h-3 bg-[#EDE6D8]" />
            <span className="text-xs text-[#707870]">🌾 {item.nutrition.carbs}g</span>
            <span className="w-px h-3 bg-[#EDE6D8]" />
            <span className="text-xs text-[#707870]">🥑 {item.nutrition.fat}g fat</span>
          </div>
        )}

        {/* label tag */}
        <span className={`tag ${item.labelStyle} mb-4 self-start`}>
          {item.label === 'Plant Forward' && '🌱 '}
          {item.label === 'Fresh'         && '🍃 '}
          {item.label === 'Nourish'       && '✦ '}
          {item.label}
        </span>

        {/* price + view */}
        <div className="flex items-center justify-between">
          <span className="text-[#26382C] font-semibold text-base">₹{item.price}</span>
          <span className="text-sm text-[#C77A45] font-medium group-hover:underline transition-all">
            View →
          </span>
        </div>
      </div>
    </div>
  );
}
