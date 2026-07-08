/**
 * Loader — Animated loading spinner with full-page and inline variants.
 * UI redesign: removed dark mode classes, blue spinner on white.
 */
export default function Loader({ fullPage = false, size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-[3px]',
    lg: 'w-16 h-16 border-4',
  }

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* UI CHANGE: blue spinner, light track */}
        <div
          className={`${sizeClasses[size]} rounded-full border-blue-100 border-t-blue-600 animate-spin`}
        />
        {size !== 'sm' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${size === 'lg' ? 'w-6 h-6' : 'w-3 h-3'} rounded-full bg-blue-500/20 animate-pulse-soft`} />
          </div>
        )}
      </div>
      {text && (
        <p className="text-[14px] font-medium text-slate-500 animate-pulse-soft">
          {text}
        </p>
      )}
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-16">
      {spinner}
    </div>
  )
}
