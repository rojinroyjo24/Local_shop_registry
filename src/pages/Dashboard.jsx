import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useMyShops } from '../hooks/useShops'
import ShopCard from '../components/ShopCard'
import Loader from '../components/Loader'
import { CATEGORIES, getCategoryConfig } from '../utils/constants'

/**
 * Dashboard — Authenticated home page with stats, quick actions, and recent shops.
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
      shadow: 'shadow-primary-500/20',
      lightBg: 'bg-primary-50 dark:bg-primary-900/20',
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
      shadow: 'shadow-secondary-500/20',
      lightBg: 'bg-secondary-50 dark:bg-secondary-900/20',
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
      shadow: 'shadow-accent-500/20',
      lightBg: 'bg-accent-50 dark:bg-accent-900/20',
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
      shadow: 'shadow-primary-500/20',
      lightBg: 'bg-primary-50 dark:bg-primary-900/20',
      link: '/register',
    },
  ]

  return (
    <div className="gradient-mesh">
      {/* Centered container — max 1400px, 40px side padding */}
      <div className="mx-auto max-w-[1400px] px-8 py-10 space-y-10">

        {/* ── Welcome Header ── */}
        <div className="animate-fade-in">
          <h1 className="text-[32px] font-bold tracking-tight text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back <span className="inline-block animate-bounce-in" style={{ animationDelay: '0.3s' }}>👋</span>
          </h1>
          <p className="text-[14px] text-slate-500 mt-1">
            {user?.email}
          </p>
        </div>

        {/* ── Statistics Grid ── 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {stats.map((stat) => {
            const CardElement = stat.link ? Link : 'div'
            const cardProps = stat.link ? { to: stat.link } : {}

            return (
              <CardElement
                key={stat.label}
                {...cardProps}
                className={`group bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 ${
                  stat.link ? 'cursor-pointer' : ''
                }`}
              >
                {/* Colored icon box */}
                <div className={`w-12 h-12 rounded-xl ${stat.gradient} shadow-sm flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[28px] font-bold text-slate-900 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </span>
                    <span className="text-[12px] text-slate-400 truncate">
                      {stat.label === 'My Shops' ? 'registered' : stat.label === 'Categories' ? 'sectors' : stat.label === 'Quick Action' ? 'add new' : 'latest'}
                    </span>
                  </div>
                </div>
              </CardElement>
            )
          })}
        </div>

        {/* ── Quick Actions ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Link
              to="/register"
              id="quick-register"
              className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-6 h-[150px] shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-blue-500 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Register Shop</h3>
                <p className="text-[13px] text-slate-500 mt-0.5">Add a local shop to the registry</p>
              </div>
            </Link>

            <Link
              to="/search"
              id="quick-search"
              className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-6 h-[150px] shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-green-200 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl gradient-secondary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-green-500 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Search Shops</h3>
                <p className="text-[13px] text-slate-500 mt-0.5">Discover registered local shops</p>
              </div>
            </Link>
          </div>
        </div>

        {/* ── Recent Shops ── */}
        <div className="animate-slide-up space-y-4" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Recent Shops</h2>
            {totalShops > 0 && (
              <span className="text-[12px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {totalShops} Shop{totalShops !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {loading ? (
            <Loader text="Loading your shops..." />
          ) : error ? (
            <div className="text-center py-16 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[14px] text-slate-600 dark:text-slate-400 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="px-5 py-2.5 text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 dark:text-primary-400 rounded-xl transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          ) : shops.length === 0 ? (
            <div className="text-center py-20 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-850 mb-6">
                <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                No shops yet
              </h3>
              <p className="text-[14px] text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                Get started by registering your first local shop to the registry.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Register Your First Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
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
