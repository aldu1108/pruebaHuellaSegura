import { Calendar, MapPin, Phone, Share2, Eye, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface LostPetCardProps {
  pet: LostPet;
  onContact: (pet: LostPet) => void;
  onShare: (pet: LostPet) => void;
  onViewDetails: (pet: LostPet) => void;
}

export function LostPetCard({ pet, onContact, onShare, onViewDetails }: LostPetCardProps) {
  const getDaysLost = () => {
    const lostDate = new Date(pet.lostDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lostDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = () => {
    switch (pet.status) {
      case 'found':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getStatusText = () => {
    switch (pet.status) {
      case 'found':
        return '¡ENCONTRADO!';
      case 'closed':
        return 'CERRADO';
      default:
        return 'PERDIDO';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-red-500">
      <div className="flex gap-4">
        <div className="relative">
          <ImageWithFallback 
            src={pet.petImage}
            alt={pet.petName}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs border ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-[#3D291D] text-lg">{pet.petName}</h3>
              <p className="text-[#B58568] text-sm">{pet.petType} • {pet.breed}</p>
            </div>
            {pet.hasReward && pet.rewardAmount && (
              <div className="bg-[#E55826] text-white px-2 py-1 rounded-full text-xs font-semibold">
                Recompensa: {pet.rewardAmount}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-[#3D291D] mb-3">
            <div>
              <span className="font-semibold">Color:</span> {pet.color}
            </div>
            <div>
              <span className="font-semibold">Tamaño:</span> {pet.size}
            </div>
          </div>

          <div className="space-y-1 text-sm text-[#B58568] mb-3">
            <p className="flex items-center gap-1">
              <Calendar size={14} />
              Perdido hace {getDaysLost()} días ({pet.lostDate})
            </p>
            <p className="flex items-center gap-1">
              <MapPin size={14} />
              {pet.lastSeenLocation}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onContact(pet)}
              className="flex-1 bg-[#E55826] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#d14918] transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={14} />
              Contactar
            </button>
            <button
              onClick={() => onShare(pet)}
              className="px-4 py-2 border border-[#B58568] border-opacity-30 text-[#B58568] rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share2 size={14} />
            </button>
            <button
              onClick={() => onViewDetails(pet)}
              className="px-4 py-2 border border-[#B58568] border-opacity-30 text-[#B58568] rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye size={14} />
            </button>
          </div>
        </div>
      </div>

      {pet.status === 'active' && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
            <p className="text-yellow-800 text-xs">
              <strong>¿Has visto a {pet.petName}?</strong> Tu ayuda puede ser crucial para reunir a esta familia.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}