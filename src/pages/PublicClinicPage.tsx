import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PublicClinicPage() {
  const { clinicId } = useParams()
  const [clinic, setClinic] = useState<any>(null)
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    fetchClinicData()
  }, [clinicId])

  const fetchClinicData = async () => {
    if (!clinicId) return

    const { data: clinicData } = await supabase
      .from('clinics')
      .select('*')
      .eq('id', clinicId)
      .single()

    setClinic(clinicData)

    const { data: servicesData } = await supabase
      .from('services')
      .select('*')
      .eq('clinic_id', clinicId)
      .eq('is_active', true)

    setServices(servicesData || [])
  }

  if (!clinic) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">{clinic.name}</h1>
          <p className="text-gray-600">{clinic.address}</p>
        </div>
      </header>

      {/* Services */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Nossos Serviços</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="p-6">
              <h3 className="font-bold text-lg">{service.name}</h3>
              <p className="text-gray-600 text-sm mt-2">
                Duração: {service.duration} min
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-4">
                R$ {service.price.toFixed(2)}
              </p>
              <Button className="w-full mt-4">Agendar</Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
