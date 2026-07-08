import { Link } from 'react-router-dom'

/**
 * NotFound — 404 page with illustration and navigation link.
 * UI redesign: clean light theme, no dark mode classes.
 */
export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 gradient-mesh">
      <div className="text-center animate-scale-in">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[160px] font-black text-slate-100 leading-none select-none" style={{ fontFamily: 'var(--font-display)' }}>
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl gradient-primary shadow-lg flex items-center justify-center" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* UI CHANGE: clean text, no dark mode classes */}
        <h2 className="text-[24px] font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Page not found
        </h2>
        <p className="text-[15px] text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or maybe the URL is incorrect.
        </p>

        <div className="flex items-center justify-center gap-3">
          {/* UI CHANGE: solid blue button, no gradient */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
          >
            Search Shops
          </Link>
        </div>
      </div>
    </div>
  )
}
