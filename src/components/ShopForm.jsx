import { useState, useCallback } from 'react'
import PlacesAutocomplete from './PlacesAutocomplete'
import { CATEGORIES } from '../utils/constants'
import { validateShopForm } from '../utils/validators'

/**
 * ShopForm — Reusable form for registering/editing a shop.
 */
export default function ShopForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    shop_name: '',
    description: '',
    category: '',
    address: '',
    latitude: null,
    longitude: null,
    place_id: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handlePlaceSelect = useCallback((placeData) => {
    setFormData(prev => ({
      ...prev,
      address: placeData.address,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
      place_id: placeData.place_id,
    }))
    setErrors(prev => ({ ...prev, address: '' }))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const validation = validateShopForm(formData)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }
    onSubmit(formData)
  }

  const descLen = formData.description.length
  const descCountColor = descLen > 450 ? 'text-red-500' : descLen > 350 ? 'text-amber-500' : 'text-slate-400'

  return (
    <form onSubmit={handleSubmit}>
      
      {/* Shop Name — 10px label gap, 24px block gap */}
      <div className="mb-[24px]">
        <label htmlFor="shop_name" className="block text-sm font-medium text-slate-900 dark:text-slate-100 text-left mb-[10px]">
          Shop Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {/* Icon vertically centered */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          {/* Input style: height 52px, rounded-xl, dark background, soft border, blue focus glow, proper left padding */}
          <input
            id="shop_name"
            name="shop_name"
            type="text"
            value={formData.shop_name}
            onChange={handleChange}
            placeholder="Enter shop name"
            disabled={loading}
            style={{ paddingLeft: '48px' }}
            className={`w-full h-[52px] pr-4 rounded-xl border ${
              errors.shop_name
                ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400'
                : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
            } bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
          />
        </div>
        {errors.shop_name && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-xl">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.shop_name}
          </p>
        )}
      </div>

      {/* Description — 10px label gap, 24px block gap */}
      <div className="mb-[24px]">
        <label htmlFor="description" className="block text-sm font-medium text-slate-900 dark:text-slate-100 text-left mb-[10px]">
          Description
        </label>
        <div className="relative">
          {/* Textarea style: height 140px, rounded-xl, proper padding */}
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your shop (optional)"
            disabled={loading}
            style={{ height: '140px' }}
            className={`w-full px-4 py-3.5 rounded-xl border ${
              errors.description
                ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400'
                : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
            } bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
          />
          {/* Character counter aligned bottom-right */}
          <span className={`absolute right-3.5 bottom-3.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 transition-colors ${descCountColor}`}>
            {formData.description.length}/500
          </span>
        </div>
        {errors.description && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-xl">{errors.description}</p>
        )}
      </div>

      {/* Category — 10px label gap, 24px block gap */}
      <div className="mb-[24px]">
        <label htmlFor="category" className="block text-sm font-medium text-slate-900 dark:text-slate-100 text-left mb-[10px]">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {/* Dropdown height matches other inputs (52px), vertically centered arrow */}
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            className={`w-full h-[52px] px-4 rounded-xl border ${
              errors.category
                ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400'
                : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
            } bg-white text-slate-700 text-sm focus:outline-none focus:ring-4 transition-all duration-200 appearance-none cursor-pointer pr-10`}
          >
            <option value="">Select a category</option>
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
        {errors.category && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-xl">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.category}
          </p>
        )}
      </div>

      {/* Location — 10px label gap, 24px block gap */}
      <div className="mb-[24px]">
        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 text-left mb-[10px]">
          Location <span className="text-red-500">*</span>
        </label>
        <PlacesAutocomplete
          onPlaceSelect={handlePlaceSelect}
          placeholder="Search for shop location..."
          disabled={loading}
        />
        {errors.address && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-xl">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.address}
          </p>
        )}

        {/* Auto-filled location data — Styled container */}
        {formData.address && formData.latitude !== null && formData.longitude !== null && (
          <div className="mt-3.5 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl animate-scale-in text-left">
            <p className="text-xs font-semibold text-blue-500 flex items-center gap-1.5 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Location details captured
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="truncate" title={formData.address}>
                <span className="font-semibold text-slate-500">Address:</span> {formData.address}
              </div>
              <div>
                <span className="font-semibold text-slate-500">Latitude:</span> {formData.latitude?.toFixed(6)}
              </div>
              <div>
                <span className="font-semibold text-slate-500">Longitude:</span> {formData.longitude?.toFixed(6)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button — Centered, full width, height 54px, blue gradient, lift hover effect */}
      <div className="pt-2">
        <button
          id="submit-shop"
          type="submit"
          disabled={loading}
          className="w-full h-[54px] px-6 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 focus:outline-none focus:ring-4 focus:ring-blue-500/20 hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Registering...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Register Shop
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
