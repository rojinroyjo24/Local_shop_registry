import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../services/supabase'
import ShopForm from '../components/ShopForm'
import toast from 'react-hot-toast'

/**
 * RegisterShop — Page for registering a new shop with Google Places integration.
 * UI redesign: Stripe-style form, centered, 850px max-width, compact header.
 */
export default function RegisterShop() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData) {
    setLoading(true)

    try {
      const { error } = await supabase.from('shops').insert({
        user_id: user.id,
        shop_name: formData.shop_name.trim(),
        description: formData.description?.trim() || null,
        category: formData.category,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        place_id: formData.place_id,
      })

      if (error) throw error

      toast.success('Shop registered successfully! 🎉')
      navigate('/')
    } catch (err) {
      console.error('Failed to register shop:', err)
      toast.error(err.message || 'Failed to register shop. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    /* UI CHANGE: centered page, consistent bg */
    <div className="min-h-[calc(100vh-4rem)] gradient-mesh flex flex-col items-center justify-start w-full">
      {/* UI CHANGE: max-width 850px, compact padding */}
      <div className="w-full max-w-[850px] px-8 pt-8 pb-12">
        
        {/* Header — UI CHANGE: compact, left-aligned, no oversized icon */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Register a Shop
          </h1>
          <p className="text-[14px] text-slate-500 mt-1">
            Add a new local shop to the registry
          </p>
        </div>

        {/* Form Card — UI CHANGE: white card, 16px radius, clean shadow */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-slide-up">
          <ShopForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Tips — hidden via CSS (.mt-8.p-6.bg-blue-500\/10) */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl animate-slide-up text-left" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-[15px] text-slate-700">
              <p className="font-semibold text-slate-900 mb-2">Tips for registering</p>
              <ul className="list-disc list-inside space-y-2 text-slate-500">
                <li>Use the location search to find the exact shop address.</li>
                <li>Latitude, longitude, and Place ID are captured automatically.</li>
                <li>Add a clear description to help others find your shop.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
