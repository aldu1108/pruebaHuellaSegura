import { useState } from 'react';
import { Header } from './Header';
import { PetMiniCard } from './PetMiniCard';
import { EditUserProfileForm } from './EditUserProfileForm';
import { BottomNavigationProfile } from './BottomNavigationProfile';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Edit, Phone, Mail, MapPin, Calendar, Shield, Settings, Bell, Heart, Share2, Download } from 'lucide-react';

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

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

interface UserProfilePageProps {
  onNavigate: (page: string, petId?: number) => void;
  onLogout?: () => void;
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

export function UserProfilePage({ onNavigate, onLogout, onSearch, searchTerm }: UserProfilePageProps) {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 123 456 789',
    address: 'Calle Principal 123, Madrid, España',
    avatar: 'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjA1NDI1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  });

  const userPets: Pet[] = [
    {
      id: 1,
      name: 'Luna',
      animal: 'Perro',
      breed: 'Golden Retriever',
      age: '3 años',
      sex: 'Hembra',
      weight: '28 kg',
      image: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Whiskers',
      animal: 'Gato',
      breed: 'Persa',
      age: '2 años',
      sex: 'Macho',
      weight: '4.5 kg',
      image: 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDQ4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      name: 'Max',
      animal: 'Perro',
      breed: 'Pastor Alemán',
      age: '5 años',
      sex: 'Macho',
      weight: '35 kg',
      image: 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTU5NjEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      name: 'Kiwi',
      animal: 'Ave',
      breed: 'Loro Amazonas',
      age: '7 años',
      sex: 'Hembra',
      weight: '0.8 kg',
      image: 'https://images.unsplash.com/photo-1700048802079-ec47d07f7919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJyb3QlMjBjb2xvcmZ1bCUyMGJpcmR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const handlePetClick = (pet: Pet) => {
    onNavigate('pets', pet.id);
  };

  const handleEditProfile = () => {
    setIsEditFormOpen(true);
  };

  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    console.log('Perfil actualizado:', newProfile);
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `Perfil de ${userProfile.name} en PetCare`,
        text: `Mira el perfil de ${userProfile.name} y sus ${userPets.length} mascotas en PetCare`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace del perfil copiado al portapapeles');
    }
  };

  const handleExportData = () => {
    const dataToExport = {
      user: userProfile,
      pets: userPets,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `petcare-profile-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleNotificationSettings = () => {
    alert('Configuraciones de notificaciones - Por implementar');
  };

  const handlePrivacySettings = () => {
    alert('Configuraciones de privacidad - Por implementar');
  };

  const memberSince = 'Enero 2023';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        onSearch={onSearch}
        searchTerm={searchTerm}
      />
      
      <main className="pt-4 pb-20">
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-[#3D291D]">Mi Perfil 👤</h1>
            <button 
              onClick={handleShareProfile}
              className="p-2 rounded-lg bg-[#EE9444] hover:bg-[#E55826] transition-colors"
            >
              <Share2 size={20} color="white" />
            </button>
          </div>
          <p className="text-[#B58568]">Gestiona tu información personal y configuraciones</p>
        </div>

        {/* Información del usuario */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-4 mb-4">
              <ImageWithFallback 
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#3D291D]">{userProfile.name}</h2>
                <p className="text-[#B58568] flex items-center gap-1 text-sm">
                  <Calendar size={14} />
                  Miembro desde {memberSince}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-[#FAE5A1] text-[#3D291D] px-2 py-1 rounded-full text-xs">
                    USUARIO VERIFICADO
                  </div>
                  <div className="bg-[#E55826] text-white px-2 py-1 rounded-full text-xs">
                    {userPets.length} MASCOTAS
                  </div>
                </div>
              </div>
              <button 
                onClick={handleEditProfile}
                className="p-2 rounded-lg" 
                style={{ backgroundColor: '#E55826' }}
              >
                <Edit size={16} color="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-[#3D291D] mb-4">Información de Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#E55826]" />
                <span className="text-[#3D291D]">{userProfile.email}</span>
                <button 
                  onClick={() => window.location.href = `mailto:${userProfile.email}`}
                  className="ml-auto text-[#E55826] text-sm"
                >
                  Contactar
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#E55826]" />
                <span className="text-[#3D291D]">{userProfile.phone}</span>
                <button 
                  onClick={() => window.location.href = `tel:${userProfile.phone}`}
                  className="ml-auto text-[#E55826] text-sm"
                >
                  Llamar
                </button>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#E55826]" />
                <span className="text-[#3D291D]">{userProfile.address}</span>
                <button 
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(userProfile.address)}`)}
                  className="ml-auto text-[#E55826] text-sm"
                >
                  Ver en mapa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Configuraciones rápidas */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-[#3D291D] mb-4">Configuraciones</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleEditProfile}
                className="flex items-center gap-2 p-3 rounded-lg border border-[#B58568] border-opacity-30 hover:bg-gray-50"
              >
                <Settings size={16} className="text-[#E55826]" />
                <span className="text-[#3D291D] text-sm">Editar Perfil</span>
              </button>
              <button 
                onClick={handleNotificationSettings}
                className="flex items-center gap-2 p-3 rounded-lg border border-[#B58568] border-opacity-30 hover:bg-gray-50"
              >
                <Bell size={16} className="text-[#E55826]" />
                <span className="text-[#3D291D] text-sm">Notificaciones</span>
              </button>
              <button 
                onClick={handlePrivacySettings}
                className="flex items-center gap-2 p-3 rounded-lg border border-[#B58568] border-opacity-30 hover:bg-gray-50"
              >
                <Shield size={16} className="text-[#E55826]" />
                <span className="text-[#3D291D] text-sm">Privacidad</span>
              </button>
              <button 
                onClick={handleExportData}
                className="flex items-center gap-2 p-3 rounded-lg border border-[#B58568] border-opacity-30 hover:bg-gray-50"
              >
                <Download size={16} className="text-[#E55826]" />
                <span className="text-[#3D291D] text-sm">Exportar Datos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Resumen de mascotas */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#3D291D]">Mis Mascotas ({userPets.length})</h3>
              <button 
                onClick={() => onNavigate('pets')}
                className="text-[#E55826] text-sm"
              >
                Ver todas
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {userPets.map((pet) => (
                <PetMiniCard 
                  key={pet.id} 
                  pet={pet} 
                  onClick={handlePetClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-[#3D291D] mb-4">Estadísticas del Mes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E55826]">12</div>
                <div className="text-sm text-[#B58568]">Citas médicas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E55826]">8</div>
                <div className="text-sm text-[#B58568]">Recordatorios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E55826]">95%</div>
                <div className="text-sm text-[#B58568]">Salud general</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E55826]">3</div>
                <div className="text-sm text-[#B58568]">Veterinarios</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigationProfile onNavigate={onNavigate} />
      
      <EditUserProfileForm 
        isOpen={isEditFormOpen}
        userProfile={userProfile}
        onClose={() => setIsEditFormOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}