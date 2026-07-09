import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useMyShops } from '../hooks/useShops'
import ShopCard from '../components/ShopCard'
import Loader from '../components/Loader'
import { CATEGORIES, getCategoryConfig } from '../utils/constants'

/**
 * Dashboard — Authenticated home page with stats, quick actions, and recent shops.
 * UI redesign: proper hierarchy, compact cards, 1320px container.
 */
export default function Dashboard() {
  const { user } = useAuth()
  const { shops, loading, error, refetch } = useMyShops(user?.id)

  // Calculate stats
  const totalShops = shops.length
  const categoryCounts = shops.reduce((acc, shop) => {
    acc[shop.category] = (acc[shop.category] || 0) + 1
    return acc
  }, {})
  const uniqueCategories = Object.keys(categoryCounts).length

  const stats = [
    {
      label: 'My Shops',
      value: totalShops,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: 'gradient-primary',
      sub: 'registered',
    },
    {
      label: 'Categories',
      value: uniqueCategories,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      gradient: 'gradient-secondary',
      sub: 'sectors',
    },
    {
      label: 'Latest Activity',
      value: shops[0]
        ? new Date(shops[0].created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : '—',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'gradient-accent',
      sub: 'latest',
    },
    {
      label: 'Quick Action',
      value: '+ New',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
      gradient: 'gradient-primary',
      sub: 'add shop',
      link: '/register',
    },
  ]

  return (
    /* UI CHANGE: gradient-mesh bg, centered 1320px container */
    <div className="gradient-mesh">
      <div className="mx-auto max-w-[1320px] px-8 py-8 space-y-8">

        {/* ── Welcome Header ── UI CHANGE: 36px title, compact spacing */}
        <div className="animate-fade-in">
          <h1 className="text-[36px] font-bold tracking-tight text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back <span className="inline-block animate-bounce-in" style={{ animationDelay: '0.3s' }}>👋</span>
          </h1>
          <p className="text-[14px] text-slate-500 mt-1">
            {user?.email}
          </p>
        </div>

        {/* ── Statistics ── UI CHANGE: compact 120px cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {stats.map((stat) => {
            const CardElement = stat.link ? Link : 'div'
            const cardProps = stat.link ? { to: stat.link } : {}

            return (
              <CardElement
                key={stat.label}
                {...cardProps}
                className={`group bg-white rounded-[16px] border border-slate-200 p-6 h-[120px] flex items-center gap-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 transition-all duration-300 ${
                  stat.link ? 'cursor-pointer' : ''
                }`}
              >
                {/* UI CHANGE: icon box 56x56 centered vertically */}
                <div className={`w-14 h-14 rounded-[16px] ${stat.gradient} shadow-sm flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                  <p className="text-[18px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-0.5">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[34px] font-bold text-slate-900 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </span>
                    <span className="text-[14px] text-slate-400 truncate leading-none">
                      {stat.sub}
                    </span>
                  </div>
                </div>
              </CardElement>
            )
          })}
        </div>

        {/* ── Quick Actions ── UI CHANGE: 170px cards */}
        <div className="space-y-4">
          <h2 className="text-[24px] font-bold text-slate-900">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Link
              to="/register"
              id="quick-register"
              className="group flex items-center justify-between bg-white rounded-[16px] border border-slate-200 p-6 h-[170px] shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <div className="w-14 h-14 rounded-[16px] gradient-primary flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <h3 className="text-[18px] font-bold text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Register Shop</h3>
                  <p className="text-[15px] text-slate-500 mt-1 leading-normal">Add a local shop to the registry</p>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center pl-4">
                <svg className="w-6 h-6 text-slate-300 group-hover:translate-x-1 group-hover:text-blue-500 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              to="/search"
              id="quick-search"
              className="group flex items-center justify-between bg-white rounded-[16px] border border-slate-200 p-6 h-[170px] shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-green-200 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <div className="w-14 h-14 rounded-[16px] gradient-secondary flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <h3 className="text-[18px] font-bold text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Search Shops</h3>
                  <p className="text-[15px] text-slate-500 mt-1 leading-normal">Discover registered local shops</p>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center pl-4">
                <svg className="w-6 h-6 text-slate-300 group-hover:translate-x-1 group-hover:text-green-500 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* ── Recent Shops ── UI CHANGE: compact cards, 3-col grid */}
        <div className="animate-slide-up space-y-4" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-bold text-slate-900">Recent Shops</h2>
            {totalShops > 0 && (
              <span className="text-[14px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {totalShops} Shop{totalShops !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {loading ? (
            <Loader text="Loading your shops..." />
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-[16px] border border-slate-200 shadow-sm">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-[12px] bg-red-50 mb-4">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[15px] text-slate-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="px-5 py-2 text-[14px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          ) : shops.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-[16px] border border-slate-200 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-[12px] bg-slate-100 mb-5">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                No shops yet
              </h3>
              <p className="text-[15px] text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
                Get started by registering your first local shop to the registry.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Register Your First Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.slice(0, 6).map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
