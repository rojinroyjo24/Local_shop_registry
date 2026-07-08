import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from './Loader'

/**
 * ProtectedRoute — Wraps routes that require authentication.
 * Redirects to /login if no session is active.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loader fullPage text="Checking authentication..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
