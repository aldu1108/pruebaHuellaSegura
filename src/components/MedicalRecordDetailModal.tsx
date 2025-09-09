import { X, Calendar, MapPin, FileText, DollarSign, Stethoscope, User, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MedicalRecord {
  id: number;
  petName: string;
  petImage: string;
  date: string;
  type: string;
  veterinarian: string;
  clinic: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  cost?: string;
}

interface MedicalRecordDetailModalProps {
  record: MedicalRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MedicalRecordDetailModal({ record, isOpen, onClose }: MedicalRecordDetailModalProps) {
  if (!isOpen || !record) return null;

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'consulta general':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'emergencia':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cirugía':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'vacunación':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Información simulada adicional
  const additionalInfo = {
    clinicAddress: 'Calle Veterinaria 123, Madrid, España',
    clinicPhone: '+34 91 123 4567',
    clinicEmail: 'info@clinicavetsan martin.com',
    nextAppointment: '15 Feb 2024 - 10:30 AM',
    medicines: [
      { name: 'Antibiótico', dosage: '250mg', frequency: 'Cada 8 horas', duration: '7 días' },
      { name: 'Antiinflamatorio', dosage: '100mg', frequency: 'Cada 12 horas', duration: '5 días' }
    ],
    recommendations: [
      'Mantener reposo por 48 horas',
      'Aplicar compresas frías 3 veces al día',
      'Dieta blanda durante 3 días',
      'Revisar la herida diariamente'
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-4">
            <ImageWithFallback 
              src={record.petImage}
              alt={record.petName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-[#3D291D]">Historial Médico Detallado</h2>
              <p className="text-[#B58568]">{record.petName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-[#B58568]" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Información básica de la consulta */}
          <div className="bg-[#FAE5A1] bg-opacity-30 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm border ${getTypeColor(record.type)}`}>
                    {record.type}
                  </span>
                  {record.cost && (
                    <span className="bg-[#E55826] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {record.cost}
                    </span>
                  )}
                </div>
                <p className="text-[#3D291D] font-semibold flex items-center gap-2">
                  <Calendar size={16} />
                  {record.date}
                </p>
              </div>
            </div>
          </div>

          {/* Información del veterinario y clínica */}
          <div className="bg-white border border-[#B58568] border-opacity-30 rounded-lg p-4">
            <h3 className="font-semibold text-[#3D291D] mb-3 flex items-center gap-2">
              <Stethoscope size={16} />
              Información del Veterinario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#B58568]">Veterinario</p>
                <p className="font-semibold text-[#3D291D] flex items-center gap-2">
                  <User size={14} />
                  Dr. {record.veterinarian}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#B58568]">Clínica</p>
                <p className="font-semibold text-[#3D291D] flex items-center gap-2">
                  <MapPin size={14} />
                  {record.clinic}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#B58568]">Dirección</p>
                <p className="text-[#3D291D]">{additionalInfo.clinicAddress}</p>
              </div>
              <div>
                <p className="text-sm text-[#B58568]">Contacto</p>
                <p className="text-[#3D291D] flex items-center gap-2">
                  <Phone size={14} />
                  {additionalInfo.clinicPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Diagnóstico y Tratamiento */}
          <div className="bg-white border border-[#B58568] border-opacity-30 rounded-lg p-4">
            <h3 className="font-semibold text-[#3D291D] mb-3 flex items-center gap-2">
              <FileText size={16} />
              Diagnóstico y Tratamiento
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#B58568] mb-1">Diagnóstico</p>
                <p className="text-[#3D291D] bg-gray-50 p-3 rounded-lg">{record.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-[#B58568] mb-1">Tratamiento</p>
                <p className="text-[#3D291D] bg-gray-50 p-3 rounded-lg">{record.treatment}</p>
              </div>
              {record.notes && (
                <div>
                  <p className="text-sm text-[#B58568] mb-1">Notas del Veterinario</p>
                  <p className="text-[#3D291D] bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">{record.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Medicamentos */}
          {record.type !== 'Consulta General' && (
            <div className="bg-white border border-[#B58568] border-opacity-30 rounded-lg p-4">
              <h3 className="font-semibold text-[#3D291D] mb-3">Medicamentos Recetados</h3>
              <div className="space-y-3">
                {additionalInfo.medicines.map((medicine, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-[#3D291D]">{medicine.name}</p>
                      <span className="text-[#E55826] text-sm font-semibold">{medicine.dosage}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#B58568]">Frecuencia: </span>
                        <span className="text-[#3D291D]">{medicine.frequency}</span>
                      </div>
                      <div>
                        <span className="text-[#B58568]">Duración: </span>
                        <span className="text-[#3D291D]">{medicine.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recomendaciones */}
          <div className="bg-white border border-[#B58568] border-opacity-30 rounded-lg p-4">
            <h3 className="font-semibold text-[#3D291D] mb-3">Recomendaciones</h3>
            <ul className="space-y-2">
              {additionalInfo.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#E55826] text-lg">•</span>
                  <span className="text-[#3D291D]">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Próxima cita */}
          <div className="bg-[#E55826] bg-opacity-10 border border-[#E55826] border-opacity-30 rounded-lg p-4">
            <h3 className="font-semibold text-[#3D291D] mb-2">Próxima Cita Programada</h3>
            <p className="text-[#3D291D] flex items-center gap-2">
              <Calendar size={16} />
              {additionalInfo.nextAppointment}
            </p>
            <p className="text-sm text-[#B58568] mt-1">Recordatorio: Vacunación anual</p>
          </div>

          {/* Información de facturación */}
          {record.cost && (
            <div className="bg-white border border-[#B58568] border-opacity-30 rounded-lg p-4">
              <h3 className="font-semibold text-[#3D291D] mb-3 flex items-center gap-2">
                <DollarSign size={16} />
                Información de Pago
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-[#B58568]">Consulta</p>
                  <p className="font-semibold text-[#E55826]">{record.cost}</p>
                </div>
                <div>
                  <p className="text-sm text-[#B58568]">Estado</p>
                  <p className="font-semibold text-green-600">Pagado</p>
                </div>
                <div>
                  <p className="text-sm text-[#B58568]">Método</p>
                  <p className="font-semibold text-[#3D291D]">Tarjeta</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer con acciones */}
        <div className="border-t p-6">
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 border border-[#B58568] border-opacity-30 text-[#B58568] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
            <button className="flex-1 py-3 bg-[#E55826] text-white rounded-lg hover:bg-[#d14918] transition-colors">
              Descargar Reporte
            </button>
            <button className="flex-1 py-3 bg-[#EE9444] text-white rounded-lg hover:bg-[#E55826] transition-colors">
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}