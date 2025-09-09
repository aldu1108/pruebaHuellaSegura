import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, Heart } from 'lucide-react';

export function PetSection() {
  const pets = [
    {
      id: 1,
      name: 'Max',
      breed: 'Golden Retriever',
      age: '3 años',
      image: 'https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwb3J0cmFpdCUyMGhhcHB5fGVufDF8fHx8MTc1NjA2MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Gato Persa',
      age: '2 años',
      image: 'https://images.unsplash.com/photo-1665857145482-7747d2b16a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBzaXR0aW5nJTIwY3V0ZXxlbnwxfHx8fDE3NTYwNjAyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const handleAddPet = () => {
    alert('Funcionalidad para agregar mascota - Por implementar');
  };

  const handleAdoptionInterest = () => {
    // Navegar a la página de mascotas perdidas/adopción
    alert('Navegando a la sección de adopción en Mascotas Perdidas...');
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#3D291D]">Mis Mascotas</h2>
        <button 
          onClick={handleAddPet}
          className="text-[#E55826] text-sm hover:underline flex items-center gap-1"
        >
          <Plus size={16} />
          Agregar
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <ImageWithFallback 
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-[#3D291D]">{pet.name}</h3>
              <p className="text-[#B58568]">{pet.breed}</p>
              <p className="text-sm text-[#B58568]">{pet.age}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de adopción promocional */}
      <div className="bg-gradient-to-r from-[#FAE5A1] to-[#EE9444] bg-opacity-30 rounded-lg p-4 border border-[#EE9444] border-opacity-50">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={18} className="text-[#E55826]" />
              <h3 className="font-semibold text-[#3D291D]">¿Buscas una nueva mascota?</h3>
            </div>
            <p className="text-sm text-[#3D291D] mb-3">
              Hay mascotas esperando un hogar. La adopción es amor puro.
            </p>
            <button 
              onClick={handleAdoptionInterest}
              className="bg-[#E55826] hover:bg-[#d14918] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Heart size={14} />
              Ver Mascotas en Adopción
            </button>
          </div>
          <div className="ml-4 opacity-70">
            <div className="text-4xl">🐕🐱</div>
          </div>
        </div>
      </div>
    </div>
  );
}