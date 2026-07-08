import { createContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../services/supabase'

export const AuthContext = createContext(null)

/**
 * AuthProvider wraps the app and provides authentication state & methods.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Skip auth when Supabase isn't configured — stop loading so the app renders
      setLoading(false)
      return
    }

    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  /**
   * Sign up with email and password.
   */
  async function signUp(email, password) {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured. Please add your credentials to .env')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  /**
   * Sign in with email and password.
   */
  async function signIn(email, password) {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured. Please add your credentials to .env')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  /**
   * Sign out the current user.
   */
  async function signOut() {
    if (!isSupabaseConfigured) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const value = {
    user,
    session,
    loading,
    isConfigured: isSupabaseConfigured,
    signUp,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
