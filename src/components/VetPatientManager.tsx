import { useState } from 'react';
import { Search, Filter, User, Phone, Mail, Calendar, MapPin, ChevronLeft, Plus, Eye, Edit } from 'lucide-react';
import { BottomNavigationVet } from './BottomNavigationVet';

interface Patient {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  gender: 'macho' | 'hembra';
  image: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerAddress: string;
  microchip?: string;
  registrationDate: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'activo' | 'inactivo';
  totalVisits: number;
  allergies?: string[];
  chronicConditions?: string[];
  notes?: string;
}

interface VetPatientManagerProps {
  onBack: () => void;
  onViewPatient?: (patientId: number) => void;
  onNavigate?: (page: string) => void;
}

export function VetPatientManager({ onBack, onViewPatient, onNavigate }: VetPatientManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalTypeFilter, setAnimalTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: 'Luna',
      type: 'Perro',
      breed: 'Golden Retriever',
      age: '3 años',
      weight: '28 kg',
      gender: 'hembra',
      image: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ownerName: 'María Rodríguez',
      ownerPhone: '+34 666 123 456',
      ownerEmail: 'maria.rodriguez@email.com',
      ownerAddress: 'Calle Gran Vía 123, Madrid',
      microchip: '982000123456789',
      registrationDate: '2023-06-15',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      status: 'activo',
      totalVisits: 8,
      allergies: ['Polen de gramíneas'],
      notes: 'Muy activa y sociable. Excelente temperamento.'
    },
    {
      id: 2,
      name: 'Whiskers',
      type: 'Gato',
      breed: 'Persa',
      age: '5 años',
      weight: '4.2 kg',
      gender: 'macho',
      image: 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDQ4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      ownerName: 'Carlos Gómez',
      ownerPhone: '+34 666 789 012',
      ownerEmail: 'carlos.gomez@email.com',
      ownerAddress: 'Avenida de la Paz 45, Barcelona',
      microchip: '982000987654321',
      registrationDate: '2022-03-20',
      lastVisit: '2024-01-10',
      status: 'activo',
      totalVisits: 12,
      chronicConditions: ['Problemas renales leves'],
      notes: 'Requiere dieta especial para cuidado renal.'
    },
    {
      id: 3,
      name: 'Max',
      type: 'Perro',
      breed: 'Pastor Alemán',
      age: '7 años',
      weight: '35 kg',
      gender: 'macho',
      image: 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTU5NjEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ownerName: 'Ana López',
      ownerPhone: '+34 666 345 678',
      ownerEmail: 'ana.lopez@email.com',
      ownerAddress: 'Plaza Mayor 12, Valencia',
      microchip: '982000555666777',
      registrationDate: '2020-11-08',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-02-28',
      status: 'activo',
      totalVisits: 23,
      chronicConditions: ['Displasia de cadera leve'],
      allergies: ['Algunos antibióticos'],
      notes: 'Perro guardian excelente. Necesita seguimiento de displasia.'
    },
    {
      id: 4,
      name: 'Kiwi',
      type: 'Ave',
      breed: 'Loro Amazonas',
      age: '8 años',
      weight: '0.5 kg',
      gender: 'hembra',
      image: 'https://images.unsplash.com/photo-1700048802079-ec47d07f7919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJyb3QlMjBjb2xvcmZ1bCUyMGJpcmR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      ownerName: 'Roberto Silva',
      ownerPhone: '+34 666 901 234',
      ownerEmail: 'roberto.silva@email.com',
      ownerAddress: 'Calle de Alcalá 88, Madrid',
      registrationDate: '2021-05-12',
      lastVisit: '2023-10-15',
      status: 'activo',
      totalVisits: 6,
      notes: 'Ave muy inteligente y vocal. Dieta balanceada especial para loros.'
    },
    {
      id: 5,
      name: 'Bella',
      type: 'Perro',
      breed: 'Labrador',
      age: '2 años',
      weight: '25 kg',
      gender: 'hembra',
      image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMGRvZ3xlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ownerName: 'Pedro Martín',
      ownerPhone: '+34 666 567 890',
      ownerEmail: 'pedro.martin@email.com',
      ownerAddress: 'Paseo de la Castellana 200, Madrid',
      microchip: '982000111222333',
      registrationDate: '2023-09-30',
      lastVisit: '2024-01-12',
      status: 'activo',
      totalVisits: 4,
      notes: 'Cachorra muy enérgica. En proceso de adiestramiento básico.'
    }
  ]);

  const animalTypes = Array.from(new Set(patients.map(p => p.type)));

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = animalTypeFilter === 'all' || patient.type === animalTypeFilter;
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewPatientDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    return status === 'activo' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'macho' ? '♂' : '♀';
  };

  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'activo').length;
  const dogsCount = patients.filter(p => p.type === 'Perro').length;
  const catsCount = patients.filter(p => p.type === 'Gato').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#FAE5A1] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-[#EE9444] hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-[#3D291D]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#3D291D]">Pacientes</h1>
            <p className="text-sm text-[#3D291D] opacity-80">Gestiona las mascotas atendidas</p>
          </div>
        </div>
        <button className="bg-[#E55826] hover:bg-[#d14920] text-white p-2 rounded-lg transition-colors">
          <Plus size={20} />
        </button>
      </div>

      {/* Estadísticas */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="font-semibold text-[#3D291D] mb-3">Resumen de Pacientes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-[#E55826]">{totalPatients}</div>
              <div className="text-xs text-[#B58568]">Total</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#E55826]">{activePatients}</div>
              <div className="text-xs text-[#B58568]">Activos</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#E55826]">{dogsCount}</div>
              <div className="text-xs text-[#B58568]">Perros</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#E55826]">{catsCount}</div>
              <div className="text-xs text-[#B58568]">Gatos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
              <input
                type="text"
                placeholder="Buscar por nombre, dueño o raza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={animalTypeFilter}
                onChange={(e) => setAnimalTypeFilter(e.target.value)}
                className="flex-1 p-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
              >
                <option value="all">Todos los tipos</option>
                {animalTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
              >
                <option value="all">Todos los estados</option>
                <option value="activo">Activos</option>
                <option value="inactivo">Inactivos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de pacientes */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#3D291D]">
            Pacientes ({filteredPatients.length})
          </h2>
        </div>

        {filteredPatients.length > 0 ? (
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={patient.image} 
                      alt={patient.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-[#3D291D]">{patient.name}</h3>
                            <span className="text-[#E55826]">{getGenderIcon(patient.gender)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(patient.status)}`}>
                              {patient.status}
                            </span>
                          </div>
                          <p className="text-sm text-[#B58568]">{patient.breed} • {patient.age} • {patient.weight}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center gap-1 text-sm text-[#3D291D] mb-1">
                          <User size={12} />
                          {patient.ownerName}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#B58568]">
                          <div className="flex items-center gap-1">
                            <Phone size={10} />
                            {patient.ownerPhone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={10} />
                            Última visita: {new Date(patient.lastVisit).toLocaleDateString('es-ES')}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-[#B58568] mb-3">
                        <div className="flex items-center justify-between">
                          <span>{patient.totalVisits} visitas totales</span>
                          {patient.nextAppointment && (
                            <span className="text-[#E55826]">
                              Próxima cita: {new Date(patient.nextAppointment).toLocaleDateString('es-ES')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Condiciones especiales */}
                      {(patient.allergies || patient.chronicConditions) && (
                        <div className="mb-3 text-xs">
                          {patient.allergies && (
                            <div className="mb-1">
                              <span className="text-red-600">⚠ Alergias: </span>
                              <span className="text-[#B58568]">{patient.allergies.join(', ')}</span>
                            </div>
                          )}
                          {patient.chronicConditions && (
                            <div>
                              <span className="text-orange-600">📋 Condiciones: </span>
                              <span className="text-[#B58568]">{patient.chronicConditions.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2 border-t border-gray-100">
                        <button 
                          onClick={() => handleViewPatientDetails(patient)}
                          className="flex-1 px-3 py-2 bg-[#EE9444] hover:bg-[#E55826] text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye size={14} />
                          Ver Detalles
                        </button>
                        <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                          <Edit size={14} />
                          Editar
                        </button>
                        {onViewPatient && (
                          <button 
                            onClick={() => onViewPatient(patient.id)}
                            className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                          >
                            Historial
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <User size={48} className="text-[#B58568] mx-auto mb-4" />
            <h3 className="font-semibold text-[#3D291D] mb-2">No se encontraron pacientes</h3>
            <p className="text-[#B58568] text-sm mb-4">
              No hay pacientes que coincidan con los filtros aplicados.
            </p>
            <button className="px-4 py-2 bg-[#E55826] hover:bg-[#d14920] text-white rounded-lg transition-colors">
              Agregar Nuevo Paciente
            </button>
          </div>
        )}
      </div>

      {/* Modal de detalles del paciente */}
      {isDetailModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#3D291D]">Detalles de {selectedPatient.name}</h3>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ×
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src={selectedPatient.image} 
                  alt={selectedPatient.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold text-[#3D291D]">{selectedPatient.name}</h2>
                    <span className="text-xl text-[#E55826]">{getGenderIcon(selectedPatient.gender)}</span>
                    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status}
                    </span>
                  </div>
                  <p className="text-[#B58568] mb-1">{selectedPatient.type} • {selectedPatient.breed}</p>
                  <p className="text-[#B58568]">{selectedPatient.age} • {selectedPatient.weight}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información del animal */}
                <div>
                  <h4 className="font-semibold text-[#3D291D] mb-3">Información del Animal</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Microchip:</span> {selectedPatient.microchip || 'No registrado'}</div>
                    <div><span className="font-medium">Fecha de registro:</span> {new Date(selectedPatient.registrationDate).toLocaleDateString('es-ES')}</div>
                    <div><span className="font-medium">Última visita:</span> {new Date(selectedPatient.lastVisit).toLocaleDateString('es-ES')}</div>
                    <div><span className="font-medium">Total de visitas:</span> {selectedPatient.totalVisits}</div>
                    {selectedPatient.nextAppointment && (
                      <div><span className="font-medium">Próxima cita:</span> {new Date(selectedPatient.nextAppointment).toLocaleDateString('es-ES')}</div>
                    )}
                  </div>
                </div>

                {/* Información del propietario */}
                <div>
                  <h4 className="font-semibold text-[#3D291D] mb-3">Información del Propietario</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      {selectedPatient.ownerName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      {selectedPatient.ownerPhone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      {selectedPatient.ownerEmail}
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="mt-0.5" />
                      <span>{selectedPatient.ownerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Condiciones médicas */}
                {(selectedPatient.allergies || selectedPatient.chronicConditions) && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-[#3D291D] mb-3">Condiciones Médicas</h4>
                    <div className="space-y-2 text-sm">
                      {selectedPatient.allergies && (
                        <div>
                          <span className="font-medium text-red-600">Alergias:</span>
                          <div className="ml-4">{selectedPatient.allergies.join(', ')}</div>
                        </div>
                      )}
                      {selectedPatient.chronicConditions && (
                        <div>
                          <span className="font-medium text-orange-600">Condiciones Crónicas:</span>
                          <div className="ml-4">{selectedPatient.chronicConditions.join(', ')}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notas */}
                {selectedPatient.notes && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-[#3D291D] mb-3">Notas</h4>
                    <p className="text-sm text-[#B58568] bg-gray-50 p-3 rounded-lg">
                      {selectedPatient.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button className="px-4 py-2 bg-[#E55826] hover:bg-[#d14920] text-white rounded-lg transition-colors">
                Ver Historial Completo
              </button>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 text-[#B58568] border border-[#B58568] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer de navegación */}
      <BottomNavigationVet 
        onNavigate={onNavigate || (() => {})} 
        currentSection="patients"
        onSectionChange={() => {}}
      />
    </div>
  );
}