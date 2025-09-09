import { useState } from 'react';
import { Header } from './Header';
import { PetCard } from './PetCard';
import { AddPetButton } from './AddPetButton';
import { AddPetForm } from './AddPetForm';
import { BottomNavigationPets } from './BottomNavigationPets';
import { PetDetailPage } from './PetDetailPage';
import { Search, Filter } from 'lucide-react';

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

interface PetsProfilePageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function PetsProfilePage({ onNavigate, onLogout }: PetsProfilePageProps) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [pets, setPets] = useState<Pet[]>([
    {
      id: 1,
      name: 'Luna',
      animal: 'Perro',
      breed: 'Golden Retriever',
      age: '3 años',
      sex: 'Hembra',
      weight: '28 kg',
      description: 'Luna es una perra muy cariñosa y juguetona. Le encanta nadar y jugar en el parque. Es muy obediente y sociable con otros perros.',
      image: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      birthDate: '15/03/2021',
      color: 'Dorado',
      microchip: '982123456789012',
      owner: 'Juan Pérez',
      emergencyContact: '+34 123 456 789'
    },
    {
      id: 2,
      name: 'Whiskers',
      animal: 'Gato',
      breed: 'Persa',
      age: '2 años',
      sex: 'Macho',
      weight: '4.5 kg',
      description: 'Whiskers es un gato muy tranquilo y elegante. Le gusta dormir en lugares altos y es muy independiente pero cariñoso.',
      image: 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDQ4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      birthDate: '10/08/2022',
      color: 'Gris con blanco',
      microchip: '982987654321098',
      owner: 'Juan Pérez',
      emergencyContact: '+34 123 456 789'
    },
    {
      id: 3,
      name: 'Max',
      animal: 'Perro',
      breed: 'Pastor Alemán',
      age: '5 años',
      sex: 'Macho',
      weight: '35 kg',
      description: 'Max es un perro guardián muy leal y protector. Es perfecto para la familia y muy inteligente en el entrenamiento.',
      image: 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTU5NjEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      birthDate: '20/01/2019',
      color: 'Negro y marrón',
      microchip: '982555666777888',
      owner: 'Juan Pérez',
      emergencyContact: '+34 123 456 789'
    },
    {
      id: 4,
      name: 'Kiwi',
      animal: 'Ave',
      breed: 'Loro Amazonas',
      age: '7 años',
      sex: 'Hembra',
      weight: '0.8 kg',
      description: 'Kiwi es una lora muy habladora y sociable. Le encanta imitar sonidos y puede decir más de 50 palabras diferentes.',
      image: 'https://images.unsplash.com/photo-1700048802079-ec47d07f7919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJyb3QlMjBjb2xvcmZ1bCUyMGJpcmR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      birthDate: '05/11/2017',
      color: 'Verde y amarillo',
      microchip: '982111222333444',
      owner: 'Juan Pérez',
      emergencyContact: '+34 123 456 789'
    }
  ]);

  const handleViewMore = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const handleBack = () => {
    setSelectedPet(null);
  };

  const handleAddPet = () => {
    setIsAddFormOpen(true);
  };

  const handleSavePet = (petData: any) => {
    setPets([...pets, petData]);
    console.log('Nueva mascota agregada:', petData);
  };

  if (selectedPet) {
    return (
      <PetDetailPage 
        pet={selectedPet}
        onNavigate={onNavigate}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} onLogout={onLogout} />
      
      <main className="pt-4 pb-20">
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold text-[#3D291D] mb-2">Mis Mascotas 🐾</h1>
          <p className="text-[#B58568]">Gestiona los perfiles de todas tus mascotas</p>
        </div>

        {/* Barra de búsqueda simple */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-3">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                <input
                  type="text"
                  placeholder="Buscar entre mis mascotas..."
                  className="w-full pl-10 pr-4 py-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
                />
              </div>
              <button className="p-2 rounded-lg" style={{ backgroundColor: '#E55826' }}>
                <Filter size={18} color="white" />
              </button>
            </div>
          </div>
        </div>

        <AddPetButton onClick={handleAddPet} />

        {/* Lista de mascotas */}
        <div className="px-4">
          <h2 className="text-lg font-semibold text-[#3D291D] mb-4">
            Mis Mascotas ({pets.length})
          </h2>
          
          {pets.map((pet) => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onViewMore={handleViewMore}
            />
          ))}
        </div>

        {/* Sección de estadísticas */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-[#3D291D] mb-3">Resumen de Mascotas</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#E55826]">🐕</div>
                <div className="text-sm text-[#B58568]">{pets.filter(p => p.animal === 'Perro').length} Perros</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#E55826]">🐱</div>
                <div className="text-sm text-[#B58568]">{pets.filter(p => p.animal === 'Gato').length} Gatos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#E55826]">🦜</div>
                <div className="text-sm text-[#B58568]">{pets.filter(p => p.animal === 'Ave').length} Aves</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigationPets onNavigate={onNavigate} />
      
      <AddPetForm 
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={handleSavePet}
      />
    </div>
  );
}