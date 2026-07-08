/**
 * Loader — Animated loading spinner with full-page and inline variants.
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
        <div
          className={`${sizeClasses[size]} rounded-full border-primary-100 border-t-primary-600 animate-spin dark:border-slate-700 dark:border-t-primary-400`}
        />
        {size !== 'sm' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${size === 'lg' ? 'w-6 h-6' : 'w-3 h-3'} rounded-full bg-primary-500/20 animate-pulse-soft`} />
          </div>
        )}
      </div>
      {text && (
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse-soft">
          {text}
        </p>
      )}
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
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
