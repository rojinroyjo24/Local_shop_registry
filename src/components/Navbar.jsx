import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

/**
 * Navbar — Responsive navigation with auth-aware links.
 * UI redesign: clean white navbar, no dark mode toggle.
 */
export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  /* dark mode state preserved for compatibility (toggle hidden via CSS) */
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  async function handleLogout() {
    try {
      await signOut()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (err) {
      toast.error('Failed to log out')
    }
    setMobileOpen(false)
  }

  /* UI CHANGE: cleaner nav link styles */
  const navLinkClass = ({ isActive }) =>
    `relative px-3.5 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
    }`

  const drawerLinkClass = ({ isActive }) =>
    `flex items-center gap-[14px] px-5 h-[52px] rounded-[12px] text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/10'
        : 'text-slate-600 hover:text-blue-600 hover:bg-[#EFF6FF]'
    }`

  return (
    /* UI CHANGE: solid white, thin border, no glassmorphism */
    <nav className="glass sticky top-0 z-40 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="gradient-primary w-9 h-9 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-sm">LS</span>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Local<span className="text-gradient">Shop</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation — UI CHANGE: tighter gap */}
          <div className="hidden md:flex items-center gap-1.5">
            {user && (
              <>
                <NavLink to="/" end className={navLinkClass}>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </span>
                </NavLink>
                <NavLink to="/register" className={navLinkClass}>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Register
                  </span>
                </NavLink>
                <NavLink to="/search" className={navLinkClass}>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </span>
                </NavLink>
              </>
            )}
          </div>

          {/* Profile Section — UI CHANGE: white pill, clean border */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
                    <span className="text-xs text-white font-semibold">
                      {user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 max-w-[120px] truncate">
                    {user.email}
                  </span>
                </div>
                <button
                  id="logout-button"
                  onClick={handleLogout}
                  className="px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-[14px] font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-[14px] font-semibold text-white gradient-primary rounded-lg shadow-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button — UI CHANGE: dark mode toggle removed */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-all"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation overlay and container */}
      {mobileOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 z-40 md:hidden animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Body */}
          <div
            className="fixed top-0 bottom-0 left-0 z-50 w-[320px] max-w-[85vw] bg-white shadow-2xl md:hidden flex flex-col rounded-r-[20px] animate-slide-in-left border-r border-slate-100"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
                <div className="gradient-primary w-9 h-9 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <span className="text-white font-bold text-sm">LS</span>
                </div>
                <span className="text-lg font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  Local<span className="text-gradient">Shop</span>
                </span>
              </Link>

              {/* Close Button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Card Section */}
            {user && (
              <div className="px-6 mt-6">
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-sm mb-3">
                    <span className="text-base text-white font-bold">
                      {user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 leading-tight truncate w-full">
                    {user.email?.split('@')[0]}
                  </span>
                  <span className="text-xs text-slate-500 truncate w-full mt-1">
                    {user.email}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Menu Links */}
            <div className="flex-1 px-6 py-6 overflow-y-auto space-y-4">
              {user ? (
                <>
                  <NavLink to="/" end className={drawerLinkClass} onClick={() => setMobileOpen(false)}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </NavLink>
                  <NavLink to="/register" className={drawerLinkClass} onClick={() => setMobileOpen(false)}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Register Shop
                  </NavLink>
                  <NavLink to="/search" className={drawerLinkClass} onClick={() => setMobileOpen(false)}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </NavLink>
                </>
              ) : (
                <div className="space-y-4 pt-4">
                  <Link
                    to="/login"
                    className="flex items-center justify-center w-full h-[52px] rounded-[12px] text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-[#EFF6FF] transition-all duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center w-full h-[52px] rounded-[12px] text-sm font-semibold text-white gradient-primary shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Logout Footer Section */}
            {user && (
              <div className="p-6 border-t border-slate-200 bg-white">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full h-[52px] px-5 rounded-[12px] text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-[14px] cursor-pointer"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  )
}
