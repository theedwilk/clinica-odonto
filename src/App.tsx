import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import DashboardClient from '@/pages/DashboardClient'
import DashboardClinic from '@/pages/DashboardClinic'
import PublicClinicPage from '@/pages/PublicClinicPage'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={session ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/dashboard" element={session ? <DashboardClient /> : <Navigate to="/login" replace />} />
        <Route path="/clinic" element={session ? <DashboardClinic /> : <Navigate to="/login" replace />} />
        <Route path="/clinic/:id" element={<PublicClinicPage />} />
      </Routes>
    </Router>
  )
}

export default App
