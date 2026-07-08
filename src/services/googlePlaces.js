/**
 * Google Places API service helpers.
 * Uses the New Places API (v1) with PlaceAutocompleteElement.
 */

let mapsLoaded = false
let mapsLoadPromise = null

/**
 * Dynamically load the Google Maps JavaScript API.
 * @returns {Promise<void>}
 */
export function loadGoogleMapsAPI() {
  if (mapsLoaded) return Promise.resolve()
  if (mapsLoadPromise) return mapsLoadPromise

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    console.error('Missing VITE_GOOGLE_MAPS_API_KEY environment variable')
    return Promise.reject(new Error('Google Maps API key not configured'))
  }

  mapsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => {
      mapsLoaded = true
      resolve()
    }
    script.onerror = () => {
      mapsLoadPromise = null
      reject(new Error('Failed to load Google Maps API'))
    }
    document.head.appendChild(script)
  })

  return mapsLoadPromise
}

/**
 * Extract structured place data from a PlaceAutocompleteElement selection event.
 * @param {object} place - The Place object from gmp-select event
 * @returns {object} Structured place data
 */
export function extractPlaceData(place) {
  const location = place.location
  return {
    address: place.formattedAddress || place.displayName || '',
    latitude: location ? location.lat() : null,
    longitude: location ? location.lng() : null,
    place_id: place.id || '',
  }
}

/**
 * Calculate distance between two coordinates using the Haversine formula.
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg) {
  return deg * (Math.PI / 180)
}
