import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Calendar, Users, BarChart3, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Clínica Agendamentos</h1>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/login">
              <Button>Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Agendamentos Simples para Clínicas Odontológicas
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Gerencie sua agenda, dentistas e pacientes em um único lugar. Aumente fidelização com lembretes automáticos.
        </p>
        <Link to="/login">
          <Button size="lg" className="text-lg">
            Começar Agora
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Por que escolher?</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h4 className="font-bold mb-2">Agenda Inteligente</h4>
              <p className="text-gray-600">Visualize disponibilidades em tempo real</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h4 className="font-bold mb-2">Gestão de Profissionais</h4>
              <p className="text-gray-600">Controle dentistas e horários facilmente</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h4 className="font-bold mb-2">Lembretes Automáticos</h4>
              <p className="text-gray-600">Reduza faltas com notificações</p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h4 className="font-bold mb-2">Relatórios</h4>
              <p className="text-gray-600">Acompanhe performance e faturamento</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
        <p className="text-lg mb-8">Crie sua conta agora e comece a receber agendamentos</p>
        <Link to="/login">
          <Button size="lg" variant="secondary">
            Criar Conta
          </Button>
        </Link>
      </section>
    </div>
  )
}
