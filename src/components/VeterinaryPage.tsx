import { useState } from 'react';
import { Header } from './Header';
import { MedicalRecordCard } from './MedicalRecordCard';
import { MedicalRecordDetailModal } from './MedicalRecordDetailModal';
import { AddMedicalRecordForm } from './AddMedicalRecordForm';
import { BottomNavigationVet } from './BottomNavigationVet';
import { VetAppointmentScheduler } from './VetAppointmentScheduler';
import { VetDocumentManager } from './VetDocumentManager';
import { VetPatientManager } from './VetPatientManager';
import { Search, Filter, Calendar, TrendingUp, TrendingDown, Plus, Stethoscope, CheckCircle, Users, FileText, CalendarDays, BarChart3 } from 'lucide-react';

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

interface NewMedicalRecord {
  petName: string;
  date: string;
  time: string;
  type: string;
  veterinarian: string;
  clinic: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  cost: string;
  nextAppointment?: string;
}

interface VeterinaryPageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function VeterinaryPage({ onNavigate, onLogout }: VeterinaryPageProps) {
  const [currentSection, setCurrentSection] = useState<'dashboard' | 'appointments' | 'patients' | 'documents' | 'records'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'recent' | 'old'>('recent');
  const [selectedPet, setSelectedPet] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: 1,
      petName: 'Luna',
      petImage: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-01-15',
      type: 'Consulta General',
      veterinarian: 'María González',
      clinic: 'Clínica Veterinaria San Martín',
      diagnosis: 'Estado de salud excelente',
      treatment: 'Vacunación anual completa',
      notes: 'Peso ideal, muy activo y saludable. Próxima revisión en 6 meses.',
      cost: '€85'
    },
    {
      id: 2,
      petName: 'Whiskers',
      petImage: 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDQ4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-01-10',
      type: 'Emergencia',
      veterinarian: 'Carlos Rodríguez',
      clinic: 'Hospital Veterinario Central',
      diagnosis: 'Intoxicación alimentaria leve',
      treatment: 'Suero intravenoso y medicación antiemética',
      notes: 'Recuperación completa en 24 horas. Evitar alimentos humanos.',
      cost: '€150'
    },
    {
      id: 3,
      petName: 'Max',
      petImage: 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTU5NjEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2023-12-20',
      type: 'Cirugía',
      veterinarian: 'Ana López',
      clinic: 'Clínica Veterinaria Especializada',
      diagnosis: 'Extracción de masa benigna',
      treatment: 'Cirugía menor exitosa',
      notes: 'Resultado de biopsia: masa benigna. Sin complicaciones post-operatorias.',
      cost: '€320'
    },
    {
      id: 4,
      petName: 'Luna',
      petImage: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2023-11-08',
      type: 'Vacunación',
      veterinarian: 'María González',
      clinic: 'Clínica Veterinaria San Martín',
      diagnosis: 'Vacunación preventiva',
      treatment: 'Vacuna pentavalente y antirrábica',
      notes: 'Sin reacciones adversas. Protección completa por 1 año.',
      cost: '€65'
    },
    {
      id: 5,
      petName: 'Kiwi',
      petImage: 'https://images.unsplash.com/photo-1700048802079-ec47d07f7919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJyb3QlMjBjb2xvcmZ1bCUyMGJpcmR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2023-10-15',
      type: 'Consulta General',
      veterinarian: 'Roberto Silva',
      clinic: 'Clínica Veterinaria Exóticos',
      diagnosis: 'Revisión rutinaria aves',
      treatment: 'Corte de uñas y pico',
      notes: 'Estado de salud perfecto. Dieta balanceada recomendada.',
      cost: '€45'
    }
  ]);

  const pets = ['Luna', 'Whiskers', 'Max', 'Kiwi'];

  // Mapear mascotas a imágenes para nuevos registros
  const petImages = {
    'Luna': 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'Whiskers': 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDQ4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'Max': 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTU5NjEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'Kiwi': 'https://images.unsplash.com/photo-1700048802079-ec47d07f7919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJyb3QlMjBjb2xvcmZ1bCUyMGJpcmR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  const filteredRecords = medicalRecords
    .filter(record => {
      const matchesSearch = record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.clinic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPet = selectedPet === 'all' || record.petName === selectedPet;
      return matchesSearch && matchesPet;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'recent' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  const handleViewDetails = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleOpenAddForm = () => {
    setIsAddFormOpen(true);
  };

  const handleCloseAddForm = () => {
    setIsAddFormOpen(false);
  };

  const handleSaveNewRecord = (newRecord: NewMedicalRecord) => {
    // Crear nuevo registro médico con ID único
    const record: MedicalRecord = {
      id: Math.max(...medicalRecords.map(r => r.id)) + 1,
      petName: newRecord.petName,
      petImage: petImages[newRecord.petName as keyof typeof petImages] || '',
      date: newRecord.date,
      type: newRecord.type,
      veterinarian: newRecord.veterinarian,
      clinic: newRecord.clinic,
      diagnosis: newRecord.diagnosis,
      treatment: newRecord.treatment,
      notes: newRecord.notes,
      cost: newRecord.cost ? `€${newRecord.cost}` : undefined
    };

    // Agregar al inicio de la lista para mostrar primero
    setMedicalRecords([record, ...medicalRecords]);
    
    // Mostrar mensaje de éxito
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);

    // TODO: Si se definió próxima cita, agregar al calendario de recordatorios
    if (newRecord.nextAppointment) {
      console.log('Próxima cita programada para:', newRecord.nextAppointment);
      // Aquí se podría integrar con el sistema de recordatorios
    }
  };

  const totalCost = medicalRecords.reduce((sum, record) => {
    const cost = record.cost ? parseFloat(record.cost.replace('€', '')) : 0;
    return sum + cost;
  }, 0);

  // Si estamos en una subsección, mostrar el componente correspondiente
  if (currentSection === 'appointments') {
    return <VetAppointmentScheduler onBack={() => setCurrentSection('dashboard')} />;
  }
  
  if (currentSection === 'patients') {
    return <VetPatientManager onBack={() => setCurrentSection('dashboard')} />;
  }
  
  if (currentSection === 'documents') {
    return <VetDocumentManager onBack={() => setCurrentSection('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-20 left-4 right-4 z-40">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top">
            <CheckCircle size={20} />
            <div>
              <p className="font-semibold">¡Consulta registrada exitosamente!</p>
              <p className="text-sm opacity-90">El historial médico ha sido actualizado</p>
            </div>
          </div>
        </div>
      )}
      
      <main className="pt-4 pb-20">
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold text-[#3D291D] mb-2">Panel Veterinario 🏥</h1>
          <p className="text-[#B58568]">Sistema completo de gestión veterinaria</p>
        </div>

        {/* Menú de navegación principal */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setCurrentSection('patients')}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#EE9444] rounded-full flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#3D291D]">Pacientes</h3>
                <p className="text-xs text-[#B58568]">Gestionar mascotas</p>
              </div>
            </button>

            <button 
              onClick={() => setCurrentSection('appointments')}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#E55826] rounded-full flex items-center justify-center">
                <CalendarDays size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#3D291D]">Agenda</h3>
                <p className="text-xs text-[#B58568]">Citas y turnos</p>
              </div>
            </button>

            <button 
              onClick={() => setCurrentSection('documents')}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#B58568] rounded-full flex items-center justify-center">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#3D291D]">Documentos</h3>
                <p className="text-xs text-[#B58568]">Archivos médicos</p>
              </div>
            </button>

            <button 
              onClick={() => setCurrentSection('records')}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#FAE5A1] border-2 border-[#EE9444] rounded-full flex items-center justify-center">
                <Stethoscope size={24} className="text-[#3D291D]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#3D291D]">Historiales</h3>
                <p className="text-xs text-[#B58568]">Registros médicos</p>
              </div>
            </button>
          </div>
        </div>

        {/* Vista de historiales cuando se selecciona */}
        {currentSection === 'records' && (
          <>
            {/* Estadísticas rápidas */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#3D291D]">Resumen del Historial</h3>
                  <button 
                    onClick={() => setCurrentSection('dashboard')}
                    className="text-[#E55826] text-sm hover:underline"
                  >
                    ← Volver al panel
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#E55826]">{medicalRecords.length}</div>
                    <div className="text-sm text-[#B58568]">Consultas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#E55826]">€{totalCost}</div>
                    <div className="text-sm text-[#B58568]">Gasto total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#E55826]">4</div>
                    <div className="text-sm text-[#B58568]">Veterinarios</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de búsqueda y filtros */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                {/* Búsqueda */}
                <div className="relative mb-4">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="text"
                    placeholder="Buscar por mascota, veterinario, clínica..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                  />
                </div>

                {/* Filtros */}
                <div className="flex gap-3">
                  {/* Filtro por mascota */}
                  <select
                    value={selectedPet}
                    onChange={(e) => setSelectedPet(e.target.value)}
                    className="flex-1 p-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                  >
                    <option value="all">Todas las mascotas</option>
                    {pets.map(pet => (
                      <option key={pet} value={pet}>{pet}</option>
                    ))}
                  </select>

                  {/* Ordenar por fecha */}
                  <button
                    onClick={() => setSortOrder(sortOrder === 'recent' ? 'old' : 'recent')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E55826] text-white rounded-lg text-sm"
                  >
                    {sortOrder === 'recent' ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                    {sortOrder === 'recent' ? 'Recientes' : 'Antiguos'}
                  </button>
                </div>
              </div>
            </div>

            {/* Botón para nueva consulta */}
            <div className="px-4 mb-6">
              <button 
                onClick={handleOpenAddForm}
                className="w-full bg-[#EE9444] hover:bg-[#E55826] transition-colors rounded-lg p-4 flex items-center justify-center gap-3 shadow-md"
              >
                <Plus size={20} className="text-white" />
                <span className="text-white font-semibold">Registrar Nueva Consulta</span>
              </button>
            </div>

            {/* Lista de registros médicos */}
            <div className="px-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#3D291D]">
                  Historial Médico ({filteredRecords.length})
                </h2>
                <button className="flex items-center gap-2 text-[#E55826] text-sm">
                  <Filter size={16} />
                  Más filtros
                </button>
              </div>
              
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <MedicalRecordCard 
                    key={record.id} 
                    record={record} 
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Stethoscope size={48} className="text-[#B58568] mx-auto mb-4" />
                  <h3 className="font-semibold text-[#3D291D] mb-2">No se encontraron registros</h3>
                  <p className="text-[#B58568] text-sm">
                    Intenta ajustar los filtros de búsqueda o agrega una nueva consulta.
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Vista principal del dashboard */}
        {currentSection === 'dashboard' && (
          <>
            {/* Estadísticas generales */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-[#3D291D] mb-3">Resumen de Actividad</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-[#E55826]">5</div>
                    <div className="text-xs text-[#B58568]">Pacientes Activos</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#E55826]">4</div>
                    <div className="text-xs text-[#B58568]">Citas Hoy</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#E55826]">{medicalRecords.length}</div>
                    <div className="text-xs text-[#B58568]">Consultas Total</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#E55826]">15</div>
                    <div className="text-xs text-[#B58568]">Documentos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Próximas citas */}
            <div className="px-4 mb-6">
              <div className="bg-[#FAE5A1] bg-opacity-50 border border-[#EE9444] rounded-lg p-4">
                <h3 className="font-semibold text-[#3D291D] mb-2 flex items-center gap-2">
                  <Calendar size={16} />
                  Próximas Citas de Hoy
                </h3>
                <div className="text-sm text-[#3D291D] space-y-1">
                  <div className="flex justify-between">
                    <span>• 09:00 - Luna (Consulta General)</span>
                    <span className="text-[#E55826]">Confirmada</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• 10:30 - Whiskers (Vacunación)</span>
                    <span className="text-yellow-600">Pendiente</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• 12:00 - Max (Post-operatorio)</span>
                    <span className="text-[#E55826]">Confirmada</span>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentSection('appointments')}
                  className="mt-3 text-[#E55826] text-sm font-semibold hover:underline"
                >
                  Ver agenda completa →
                </button>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-[#3D291D] mb-3">Acciones Rápidas</h3>
                <div className="space-y-3">
                  <button 
                    onClick={handleOpenAddForm}
                    className="w-full bg-[#EE9444] hover:bg-[#E55826] transition-colors rounded-lg p-3 flex items-center gap-3 text-white"
                  >
                    <Plus size={18} />
                    <span>Registrar Nueva Consulta</span>
                  </button>
                  <button 
                    onClick={() => setCurrentSection('appointments')}
                    className="w-full bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg p-3 flex items-center gap-3 text-white"
                  >
                    <CalendarDays size={18} />
                    <span>Ver Agenda del Día</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      
      <BottomNavigationVet 
        onNavigate={onNavigate} 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      
      {/* Modal de detalles */}
      <MedicalRecordDetailModal 
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Formulario de nueva consulta */}
      <AddMedicalRecordForm 
        isOpen={isAddFormOpen}
        onClose={handleCloseAddForm}
        onSave={handleSaveNewRecord}
      />
    </div>
  );
}