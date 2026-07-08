import { useState, useCallback } from 'react'
import PlacesAutocomplete from './PlacesAutocomplete'
import { CATEGORIES } from '../utils/constants'
import { useDebounce } from '../hooks/useDebounce'
import { useEffect } from 'react'

/**
 * SearchBar — Combined search interface with text, category, and location filters.
 */
export default function SearchBar({ onSearch, loading = false }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState(null)

  const debouncedQuery = useDebounce(query, 300)

  // Trigger search when debounced query or filters change
  useEffect(() => {
    onSearch({ query: debouncedQuery, category, location })
  }, [debouncedQuery, category, location, onSearch])

  const handlePlaceSelect = useCallback((placeData) => {
    if (placeData.latitude && placeData.longitude) {
      setLocation(placeData)
    }
  }, [])

  function clearLocation() {
    setLocation(null)
  }

  function clearAll() {
    setQuery('')
    setCategory('')
    setLocation(null)
  }

  const hasFilters = query || category || location

  return (
    <div className="space-y-4">
      {/* Search Grid — Desktop: 4 items row, Tablet/Mobile: vertical stack */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[16px] items-center">
        
        {/* Text Search Name — md:col-span-4 */}
        <div className="md:col-span-4 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="search-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by shop name..."
            style={{ paddingLeft: '48px' }}
            className="w-full h-[52px] pr-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {/* Category Filter dropdown — md:col-span-3 */}
        <div className="md:col-span-3 relative">
          <select
            id="search-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-[52px] px-4 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer pr-10"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Location Search autocomplete — md:col-span-3 */}
        <div className="md:col-span-3">
          {location ? (
            <div className="flex items-center gap-2 px-4 h-[52px] bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-blue-400 truncate flex-1 font-medium">
                {location.address}
              </span>
              <button
                onClick={clearLocation}
                className="p-1 hover:bg-blue-900/30 rounded-lg transition-colors cursor-pointer"
                aria-label="Clear location"
              >
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <PlacesAutocomplete
              onPlaceSelect={handlePlaceSelect}
              placeholder="Search by location..."
            />
          )}
        </div>

        {/* Search Submit/Indicator Button — md:col-span-2 */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] px-6 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            Search
          </button>
        </div>

      </div>

      {/* Active Filters & Clear */}
      {hasFilters && (
        <div className="flex items-center flex-wrap gap-2 animate-slide-down pt-2">
          <span className="text-xs font-medium text-slate-500 mr-1">Active filters:</span>
          {query && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium">
              &quot;{query}&quot;
              <button onClick={() => setQuery('')} className="hover:text-red-500 transition-colors cursor-pointer" aria-label="Clear search query">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          {category && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-medium">
              {CATEGORIES.find(c => c.value === category)?.label}
              <button onClick={() => setCategory('')} className="hover:text-red-500 transition-colors cursor-pointer" aria-label="Clear category filter">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium">
              📍 Near location
              <button onClick={clearLocation} className="hover:text-red-500 transition-colors cursor-pointer" aria-label="Clear location filter">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 cursor-pointer ml-auto"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
