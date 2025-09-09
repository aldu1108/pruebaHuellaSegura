import { useState } from 'react';
import { Header } from './Header';
import { ReportLostPetButton } from './ReportLostPetButton';
import { ReportLostPetForm } from './ReportLostPetForm';
import { LostPetCard } from './LostPetCard';
import { AdoptionSection } from './AdoptionSection';
import { BottomNavigationSearch } from './BottomNavigationSearch';
import { Search, Filter, MapPin, Calendar, TrendingDown, AlertTriangle, Phone, Heart, Users } from 'lucide-react';

interface LostPet {
  id: number;
  petName: string;
  petType: string;
  breed: string;
  color: string;
  size: string;
  lostDate: string;
  lastSeenLocation: string;
  ownerName: string;
  ownerPhone: string;
  hasReward: boolean;
  rewardAmount?: string;
  petImage: string;
  reportDate: string;
  status: 'active' | 'found' | 'closed';
}

interface LostPetsPageProps {
  onNavigate: (page: string, petId?: number) => void;
  onLogout?: () => void;
  onSearch?: (term: string) => void;
  onFilter?: (filters: string[]) => void;
  searchTerm?: string;
  activeFilters?: string[];
}

export function LostPetsPage({ 
  onNavigate, 
  onLogout, 
  onSearch, 
  onFilter, 
  searchTerm, 
  activeFilters 
}: LostPetsPageProps) {
  const [activeTab, setActiveTab] = useState<'lost' | 'adoption'>('lost');
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [lostPets, setLostPets] = useState<LostPet[]>([
    {
      id: 1,
      petName: 'Buddy',
      petType: 'Perro',
      breed: 'Labrador',
      color: 'Dorado',
      size: 'Grande',
      lostDate: '2024-01-20',
      lastSeenLocation: 'Parque del Retiro, Madrid',
      ownerName: 'Ana García',
      ownerPhone: '+34 666 777 888',
      hasReward: true,
      rewardAmount: '€300',
      petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMGRvZyUyMGhvbGRpbmclMjBzdGlja3xlbnwxfHx8fDE3NTYwNjI0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      reportDate: '2024-01-20T14:30:00Z',
      status: 'active'
    },
    {
      id: 2,
      petName: 'Mimi',
      petType: 'Gato',
      breed: 'Siamés',
      color: 'Crema y marrón',
      size: 'Pequeño',
      lostDate: '2024-01-18',
      lastSeenLocation: 'Calle Gran Vía, 45',
      ownerName: 'Carlos Ruiz',
      ownerPhone: '+34 555 444 333',
      hasReward: false,
      petImage: 'https://images.unsplash.com/photo-1573824774784-1de3e8b13ce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      reportDate: '2024-01-18T09:15:00Z',
      status: 'active'
    },
    {
      id: 3,
      petName: 'Charlie',
      petType: 'Perro',
      breed: 'Beagle',
      color: 'Tricolor',
      size: 'Mediano',
      lostDate: '2024-01-15',
      lastSeenLocation: 'Plaza Mayor',
      ownerName: 'María López',
      ownerPhone: '+34 777 888 999',
      hasReward: true,
      rewardAmount: '€150',
      petImage: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTYwNjI0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      reportDate: '2024-01-15T16:45:00Z',
      status: 'found'
    }
  ]);

  const [sortBy, setSortBy] = useState<'recent' | 'location' | 'reward'>('recent');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'found'>('active');

  const handleReportSubmit = (reportData: any) => {
    const newReport: LostPet = {
      ...reportData,
      id: Date.now(),
      reportDate: new Date().toISOString(),
      status: 'active' as const
    };
    setLostPets([newReport, ...lostPets]);
    console.log('Nuevo reporte de mascota perdida:', newReport);
    alert('¡Reporte publicado! La comunidad ha sido notificada.');
  };

  const handleContact = (pet: LostPet) => {
    if (window.confirm(`¿Llamar a ${pet.ownerName}?`)) {
      window.location.href = `tel:${pet.ownerPhone}`;
    }
  };

  const handleShare = (pet: LostPet) => {
    const shareText = `¡Ayuda a encontrar a ${pet.petName}! ${pet.petType} ${pet.breed} perdido en ${pet.lastSeenLocation}. ${pet.hasReward ? `Recompensa: ${pet.rewardAmount}` : ''} Contacto: ${pet.ownerPhone}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Mascota Perdida: ${pet.petName}`,
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Información de la mascota copiada al portapapeles');
    }
  };

  const handleViewDetails = (pet: LostPet) => {
    alert(`Detalles completos de ${pet.petName} - Por implementar`);
  };

  const filteredAndSortedPets = lostPets
    .filter(pet => {
      const matchesStatus = filterStatus === 'all' || pet.status === filterStatus;
      const matchesSearch = !searchTerm || 
        pet.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.petType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.lastSeenLocation.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lostDate).getTime() - new Date(a.lostDate).getTime();
        case 'location':
          return a.lastSeenLocation.localeCompare(b.lastSeenLocation);
        case 'reward':
          if (a.hasReward && !b.hasReward) return -1;
          if (!a.hasReward && b.hasReward) return 1;
          return 0;
        default:
          return 0;
      }
    });

  const activePetsCount = lostPets.filter(pet => pet.status === 'active').length;
  const foundPetsCount = lostPets.filter(pet => pet.status === 'found').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        onSearch={onSearch}
        searchTerm={searchTerm}
      />
      
      <main className="pt-4 pb-20">
        {/* Tabs Header */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-lg shadow-sm p-1 flex">
            <button
              onClick={() => setActiveTab('lost')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === 'lost'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-[#B58568] hover:bg-gray-50'
              }`}
            >
              <Search size={18} />
              <span className="font-semibold">Mascotas Perdidas</span>
              {activeTab === 'lost' && (
                <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                  ACTIVO
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('adoption')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === 'adoption'
                  ? 'bg-[#E55826] text-white shadow-md'
                  : 'text-[#B58568] hover:bg-gray-50'
              }`}
            >
              <Heart size={18} />
              <span className="font-semibold">Adopción</span>
              {activeTab === 'adoption' && (
                <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                  ACTIVO
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Indicadores rápidos */}
        <div className="px-4 mb-6 grid grid-cols-2 gap-3">
          <div 
            className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
              activeTab === 'lost' 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 bg-white hover:border-red-300'
            }`}
            onClick={() => setActiveTab('lost')}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={16} className="text-red-600" />
              <span className="font-semibold text-red-700">Emergencia</span>
            </div>
            <p className="text-sm text-red-600">{activePetsCount} mascotas perdidas</p>
            <p className="text-xs text-red-500 mt-1">Tu ayuda es crucial</p>
          </div>

          <div 
            className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
              activeTab === 'adoption' 
                ? 'border-[#E55826] bg-[#FAE5A1] bg-opacity-30' 
                : 'border-gray-200 bg-white hover:border-[#EE9444]'
            }`}
            onClick={() => setActiveTab('adoption')}
          >
            <div className="flex items-center gap-2 mb-1">
              <Heart size={16} className="text-[#E55826]" />
              <span className="font-semibold text-[#E55826]">Adopción</span>
            </div>
            <p className="text-sm text-[#3D291D]">3 mascotas disponibles</p>
            <p className="text-xs text-[#B58568] mt-1">1 adopción urgente</p>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {activeTab === 'lost' && (
            <>
              <div className="px-4 mb-6">
                <h1 className="text-2xl font-bold text-[#3D291D] mb-2">Mascotas Perdidas 🔍</h1>
                <p className="text-[#B58568]">Ayuda a reunir familias con sus mascotas</p>
              </div>

              {/* Estadísticas */}
              <div className="px-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">{activePetsCount}</div>
                      <div className="text-sm text-[#B58568]">Perdidas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{foundPetsCount}</div>
                      <div className="text-sm text-[#B58568]">Encontradas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#E55826]">{lostPets.filter(p => p.hasReward).length}</div>
                      <div className="text-sm text-[#B58568]">Con recompensa</div>
                    </div>
                  </div>
                </div>
              </div>

              <ReportLostPetButton onClick={() => setIsReportFormOpen(true)} />

              {/* Filtros y búsqueda */}
              <div className="px-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  {/* Búsqueda */}
                  <div className="relative mb-4">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, raza o ubicación..."
                      value={searchTerm || ''}
                      onChange={(e) => onSearch && onSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                    />
                  </div>

                  {/* Filtros */}
                  <div className="flex gap-3 mb-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="flex-1 p-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                    >
                      <option value="all">Todas</option>
                      <option value="active">Perdidas</option>
                      <option value="found">Encontradas</option>
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="flex-1 p-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                    >
                      <option value="recent">Más recientes</option>
                      <option value="location">Por ubicación</option>
                      <option value="reward">Con recompensa</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lista de mascotas perdidas */}
              <div className="px-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-[#3D291D]">
                    Reportes Activos ({filteredAndSortedPets.length})
                  </h2>
                  <button className="flex items-center gap-2 text-[#E55826] text-sm">
                    <MapPin size={16} />
                    Ver en mapa
                  </button>
                </div>
                
                {filteredAndSortedPets.length > 0 ? (
                  filteredAndSortedPets.map((pet) => (
                    <LostPetCard 
                      key={pet.id} 
                      pet={pet} 
                      onContact={handleContact}
                      onShare={handleShare}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <AlertTriangle size={48} className="text-[#B58568] mx-auto mb-4" />
                    <h3 className="font-semibold text-[#3D291D] mb-2">No se encontraron mascotas</h3>
                    <p className="text-[#B58568] text-sm mb-4">
                      No hay mascotas perdidas que coincidan con tus criterios de búsqueda.
                    </p>
                    <button 
                      onClick={() => setIsReportFormOpen(true)}
                      className="bg-[#E55826] text-white px-6 py-2 rounded-lg hover:bg-[#d14918] transition-colors"
                    >
                      Reportar Mascota Perdida
                    </button>
                  </div>
                )}
              </div>

              {/* Consejos de búsqueda */}
              <div className="px-4 mt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">💡 Consejos para encontrar mascotas perdidas:</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Busca en un radio de 1-2 km del último lugar visto</li>
                    <li>• Publica en grupos locales de Facebook y redes sociales</li>
                    <li>• Contacta refugios y clínicas veterinarias cercanas</li>
                    <li>• Busca temprano en la mañana y al atardecer</li>
                    <li>• Coloca carteles con foto y número de contacto</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === 'adoption' && (
            <div className="px-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#3D291D] mb-2">Adopción de Mascotas ❤️</h1>
                <p className="text-[#B58568]">Dale una segunda oportunidad a una mascota</p>
              </div>
              <AdoptionSection />
            </div>
          )}
        </div>

        {/* Call to Action Footer */}
        <div className="px-4 mt-6">
          <div className="bg-gradient-to-r from-[#FAE5A1] to-[#EE9444] bg-opacity-20 rounded-lg p-4">
            <div className="text-center">
              <h3 className="font-semibold text-[#3D291D] mb-2 flex items-center justify-center gap-2">
                <Heart size={18} className="text-[#E55826]" />
                ¡Cada acción cuenta!
              </h3>
              <p className="text-sm text-[#3D291D] mb-3">
                {activeTab === 'lost' 
                  ? 'Ayuda a reunir familias con sus mascotas perdidas compartiendo y manteniendo los ojos abiertos.'
                  : 'Dale una segunda oportunidad a una mascota. La adopción responsable cambia vidas.'
                }
              </p>
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={() => setActiveTab(activeTab === 'lost' ? 'adoption' : 'lost')}
                  className="bg-white text-[#E55826] px-4 py-2 rounded-lg text-sm font-semibold border border-[#E55826] hover:bg-[#E55826] hover:text-white transition-colors"
                >
                  {activeTab === 'lost' ? 'Ver Adopciones' : 'Ver Perdidas'}
                </button>
                <button 
                  onClick={() => activeTab === 'lost' ? setIsReportFormOpen(true) : null}
                  className="bg-[#E55826] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d14918] transition-colors"
                >
                  {activeTab === 'lost' ? 'Reportar Perdida' : 'Adoptar Ahora'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigationSearch onNavigate={onNavigate} />
      
      <ReportLostPetForm 
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}