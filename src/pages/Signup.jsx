import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { validateEmail, validatePassword } from '../utils/validators'
import toast from 'react-hot-toast'

/**
 * Signup — Registration page with email, password, and confirm password.
 */
export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const emailCheck = validateEmail(email)
    const passCheck = validatePassword(password)
    const newErrors = {}

    if (!emailCheck.valid) newErrors.email = emailCheck.message
    if (!passCheck.valid) newErrors.password = passCheck.message
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      await signUp(email, password)
      toast.success('Account created! Please check your email to verify your account.', {
        duration: 6000,
      })
      navigate('/login')
    } catch (err) {
      toast.error(err.message || 'Failed to create account')
      setErrors({ general: err.message })
    } finally {
      setLoading(false)
    }
  }  return (
    /* Perfectly center the card vertically and horizontally with responsive spacing */
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 gradient-mesh">
      <div className="w-full max-w-[440px] animate-scale-in">

        {/* Card — contains everything, using glassmorphism styling, rounded 20px, subtle shadow */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[20px] shadow-2xl shadow-slate-900/10 border border-slate-200/80 dark:border-slate-700/50 overflow-hidden">

          {/* Header Strip — green theme, increased height, proper padding, smooth rounded top corners */}
          <div className="gradient-secondary rounded-t-[20px] px-8 pt-12 pb-10 text-center">
            
            {/* User Plus Icon — centered, size 76px (70-80px range), circular, translucent bg, thin border, soft shadow, modern spacing, white icon */}
            <div className="w-[76px] h-[76px] mx-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg mb-6 hover:scale-105 hover:bg-white/15 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            
            {/* Welcome Text — proper spacing, bold, font size 36px, smaller subtitle, centered */}
            <h1 className="text-[36px] font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Create account
            </h1>
            <p className="text-sm text-white/70 mt-2 max-w-[280px] mx-auto">
              Join LocalShop and start registering shops
            </p>
          </div>

          {/* Form Body */}
          <div className="px-7 sm:px-9 py-8 sm:py-10">
            {errors.general && (
              <div className="mb-6 p-3.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.general}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email — Label (left-aligned, medium weight, better contrast) with 16px mb margin. 24px mb spacing to next block. */}
              <div className="mb-[24px]">
                <label htmlFor="signup-email" className="block text-sm font-medium text-slate-900 dark:text-slate-100 text-left mb-[16px]">
                  Email Address
                </label>
                <div className="relative">
                  {/* Icon vertically centered */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Modern input style: height 50px, rounded corners, soft border, dark background, blue glow, proper left padding */}
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })) }}
                    placeholder="you@example.com"
                    disabled={loading}
                    style={{ paddingLeft: '52px' }}
                    className={`w-full h-[50px] pr-4 rounded-[10px] border ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400'
                        : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
                    } bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2.5 text-sm text-red-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password — Label with 16px mb margin. 24px mb spacing to next block. */}
              <div className="mb-[24px]">
                <label htmlFor="signup-password" className="block text-sm font-medium text-slate-900 dark:text-slate-100 text-left mb-[16px]">
                  Password
                </label>
                <div className="relative">
                  {/* Icon vertically centered */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  {/* Modern input style: height 50px, rounded corners, soft border, dark background, blue glow, proper left padding */}
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })) }}
                    placeholder="Minimum 6 characters"
                    disabled={loading}
                    style={{ paddingLeft: '52px', paddingRight: '56px' }}
                    className={`w-full h-[50px] rounded-[10px] border ${
                      errors.password
                        ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400'
                        : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
                    } bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer rounded-lg hover:bg-slate-100"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2.5 text-sm text-red-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password — Label with 16px mb margin. 24px mb spacing to next block. */}
              <div className="mb-[24px]">
                <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-900 dark:text-slate-100 text-left mb-[16px]">
                  Confirm Password
                </label>
                <div className="relative">
                  {/* Icon vertically centered */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  {/* Modern input style: height 50px, rounded corners, soft border, dark background, blue glow, proper left padding */}
                  <input
                    id="signup-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: '' })) }}
                    placeholder="Repeat your password"
                    disabled={loading}
                    style={{ paddingLeft: '52px' }}
                    className={`w-full h-[50px] pr-4 rounded-[10px] border ${
                      errors.confirmPassword
                        ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400'
                        : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
                    } bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2.5 text-sm text-red-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit — Button: Height 50px, centered text and icon, premium gradient, hover lift effect, hover shadow */}
              <div className="pt-2">
                <button
                  id="signup-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full h-[50px] px-6 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-[10px] shadow-md hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create Account
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Divider — Centered "OR" with thin lines on both sides */}
            <div className="relative flex items-center justify-center my-[24px]">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
              <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                or
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
            </div>

            {/* Sign In Link — Centered, blue accent, underline on hover only */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-5">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors no-underline hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer — centered, reduced opacity, added margin spacing from card */}
        <p className="text-center text-xs text-slate-400/60 dark:text-slate-500/60 mt-12">
          &copy; {new Date().getFullYear()} LocalShop Registry. All rights reserved.
        </p>
      </div>
    </div>
  )
}
