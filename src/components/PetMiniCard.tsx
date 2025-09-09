import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Weight } from 'lucide-react';

interface Pet {
  id: number;
  name: string;
  animal: string;
  breed: string;
  age: string;
  sex: string;
  weight: string;
  image: string;
}

interface PetMiniCardProps {
  pet: Pet;
  onClick: (pet: Pet) => void;
}

export function PetMiniCard({ pet, onClick }: PetMiniCardProps) {
  const getSexIcon = (sex: string) => {
    return sex === 'Macho' ? '♂️' : '♀️';
  };

  const getSexColor = (sex: string) => {
    return sex === 'Macho' ? 'text-blue-600' : 'text-pink-600';
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(pet)}
    >
      <div className="flex items-center gap-3">
        <ImageWithFallback 
          src={pet.image}
          alt={pet.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-[#3D291D] flex items-center gap-1">
            {pet.name}
            <span className={getSexColor(pet.sex)}>{getSexIcon(pet.sex)}</span>
          </h3>
          <p className="text-sm text-[#B58568]">{pet.animal} • {pet.breed}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-[#B58568]">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {pet.age}
            </span>
            <span className="flex items-center gap-1">
              <Weight size={12} />
              {pet.weight}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}