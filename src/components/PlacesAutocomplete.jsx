import { useEffect, useRef, useState } from 'react'
import { loadGoogleMapsAPI } from '../services/googlePlaces'

/**
 * PlacesAutocomplete — Uses the classic google.maps.places.Autocomplete widget.
 * Falls back to a manual text input if the API fails to load OR if the user
 * opts to enter the address manually (useful if Google billing/API configuration is incomplete).
 */
export default function PlacesAutocomplete({ onPlaceSelect, placeholder = 'Search for a location...', disabled = false }) {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isManual, setIsManual] = useState(false)
  const [manualAddress, setManualAddress] = useState('')

  useEffect(() => {
    if (isManual) return // Don't initialize autocomplete if in manual mode

    let mounted = true

    async function init() {
      try {
        await loadGoogleMapsAPI()
        if (!mounted || !inputRef.current) return

        // Check if google.maps.places is available
        if (!window.google?.maps?.places) {
          throw new Error('Google Places library not loaded')
        }

        // Create the classic Autocomplete widget
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          fields: ['formatted_address', 'geometry', 'name', 'place_id'],
          types: ['establishment', 'geocode'],
        })

        // Listen for place selection
        autocomplete.addListener('place_changed', () => {
          if (!mounted) return
          const place = autocomplete.getPlace()

          if (place && place.geometry) {
            onPlaceSelect?.({
              address: place.formatted_address || place.name || '',
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              place_id: place.place_id || '',
            })
          }
        })

        autocompleteRef.current = autocomplete
        setLoaded(true)
      } catch (err) {
        console.error('Failed to load Places API:', err)
        if (mounted) setLoadError(true)
      }
    }

    init()

    return () => {
      mounted = false
      // Clean up the autocomplete widget
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
      autocompleteRef.current = null
    }
  }, [onPlaceSelect, isManual])

  const handleManualChange = (e) => {
    const val = e.target.value
    setManualAddress(val)
    onPlaceSelect?.({
      address: val,
      latitude: 0, // Fallback coordinate for manual entries
      longitude: 0, // Fallback coordinate for manual entries
      place_id: `manual_${Date.now()}`, // Generated unique place ID for manual entries
    })
  }

  // If there's a load error or user toggled to manual mode
  if (loadError || isManual) {
    return (
      <div className="space-y-3 animate-scale-in">
        {loadError && (
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
            <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-xs font-semibold text-amber-700">
              Google Places API unavailable. Manual mode enabled.
            </span>
          </div>
        )}
        
        <div className="relative">
          <input
            type="text"
            value={manualAddress}
            onChange={handleManualChange}
            placeholder="Type the address manually..."
            disabled={disabled}
            style={{ paddingLeft: '16px', paddingRight: '140px' }}
            className="w-full h-[52px] rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all duration-200"
          />
          {!loadError && (
            <button
              type="button"
              onClick={() => { setIsManual(false); setManualAddress(''); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              Use Map Search
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          disabled={disabled || !loaded}
          style={{ paddingLeft: '48px', paddingRight: '140px' }}
          className={`w-full h-[52px] rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <button
          type="button"
          onClick={() => setIsManual(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
        >
          Enter Manually
        </button>
      </div>
    </div>
  )
}
