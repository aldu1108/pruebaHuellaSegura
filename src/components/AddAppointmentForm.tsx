import { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Stethoscope, Save } from 'lucide-react';

interface NewAppointment {
  petName: string;
  petType: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  date: string;
  time: string;
  type: string;
  notes?: string;
}

interface AddAppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: NewAppointment) => void;
}

export function AddAppointmentForm({ isOpen, onClose, onSave }: AddAppointmentFormProps) {
  const [formData, setFormData] = useState<NewAppointment>({
    petName: '',
    petType: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  const appointmentTypes = [
    'Consulta General',
    'Vacunación',
    'Cirugía',
    'Emergencia',
    'Revisión Post-Operatoria',
    'Desparasitación',
    'Limpieza Dental',
    'Control de Peso',
    'Análisis de Sangre',
    'Radiografía'
  ];

  const petTypes = [
    'Perro - Golden Retriever',
    'Perro - Labrador',
    'Perro - Pastor Alemán',
    'Perro - Bulldog Francés',
    'Perro - Chihuahua',
    'Gato - Persa',
    'Gato - Siamés',
    'Gato - Británico',
    'Gato - Maine Coon',
    'Ave - Loro',
    'Ave - Canario',
    'Conejo',
    'Hámster',
    'Otro'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.petName || !formData.ownerName || !formData.date || !formData.time || !formData.type) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validar formato de teléfono
    const phoneRegex = /^[+]?[\d\s-()]+$/;
    if (formData.ownerPhone && !phoneRegex.test(formData.ownerPhone)) {
      alert('Por favor ingresa un número de teléfono válido');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.ownerEmail && !emailRegex.test(formData.ownerEmail)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    onSave(formData);
    
    // Resetear formulario
    setFormData({
      petName: '',
      petType: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      date: '',
      time: '',
      type: '',
      notes: ''
    });
    
    onClose();
  };

  const handleInputChange = (field: keyof NewAppointment, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  // Obtener fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#FAE5A1] px-6 py-4 border-b border-[#EE9444] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E55826] rounded-full flex items-center justify-center">
              <Calendar size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3D291D]">Nueva Cita</h2>
              <p className="text-sm text-[#3D291D] opacity-80">Programar nueva cita veterinaria</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#EE9444] hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={20} className="text-[#3D291D]" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información de la mascota */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#3D291D] flex items-center gap-2">
              <Stethoscope size={18} className="text-[#E55826]" />
              Información de la Mascota
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#3D291D] mb-2">
                Nombre de la mascota *
              </label>
              <input
                type="text"
                value={formData.petName}
                onChange={(e) => handleInputChange('petName', e.target.value)}
                placeholder="Ej: Luna, Max, Whiskers..."
                className="w-full px-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D291D] mb-2">
                Tipo de mascota
              </label>
              <select
                value={formData.petType}
                onChange={(e) => handleInputChange('petType', e.target.value)}
                className="w-full px-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
              >
                <option value="">Seleccionar tipo...</option>
                {petTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Información del propietario */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#3D291D] flex items-center gap-2">
              <User size={18} className="text-[#E55826]" />
              Información del Propietario
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#3D291D] mb-2">
                Nombre del propietario *
              </label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                placeholder="Ej: María Rodríguez"
                className="w-full px-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                    placeholder="+34 666 123 456"
                    className="w-full pl-10 pr-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                    placeholder="email@ejemplo.com"
                    className="w-full pl-10 pr-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Información de la cita */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#3D291D] flex items-center gap-2">
              <Calendar size={18} className="text-[#E55826]" />
              Detalles de la Cita
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Fecha *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={today}
                  className="w-full px-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Hora *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full px-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                  required
                >
                  <option value="">Seleccionar hora...</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D291D] mb-2">
                Tipo de consulta *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                required
              >
                <option value="">Seleccionar tipo...</option>
                {appointmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D291D] mb-2">
                Notas adicionales
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Información adicional sobre la cita..."
                rows={3}
                className="w-full px-4 py-3 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm resize-none"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-[#B58568] border border-[#B58568] rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#E55826] hover:bg-[#d14920] text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Programar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}