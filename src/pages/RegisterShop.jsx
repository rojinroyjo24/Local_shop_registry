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
      {/* UI CHANGE: responsive centering, margin 48px auto (my-12) */}
      <div className="w-full max-w-full sm:max-w-[700px] lg:max-w-[900px] px-4 sm:px-6 lg:px-8 my-12 mx-auto">
        
        {/* Header — UI CHANGE: 42px title, 18px subtitle, 36px bottom space */}
        <div className="mb-[36px] animate-fade-in text-left">
          <h1 className="text-[42px] font-bold text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Register a Shop
          </h1>
          <p className="text-[18px] text-[#64748B] mt-1">
            Add a new local shop to the registry
          </p>
        </div>

        {/* Form Card — UI CHANGE: rounded 20px, 2px border, 40px (p-10) padding, 10px shadow */}
        <div className="bg-white rounded-[20px] border-[2px] border-[#D6DEE8] p-10 shadow-[0_10px_30px_rgba(15,23,42,0.08)] animate-slide-up">
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
