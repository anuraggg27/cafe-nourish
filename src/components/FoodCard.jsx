import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FoodCard({ item }) {
  const [imgError, setImgError] = useState(false);
  const fallback = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#EFE9DD]">
        <img
          src={imgError ? fallback : item.image}
          alt={item.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#24352A] text-xs font-medium px-2.5 py-1 rounded-full">
          {item.category}
        </span>
        {/* Protein badge — always visible on the image */}
        {item.nutrition && (
          <span className="absolute top-3 right-3 bg-[#24352A]/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            💪 {item.nutrition.protein}g protein
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-[#263029] text-base mb-1 leading-snug">
          {item.name}
        </h3>
        <p className="text-[#6F776F] text-sm mb-3 leading-relaxed flex-1">
          {item.shortDesc}
        </p>

        {/* Macro strip — calories + fat inline, subtle */}
        {item.nutrition && (
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-[#6F776F]">🔥 {item.nutrition.calories} kcal</span>
            <span className="w-px h-3 bg-[#EFE9DD]" />
            <span className="text-xs text-[#6F776F]">🥑 {item.nutrition.fat}g fat</span>
            <span className="w-px h-3 bg-[#EFE9DD]" />
            <span className="text-xs text-[#6F776F]">🌾 {item.nutrition.carbs}g carbs</span>
          </div>
        )}

        {/* Label tag */}
        <span className={`tag ${item.labelStyle} mb-4 self-start`}>
          {item.label === 'Plant Forward' && '🌱 '}
          {item.label === 'Fresh' && '🍃 '}
          {item.label === 'Nourish' && '✦ '}
          {item.label}
        </span>

        {/* Price + link */}
        <div className="flex items-center justify-between">
          <span className="text-[#24352A] font-semibold text-base">₹{item.price}</span>
          <Link
            to={`/menu/${item.id}`}
            className="flex items-center gap-1 text-sm text-[#C87941] font-medium hover:gap-2 transition-all duration-150"
          >
            Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
