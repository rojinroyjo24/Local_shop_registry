import { useCallback, useEffect } from 'react'
import { useSearchShops } from '../hooks/useShops'
import SearchBar from '../components/SearchBar'
import ShopCard from '../components/ShopCard'
import Loader from '../components/Loader'

/**
 * SearchShop — Search and filter shops by name, category, and location.
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
    <div className="min-h-[calc(100vh-4rem)] gradient-mesh flex flex-col items-center justify-start w-full">
      {/* Centered page container, max-width 1400px, w-full, pt-9, pb-12, px-8 */}
      <div className="w-full max-w-[1400px] px-8 pt-9 pb-12">
        
        {/* Header — Centered, side-by-side row layout, 64x64 icon */}
        <div className="flex items-center gap-5 mb-8 animate-fade-in text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white flex-shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-[42px] font-bold text-slate-900 dark:text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Search Shops
            </h1>
            <p className="text-[16px] text-slate-500 dark:text-slate-400 mt-1">
              Find shops by name, category or location
            </p>
          </div>
        </div>

        {/* Search Bar Wrapper — glass layout */}
        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 mb-8 animate-slide-up">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {loading ? (
            <Loader text="Searching shops..." />
          ) : error ? (
            <div className="text-center py-16 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Something went wrong
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
              <button
                onClick={() => searchShops()}
                className="px-5 py-2.5 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 dark:text-primary-400 rounded-xl transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-20 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
                <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                No shops found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Try adjusting your search criteria or clearing the filters to see all shops.
              </p>
            </div>
          ) : (
            <>
              {/* Results count header */}
              <div className="flex items-center justify-between mt-8 mb-5">
                <p className="text-[15px] font-semibold text-slate-700">
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

              {/* Results grid — gap 24px, 3 col desktop, 2 col tablet, 1 col mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
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
