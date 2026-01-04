export type UserRole = 'client' | 'clinic_owner' | 'dentist'

export interface Clinic {
  id: string
  owner_id: string
  name: string
  cnpj?: string
  address?: string
  phone?: string
  logo_url?: string
  created_at: string
  updated_at: string
}

export interface Dentist {
  id: string
  clinic_id: string
  name: string
  specialty?: string
  avatar_url?: string
  work_hours?: Record<string, string[]>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  clinic_id: string
  name: string
  duration: number // minutos
  price: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  clinic_id: string
  dentist_id: string
  service_id: string
  client_id: string
  client_name: string
  client_email: string
  client_phone?: string
  appointment_date: string
  appointment_time: string
  status: 'confirmed' | 'canceled' | 'completed' | 'no_show'
  payment_status: 'pending' | 'paid' | 'refunded'
  payment_amount?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  role: UserRole
  full_name?: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}
