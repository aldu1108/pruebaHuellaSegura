import { ImageWithFallback } from './figma/ImageWithFallback';
import { Eye, Calendar, Weight, Heart } from 'lucide-react';

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
}

interface PetCardProps {
  pet: Pet;
  onViewMore: (pet: Pet) => void;
}

export function PetCard({ pet, onViewMore }: PetCardProps) {
  const getSexIcon = (sex: string) => {
    return sex === 'Macho' ? '♂️' : '♀️';
  };

  const getSexColor = (sex: string) => {
    return sex === 'Macho' ? 'text-blue-600' : 'text-pink-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="flex">
        <ImageWithFallback 
          src={pet.image}
          alt={pet.name}
          className="w-32 h-32 object-cover"
        />
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-[#3D291D] flex items-center gap-2">
                {pet.name}
                <span className={getSexColor(pet.sex)}>{getSexIcon(pet.sex)}</span>
              </h3>
              <p className="text-sm text-[#B58568]">{pet.animal} • {pet.breed}</p>
            </div>
            <div className="bg-[#FAE5A1] text-[#3D291D] px-2 py-1 rounded-full text-xs">
              MI MASCOTA
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-[#E55826]" />
              <span className="text-[#B58568]">{pet.age}</span>
            </div>
            <div className="flex items-center gap-1">
              <Weight size={14} className="text-[#E55826]" />
              <span className="text-[#B58568]">{pet.weight}</span>
            </div>
          </div>
          
          <p className="text-sm text-[#3D291D] mb-3 line-clamp-2">{pet.description}</p>
          
          <button 
            onClick={() => onViewMore(pet)}
            className="flex items-center gap-2 bg-[#E55826] text-white px-4 py-2 rounded-lg text-sm w-full justify-center hover:bg-[#d14918] transition-colors"
          >
            <Eye size={16} />
            Ver Perfil Completo
          </button>
        </div>
      </div>
    </div>
  );
}