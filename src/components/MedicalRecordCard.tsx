import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, MapPin, FileText, Eye } from 'lucide-react';

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

interface MedicalRecordCardProps {
  record: MedicalRecord;
  onViewDetails: (record: MedicalRecord) => void;
}

export function MedicalRecordCard({ record, onViewDetails }: MedicalRecordCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'consulta general':
        return 'bg-green-100 text-green-800';
      case 'emergencia':
        return 'bg-red-100 text-red-800';
      case 'cirugía':
        return 'bg-purple-100 text-purple-800';
      case 'vacunación':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <ImageWithFallback 
            src={record.petImage}
            alt={record.petName}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-[#3D291D]">{record.petName}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(record.type)}`}>
                    {record.type}
                  </span>
                  {record.cost && (
                    <span className="text-[#E55826] font-semibold text-sm">{record.cost}</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#3D291D] flex items-center gap-1">
                  <Calendar size={14} />
                  {record.date}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div>
            <p className="text-sm font-semibold text-[#3D291D]">Dr. {record.veterinarian}</p>
            <p className="text-sm text-[#B58568] flex items-center gap-1">
              <MapPin size={12} />
              {record.clinic}
            </p>
          </div>
          
          <div>
            <p className="text-sm"><span className="font-semibold text-[#3D291D]">Diagnóstico:</span> {record.diagnosis}</p>
            <p className="text-sm"><span className="font-semibold text-[#3D291D]">Tratamiento:</span> {record.treatment}</p>
          </div>

          {record.notes && (
            <div className="bg-[#FAE5A1] bg-opacity-30 rounded-lg p-2">
              <p className="text-sm flex items-start gap-2">
                <FileText size={14} className="text-[#E55826] mt-0.5" />
                <span>{record.notes}</span>
              </p>
            </div>
          )}
        </div>

        <button 
          onClick={() => onViewDetails(record)}
          className="w-full bg-[#E55826] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#d14918] transition-colors"
        >
          <Eye size={16} />
          Ver Detalles Completos
        </button>
      </div>
    </div>
  );
}