import { useState } from 'react';
import { Header } from './Header';
import { EditPetForm } from './EditPetForm';
import { BottomNavigationPets } from './BottomNavigationPets';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Calendar, Weight, Ruler, Heart, Stethoscope, Plus, MapPin, Edit, Share2, Phone, Mail } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface Pet {
  id: number;
  name: string;
  animal: string;
  breed: string;
  age: string;
  sex: string;
  weight: string;
  description: string;
  image: string;
  birthDate?: string;
  color?: string;
  microchip?: string;
  owner?: string;
  emergencyContact?: string;
}

interface MedicalRecord {
  id: number;
  date: string;
  type: string;
  veterinarian: string;
  clinic: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface WeightRecord {
  date: string;
  weight: number;
}

interface PetDetailPageProps {
  pet: Pet;
  onNavigate: (page: string, petId?: number) => void;
  onBack: () => void;
}

export function PetDetailPage({ pet, onNavigate, onBack }: PetDetailPageProps) {
  const [currentPet, setCurrentPet] = useState(pet);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const medicalHistory: MedicalRecord[] = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'Consulta General',
      veterinarian: 'Dr. María González',
      clinic: 'Clínica Veterinaria San Martín',
      diagnosis: 'Estado de salud excelente',
      treatment: 'Vacunación anual completa',
      notes: 'Peso ideal, muy activo y saludable'
    },
    {
      id: 2,
      date: '2023-09-20',
      type: 'Cirugía',
      veterinarian: 'Dr. Carlos Rodríguez',
      clinic: 'Hospital Veterinario Central',
      diagnosis: 'Esterilización',
      treatment: 'Cirugía de esterilización exitosa',
      notes: 'Recuperación rápida, sin complicaciones'
    },
    {
      id: 3,
      date: '2023-06-10',
      type: 'Emergencia',
      veterinarian: 'Dra. Ana López',
      clinic: 'Urgencias Veterinarias 24h',
      diagnosis: 'Gastroenteritis leve',
      treatment: 'Tratamiento con probióticos y dieta blanda',
      notes: 'Mejoría completa en 3 días'
    }
  ];

  const weightHistory: WeightRecord[] = [
    { date: '2023-01', weight: 22 },
    { date: '2023-03', weight: 24 },
    { date: '2023-06', weight: 26 },
    { date: '2023-09', weight: 27 },
    { date: '2023-12', weight: 28 },
    { date: '2024-01', weight: 28 }
  ];

  const getSexIcon = (sex: string) => {
    return sex === 'Macho' ? '♂️' : '♀️';
  };

  const getSexColor = (sex: string) => {
    return sex === 'Macho' ? 'text-blue-600' : 'text-pink-600';
  };

  const handleEditPet = () => {
    setIsEditFormOpen(true);
  };

  const handleSavePet = (updatedPet: Pet) => {
    setCurrentPet(updatedPet);
    console.log('Mascota actualizada:', updatedPet);
  };

  const handleSharePet = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentPet.name} - Mi mascota en PetCare`,
        text: `Conoce a ${currentPet.name}, mi ${currentPet.animal.toLowerCase()} ${currentPet.breed}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(`Perfil de ${currentPet.name} copiado al portapapeles`);
    }
  };

  const handleContactVet = () => {
    // Navegar a la sección veterinario con filtro de esta mascota
    onNavigate('vet');
  };

  const handleEmergencyContact = () => {
    if (currentPet.emergencyContact) {
      window.location.href = `tel:${currentPet.emergencyContact}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-4 pb-20">
        {/* Header con botón de regreso */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#E55826]"
            >
              <ArrowLeft size={20} />
              <span>Volver a Mis Mascotas</span>
            </button>
            <div className="flex gap-2">
              <button 
                onClick={handleSharePet}
                className="p-2 rounded-lg bg-[#EE9444] hover:bg-[#E55826] transition-colors"
              >
                <Share2 size={16} color="white" />
              </button>
              <button 
                onClick={handleEditPet}
                className="p-2 rounded-lg bg-[#E55826] hover:bg-[#d14918] transition-colors"
              >
                <Edit size={16} color="white" />
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-4">
              <ImageWithFallback 
                src={currentPet.image}
                alt={currentPet.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#3D291D] flex items-center gap-2">
                  {currentPet.name}
                  <span className={getSexColor(currentPet.sex)}>{getSexIcon(currentPet.sex)}</span>
                </h1>
                <p className="text-[#B58568] mb-2">{currentPet.animal} • {currentPet.breed}</p>
                <div className="flex items-center gap-4 text-sm text-[#B58568]">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {currentPet.age}
                  </span>
                  <span className="flex items-center gap-1">
                    <Weight size={14} />
                    {currentPet.weight}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold text-[#3D291D] mb-4">Información Detallada</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[#B58568]">Fecha de nacimiento:</span>
                <p className="font-semibold text-[#3D291D]">{currentPet.birthDate || '15/03/2021'}</p>
              </div>
              <div>
                <span className="text-[#B58568]">Color:</span>
                <p className="font-semibold text-[#3D291D]">{currentPet.color || 'Dorado'}</p>
              </div>
              <div>
                <span className="text-[#B58568]">Microchip:</span>
                <p className="font-semibold text-[#3D291D]">{currentPet.microchip || '982123456789012'}</p>
              </div>
              <div>
                <span className="text-[#B58568]">Propietario:</span>
                <p className="font-semibold text-[#3D291D]">{currentPet.owner || 'Juan Pérez'}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-[#B58568]">Descripción:</span>
              <p className="font-semibold text-[#3D291D] mt-1">{currentPet.description}</p>
            </div>
          </div>
        </div>

        {/* Seguimiento de peso */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold text-[#3D291D] mb-4">Seguimiento de Peso</h2>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: '#B58568' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#B58568' }}
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#E55826" 
                    strokeWidth={3}
                    dot={{ fill: '#E55826', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-sm text-[#B58568]">Peso actual</p>
                <p className="font-semibold text-[#E55826]">28 kg</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#B58568]">Peso ideal</p>
                <p className="font-semibold text-[#3D291D]">25-30 kg</p>
              </div>
              <button className="bg-[#EE9444] text-white px-4 py-2 rounded-lg text-sm">
                Registrar Peso
              </button>
            </div>
          </div>
        </div>

        {/* Historial médico */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-[#3D291D]">Historial Médico</h2>
              <button 
                onClick={handleContactVet}
                className="bg-[#E55826] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <Stethoscope size={16} />
                Veterinarios
              </button>
            </div>
            
            <div className="space-y-4">
              {medicalHistory.map((record) => (
                <div key={record.id} className="border border-[#B58568] border-opacity-30 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-[#3D291D]">{record.type}</h3>
                      <p className="text-sm text-[#B58568]">{record.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#3D291D]">{record.veterinarian}</p>
                      <p className="text-xs text-[#B58568]">{record.clinic}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-semibold text-[#3D291D]">Diagnóstico:</span> {record.diagnosis}</p>
                    <p className="text-sm"><span className="font-semibold text-[#3D291D]">Tratamiento:</span> {record.treatment}</p>
                    {record.notes && (
                      <p className="text-sm"><span className="font-semibold text-[#3D291D]">Notas:</span> {record.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-[#EE9444] text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Plus size={16} />
              Agregar Visita Médica
            </button>
          </div>
        </div>

        {/* Próximas citas */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold text-[#3D291D] mb-4">Próximas Citas</h2>
            <div className="bg-[#FAE5A1] bg-opacity-50 rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-[#3D291D]">Vacunación Anual</p>
                  <p className="text-sm text-[#B58568]">Dr. María González</p>
                  <p className="text-sm text-[#B58568] flex items-center gap-1">
                    <MapPin size={12} />
                    Clínica Veterinaria San Martín
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#E55826]">15 Feb 2024</p>
                  <p className="text-sm text-[#B58568]">10:30 AM</p>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#E55826] text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Calendar size={16} />
              Agendar Nueva Cita
            </button>
          </div>
        </div>

        {/* Información de emergencia */}
        <div className="px-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <Heart size={16} />
              Contacto de Emergencia
            </h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-red-700">
                  <span className="font-semibold">Teléfono:</span> {currentPet.emergencyContact || '+34 123 456 789'}
                </p>
                <p className="text-sm text-red-700">
                  <span className="font-semibold">Hospital 24h:</span> Urgencias Veterinarias Central
                </p>
              </div>
              <button 
                onClick={handleEmergencyContact}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
              >
                <Phone size={16} />
                Llamar
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigationPets onNavigate={onNavigate} />
      
      <EditPetForm 
        isOpen={isEditFormOpen}
        pet={currentPet}
        onClose={() => setIsEditFormOpen(false)}
        onSave={handleSavePet}
      />
    </div>
  );
}