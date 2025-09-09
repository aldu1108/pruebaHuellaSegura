import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, MapPin, Calendar, Users, Filter, Baby, Dog, Cat, Bird, ArrowRight } from 'lucide-react';

interface AdoptionPet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  location: string;
  shelter: string;
  description: string;
  image: string;
  isUrgent: boolean;
  goodWith: string[];
  vaccinated: boolean;
  sterilized: boolean;
  postedDays: number;
}

export function AdoptionSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dogs' | 'cats' | 'other'>('all');

  const adoptionPets: AdoptionPet[] = [
    {
      id: 1,
      name: 'Carlos',
      type: 'Perro',
      breed: 'Mestizo',
      age: '2 años',
      gender: 'male',
      size: 'medium',
      location: 'Madrid Centro',
      shelter: 'Refugio Esperanza',
      description: 'Carlos es un perro muy cariñoso y juguetón. Le encanta pasear y es perfecto para familias activas.',
      image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      isUrgent: false,
      goodWith: ['niños', 'otros perros'],
      vaccinated: true,
      sterilized: true,
      postedDays: 5
    },
    {
      id: 2,
      name: 'Bella',
      type: 'Gato',
      breed: 'Siamés',
      age: '6 meses',
      gender: 'female',
      size: 'small',
      location: 'Madrid Sur',
      shelter: 'Asociación Felina',
      description: 'Bella es una gatita muy dulce y tranquila. Ideal para apartamentos y personas mayores.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      isUrgent: true,
      goodWith: ['gatos', 'tranquilo'],
      vaccinated: true,
      sterilized: false,
      postedDays: 12
    },
    {
      id: 3,
      name: 'Rocky',
      type: 'Perro',
      breed: 'Pastor Alemán',
      age: '4 años',
      gender: 'male',
      size: 'large',
      location: 'Madrid Norte',
      shelter: 'Protectora Animal',
      description: 'Rocky es un perro leal y protector. Necesita una familia con experiencia en perros grandes.',
      image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      isUrgent: false,
      goodWith: ['adultos', 'casa con jardín'],
      vaccinated: true,
      sterilized: true,
      postedDays: 8
    }
  ];

  const filteredPets = adoptionPets.filter(pet => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'dogs') return pet.type === 'Perro';
    if (selectedCategory === 'cats') return pet.type === 'Gato';
    if (selectedCategory === 'other') return pet.type !== 'Perro' && pet.type !== 'Gato';
    return true;
  });

  const handleAdoptionInterest = (petId: number) => {
    const pet = adoptionPets.find(p => p.id === petId);
    alert(`¡Gracias por tu interés en adoptar a ${pet?.name}! Te contactaremos pronto con ${pet?.shelter}.`);
  };

  const handleViewAllAdoptions = () => {
    alert('Navegando a la página completa de adopción - Por implementar');
  };

  const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
      case 'dogs': return <Dog size={16} />;
      case 'cats': return <Cat size={16} />;
      case 'other': return <Bird size={16} />;
      default: return <Heart size={16} />;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#3D291D] flex items-center gap-2">
          <Heart size={20} className="text-[#E55826]" />
          Adopción
        </h2>
        <button 
          onClick={handleViewAllAdoptions}
          className="text-[#E55826] text-sm hover:underline"
        >
          Ver todas
        </button>
      </div>

      {/* Filtros por categoría */}
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Todos', icon: 'all' },
            { id: 'dogs', label: 'Perros', icon: 'dogs' },
            { id: 'cats', label: 'Gatos', icon: 'cats' },
            { id: 'other', label: 'Otros', icon: 'other' }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#E55826] text-white'
                  : 'bg-white text-[#B58568] border border-[#B58568] border-opacity-30 hover:bg-[#FAE5A1]'
              }`}
            >
              <CategoryIcon category={category.icon} />
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mb-4 bg-gradient-to-r from-[#FAE5A1] to-[#EE9444] bg-opacity-20 rounded-lg p-3">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-[#E55826]">{adoptionPets.length}</div>
            <div className="text-xs text-[#3D291D]">Disponibles</div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#E55826]">{adoptionPets.filter(p => p.isUrgent).length}</div>
            <div className="text-xs text-[#3D291D]">Urgentes</div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#E55826]">15</div>
            <div className="text-xs text-[#3D291D]">Adoptados</div>
          </div>
        </div>
      </div>

      {/* Lista de mascotas en adopción */}
      <div className="space-y-3">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#E55826]">
            <div className="flex gap-3">
              <div className="relative">
                <ImageWithFallback 
                  src={pet.image}
                  alt={pet.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                {pet.isUrgent && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    ⚡
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-[#3D291D] mb-1">{pet.name}</h3>
                    <p className="text-sm text-[#B58568]">{pet.breed} • {pet.age} • {pet.gender === 'male' ? '♂️' : '♀️'}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      pet.isUrgent 
                        ? 'text-red-600 bg-red-100' 
                        : 'text-[#E55826] bg-[#FAE5A1]'
                    }`}>
                      {pet.isUrgent ? 'URGENTE' : 'ADOPCIÓN'}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#3D291D] mb-2 line-clamp-2">{pet.description}</p>

                <div className="flex items-center gap-3 text-xs text-[#B58568] mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {pet.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    Hace {pet.postedDays} días
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={10} />
                    {pet.shelter}
                  </span>
                </div>

                {/* Características */}
                <div className="flex gap-2 mb-3">
                  {pet.vaccinated && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      ✅ Vacunado
                    </span>
                  )}
                  {pet.sterilized && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      ✂️ Esterilizado
                    </span>
                  )}
                </div>

                {/* Botón de adopción */}
                <button 
                  onClick={() => handleAdoptionInterest(pet.id)}
                  className="w-full bg-[#E55826] hover:bg-[#d14918] text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={14} />
                  Me interesa adoptar
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Heart size={16} className="text-blue-600" />
          <span className="font-semibold text-blue-800">¿Quieres ayudar más?</span>
        </div>
        <p className="text-blue-700 text-sm mb-3">
          También puedes ser casa de acogida temporal, hacer donaciones o ser voluntario.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-blue-200 hover:bg-blue-300 text-blue-800 py-2 rounded-lg text-sm font-semibold transition-colors">
            Casa de Acogida
          </button>
          <button className="bg-blue-200 hover:bg-blue-300 text-blue-800 py-2 rounded-lg text-sm font-semibold transition-colors">
            Donar/Voluntario
          </button>
        </div>
      </div>
    </div>
  );
}