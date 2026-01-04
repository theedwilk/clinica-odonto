import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

export default function DashboardClient() {
  const [appointments, setAppointments] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('client_id', user.id)
      .order('appointment_date', { ascending: true })

    setAppointments(data || [])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-600">Você não tem agendamentos ainda</p>
              <Button className="mt-4">Agendar Agora</Button>
            </Card>
          ) : (
            appointments.map((apt) => (
              <Card key={apt.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{apt.client_name}</h3>
                    <p className="text-gray-600">
                      {apt.appointment_date} às {apt.appointment_time}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Status: {apt.status === 'confirmed' ? '✓ Confirmado' : '✗ Cancelado'}
                    </p>
                  </div>
                  {apt.status === 'confirmed' && (
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
