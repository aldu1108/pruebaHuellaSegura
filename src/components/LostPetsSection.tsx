import { useState } from 'react';
import { ReportLostPetForm } from './ReportLostPetForm';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AlertTriangle, Search, Plus, Eye, MapPin, Calendar } from 'lucide-react';

export function LostPetsSection() {
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);

  const handleReportSubmit = (reportData: any) => {
    console.log('Nuevo reporte desde home:', reportData);
    alert('¡Reporte enviado! Serás redirigido a la sección de mascotas perdidas.');
    // Aquí podrías navegar a la página de mascotas perdidas
  };

  // Mascotas perdidas recientes para mostrar en home
  const recentLostPets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Perro Labrador',
      location: 'Parque del Retiro',
      daysLost: 3,
      hasReward: true,
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMGRvZyUyMGhvbGRpbmclMjBzdGlja3xlbnwxfHx8fDE3NTYwNjI0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Mimi',
      type: 'Gato Siamés',
      location: 'Gran Vía',
      daysLost: 5,
      hasReward: false,
      image: 'https://images.unsplash.com/photo-1573824774784-1de3e8b13ce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#3D291D] flex items-center gap-2">
          <Search size={20} />
          Mascotas Perdidas
        </h2>
        <button className="text-[#E55826] text-sm">Ver todas</button>
      </div>

      {/* Botón de reporte de emergencia */}
      <div className="mb-4">
        <button 
          onClick={() => setIsReportFormOpen(true)}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle size={20} />
            <span className="font-semibold">¡Reportar Mascota Perdida!</span>
          </div>
        </button>
      </div>

      {/* Lista de mascotas perdidas recientes */}
      <div className="space-y-3">
        {recentLostPets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg shadow-md p-3 border-l-4 border-red-500">
            <div className="flex gap-3">
              <div className="relative">
                <ImageWithFallback 
                  src={pet.image}
                  alt={pet.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                {pet.hasReward && (
                  <div className="absolute -top-1 -right-1 bg-[#E55826] text-white text-xs px-1 py-0.5 rounded-full">
                    💰
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-[#3D291D]">{pet.name}</h3>
                  <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    PERDIDO
                  </span>
                </div>
                <p className="text-sm text-[#B58568] mb-1">{pet.type}</p>
                <div className="flex items-center gap-4 text-xs text-[#B58568]">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {pet.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    Hace {pet.daysLost} días
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Llamada a la acción */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Eye size={16} className="text-yellow-600" />
          <span className="font-semibold text-yellow-800">¿Has visto alguna mascota perdida?</span>
        </div>
        <p className="text-yellow-700 text-sm mb-2">
          Tu ayuda puede ser crucial para reunir a una familia con su mascota.
        </p>
        <button className="w-full bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-2 rounded-lg text-sm font-semibold transition-colors">
          Ver Todas las Mascotas Perdidas
        </button>
      </div>

      <ReportLostPetForm 
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}