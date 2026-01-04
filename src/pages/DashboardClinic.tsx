import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

export default function DashboardClinic() {
  const [clinic, setClinic] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchClinicData()
  }, [])

  const fetchClinicData = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    // Buscar clínica
    const { data: clinicData } = await supabase
      .from('clinics')
      .select('*')
      .eq('owner_id', user.id)
      .single()

    setClinic(clinicData)

    if (clinicData) {
      // Buscar agendamentos
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('*')
        .eq('clinic_id', clinicData.id)
        .order('appointment_date', { ascending: true })

      setAppointments(appointmentsData || [])
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (!clinic) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{clinic.name}</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total de Agendamentos</h3>
            <p className="text-3xl font-bold mt-2">{appointments.length}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium">Confirmados</h3>
            <p className="text-3xl font-bold mt-2">
              {appointments.filter(a => a.status === 'confirmed').length}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium">Cancelados</h3>
            <p className="text-3xl font-bold mt-2">
              {appointments.filter(a => a.status === 'canceled').length}
            </p>
          </Card>
        </div>

        {/* Agendamentos */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Próximos Agendamentos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Paciente</th>
                  <th className="text-left py-2">Data</th>
                  <th className="text-left py-2">Hora</th>
                  <th className="text-left py-2">Serviço</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 10).map((apt) => (
                  <tr key={apt.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{apt.client_name}</td>
                    <td className="py-3">{apt.appointment_date}</td>
                    <td className="py-3">{apt.appointment_time}</td>
                    <td className="py-3">-</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {apt.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
