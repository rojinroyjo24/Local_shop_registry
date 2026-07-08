import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../services/supabase'
import { calculateDistance } from '../services/googlePlaces'
import { DEFAULT_SEARCH_RADIUS } from '../utils/constants'

/**
 * Hook to fetch and manage shops data.
 */
export function useShops() {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchShops = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from('shops')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setShops(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchShops()
  }, [fetchShops])

  return { shops, loading, error, refetch: fetchShops }
}

/**
 * Hook to fetch shops belonging to the current user.
 */
export function useMyShops(userId) {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMyShops = useCallback(async () => {
    if (!userId) return
    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from('shops')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setShops(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchMyShops()
  }, [fetchMyShops])

  return { shops, loading, error, refetch: fetchMyShops }
}

/**
 * Hook for searching shops with filters.
 */
export function useSearchShops() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchShops = useCallback(async ({ query = '', category = '', location = null, radius = DEFAULT_SEARCH_RADIUS } = {}) => {
    try {
      setLoading(true)
      setError(null)

      let queryBuilder = supabase
        .from('shops')
        .select('*')
        .order('created_at', { ascending: false })

      // Filter by name (case-insensitive partial match)
      if (query.trim()) {
        queryBuilder = queryBuilder.ilike('shop_name', `%${query.trim()}%`)
      }

      // Filter by category
      if (category) {
        queryBuilder = queryBuilder.eq('category', category)
      }

      const { data, error: searchError } = await queryBuilder

      if (searchError) throw searchError

      let filteredData = data || []

      // Filter by location (distance) if coordinates provided
      if (location && location.latitude && location.longitude) {
        filteredData = filteredData
          .map(shop => ({
            ...shop,
            distance: calculateDistance(
              location.latitude,
              location.longitude,
              shop.latitude,
              shop.longitude
            ),
          }))
          .filter(shop => shop.distance <= radius)
          .sort((a, b) => a.distance - b.distance)
      }

      setResults(filteredData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, error, searchShops }
}
