import { useCallback, useEffect } from 'react'
import { useSearchShops } from '../hooks/useShops'
import SearchBar from '../components/SearchBar'
import ShopCard from '../components/ShopCard'
import Loader from '../components/Loader'

/**
 * SearchShop — Search and filter shops by name, category, and location.
 * UI redesign: compact header, modern filter bar, 1320px container.
 */
export default function SearchShop() {
  const { results, loading, error, searchShops } = useSearchShops()

  // Initial load — fetch all shops
  useEffect(() => {
    searchShops()
  }, [searchShops])

  const handleSearch = useCallback((filters) => {
    searchShops(filters)
  }, [searchShops])

  const hasLocation = false // will be true if user selects a location in SearchBar

  return (
    /* UI CHANGE: consistent gradient-mesh bg */
    <div className="min-h-[calc(100vh-4rem)] gradient-mesh flex flex-col items-center justify-start w-full">
      {/* UI CHANGE: 1320px container, consistent padding */}
      <div className="w-full max-w-[1320px] px-8 pt-8 pb-12">
        
        {/* Header — UI CHANGE: compact, 24px title, no oversized icon */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Search Shops
          </h1>
          <p className="text-[14px] text-slate-500 mt-1">
            Find shops by name, category or location
          </p>
        </div>

        {/* Search Bar — UI CHANGE: white card wrapper, 16px radius */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6 animate-slide-up">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {loading ? (
            <Loader text="Searching shops..." />
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 mb-4">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Something went wrong
              </h3>
              <p className="text-[14px] text-slate-500 mb-6">{error}</p>
              <button
                onClick={() => searchShops()}
                className="px-5 py-2 text-[13px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-5">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                No shops found
              </h3>
              <p className="text-[14px] text-slate-500 max-w-sm mx-auto leading-relaxed">
                Try adjusting your search criteria or clearing the filters to see all shops.
              </p>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="flex items-center justify-between mt-4 mb-5">
                <p className="text-[14px] font-medium text-slate-600">
                  Found <span className="font-bold text-slate-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg mr-1">{results.length}</span> shop{results.length !== 1 ? 's' : ''}
                </p>
                <div className="relative">
                  <select disabled className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs opacity-60 cursor-not-allowed appearance-none pr-7">
                    <option>Sort By: Default</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Results grid — 3 cols desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.map(shop => (
                  <ShopCard
                    key={shop.id}
                    shop={shop}
                    showDistance={shop.distance !== undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
