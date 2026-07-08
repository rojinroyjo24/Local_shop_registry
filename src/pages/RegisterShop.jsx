import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../services/supabase'
import ShopForm from '../components/ShopForm'
import toast from 'react-hot-toast'

/**
 * RegisterShop — Page for registering a new shop with Google Places integration.
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
    <div className="min-h-[calc(100vh-4rem)] gradient-mesh flex flex-col items-center justify-start w-full">
      {/* Centered page container, max-width 900px, w-full, py-10, px-8 */}
      <div className="w-full max-w-[900px] px-8 pt-10 pb-12">
        
        {/* Header — Centered horizontally in layout, with icon aligned vertically with the title */}
        <div className="flex items-center justify-center gap-5 mb-8 animate-fade-in text-left">
          {/* Blue rounded square 72x72px container with soft shadow */}
          <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white flex-shrink-0">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            {/* Title 42px bold, Subtitle 16px gray */}
            <h1 className="text-[42px] font-bold text-slate-900 dark:text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Register a Shop
            </h1>
            <p className="text-[16px] text-slate-500 dark:text-slate-400 mt-1">
              Add a new local shop to the registry
            </p>
          </div>
        </div>

        {/* Form Card — background glass effect, rounded-2xl, p-8, soft shadow, thin border */}
        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 p-8 animate-slide-up">
          <ShopForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Tips — Soft blue background, thin border, corrected spacing */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl animate-slide-up text-left" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-[15px] text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white mb-2">Tips for registering</p>
              <ul className="list-disc list-inside space-y-2 text-slate-500 dark:text-slate-400">
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
