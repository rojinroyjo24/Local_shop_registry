import { getCategoryConfig } from '../utils/constants'

/**
 * ShopCard — Displays shop information in a modern card with category badge.
 */
export default function ShopCard({ shop, showDistance = false }) {
  const category = getCategoryConfig(shop.category)
  const createdDate = new Date(shop.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div
      id={`shop-card-${shop.id}`}
      className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 overflow-hidden will-change-transform"
    >
      {/* Top Row — Title and Category Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors duration-200" style={{ fontFamily: 'var(--font-display)' }}>
            {shop.shop_name}
          </h3>
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold whitespace-nowrap ${category.color} transition-transform duration-200 group-hover:scale-105 shadow-sm text-[11px] uppercase tracking-wider`}>
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </span>
      </div>

      {/* Middle Row — Description */}
      <div className="my-2 flex-1 min-w-0">
        {shop.description ? (
          <p className="text-[13px] text-slate-500 line-clamp-1 leading-normal">
            {shop.description}
          </p>
        ) : (
          <p className="text-[13px] text-slate-400 italic">
            No description provided.
          </p>
        )}
      </div>

      {/* Bottom Row — Location, Date & Directions Button */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-[13px] text-slate-500">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex items-center gap-1 min-w-0 max-w-[65%]">
            <span className="truncate">📍 {shop.address}</span>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap text-slate-400 text-[12px]">
            <span>📅 {createdDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {showDistance && shop.distance !== undefined && (
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
              {shop.distance < 1
                ? `${Math.round(shop.distance * 1000)}m`
                : `${shop.distance.toFixed(1)}km`
              }
            </span>
          )}
          
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all"
          >
            Directions
          </a>
        </div>
      </div>
    </div>
  )
}
