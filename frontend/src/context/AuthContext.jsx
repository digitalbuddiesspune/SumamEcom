import { useCallback, useEffect, useMemo, useState } from 'react'
import { API_BASE_URL } from '../config/api'
import { AuthContext } from './authStore'

const jsonHeaders = { 'Content-Type': 'application/json' }

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('sumam_token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('sumam_user')
    return raw ? JSON.parse(raw) : null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      localStorage.setItem('sumam_token', token)
    } else {
      localStorage.removeItem('sumam_token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('sumam_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('sumam_user')
    }
  }, [user])

  const register = useCallback(async (payload) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Registration failed.')
      setToken(data.token)
      setUser(data.user)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (payload) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Login failed.')
      setToken(data.token)
      setUser(data.user)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setToken('')
    setUser(null)
  }, [])

  const fetchProfile = useCallback(async () => {
    if (!token) return null
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Unable to fetch profile.')
    setUser({
      id: data._id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
    })
    return data
  }, [token])

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      register,
      login,
      logout,
      fetchProfile,
      setUser,
    }),
    [token, user, loading, register, login, logout, fetchProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
