// Shop categories with display labels and colors
export const CATEGORIES = [
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  { value: 'grocery', label: 'Grocery', icon: '🛒', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { value: 'pharmacy', label: 'Pharmacy', icon: '💊', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { value: 'clothing', label: 'Clothing', icon: '👗', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { value: 'electronics', label: 'Electronics', icon: '📱', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { value: 'bakery', label: 'Bakery', icon: '🍞', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  { value: 'cafe', label: 'Cafe', icon: '☕', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { value: 'beauty_salon', label: 'Beauty Salon', icon: '💇', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' },
  { value: 'stationery', label: 'Stationery', icon: '📝', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { value: 'other', label: 'Other', icon: '🏪', color: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400' },
]

// Get category config by value
export function getCategoryConfig(value) {
  return CATEGORIES.find(c => c.value === value) || CATEGORIES[CATEGORIES.length - 1]
}

// Search radius options (in kilometers)
export const SEARCH_RADIUS_OPTIONS = [1, 5, 10, 25, 50]

// Default search radius in km
export const DEFAULT_SEARCH_RADIUS = 10

// Pagination
export const PAGE_SIZE = 12
