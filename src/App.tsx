import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardClinic from './pages/DashboardClinic'
import DashboardClient from './pages/DashboardClient'
import PublicClinicPage from './pages/PublicClinicPage'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        fetchUserRole(session.user.id)
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        fetchUserRole(session.user.id)
      } else {
        setUserRole(null)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  const fetchUserRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .single()

    setUserRole(data?.role || null)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!session ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/dashboard" />} />

        {session && userRole === 'clinic_owner' && (
          <Route path="/dashboard" element={<DashboardClinic />} />
        )}

        {session && userRole === 'client' && (
          <Route path="/dashboard" element={<DashboardClient />} />
        )}

        <Route path="/clinic/:clinicId" element={<PublicClinicPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
