import { useState } from 'react';
import { Menu, X, User, Heart, LogOut, Plus, Search, Share2, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeaderProps {
  onNavigate?: (page: string, petId?: number) => void;
  onLogout?: () => void;
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

export function Header({ onNavigate, onLogout, onSearch, searchTerm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const userPets = [
    {
      id: 1,
      name: 'Luna',
      animal: 'Perro',
      image: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Whiskers',
      animal: 'Gato',
      image: 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDQ4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      name: 'Max',
      animal: 'Perro',
      image: 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTU5NjEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      name: 'Kiwi',
      animal: 'Ave',
      image: 'https://images.unsplash.com/photo-1700048802079-ec47d07f7919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJyb3QlMjBjb2xvcmZ1bCUyMGJpcmR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSettingsClick = () => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate('settings');
    }
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate('profile');
    }
  };

  const handlePetClick = (petId: number) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate('pets', petId);
    }
  };

  const handleAddPetClick = () => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate('pets');
    }
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchVisible(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PetCare App',
        text: 'Cuida mejor a tus mascotas con PetCare',
        url: window.location.href,
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 px-4 flex items-center justify-between" style={{ backgroundColor: '#FAE5A1' }}>
        <button onClick={handleMenuToggle} className="p-2">
          <Menu size={24} style={{ color: '#3D291D' }} />
        </button>
        
        {isSearchVisible ? (
          <form onSubmit={handleSearchSubmit} className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm || ''}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#B58568] focus:outline-none focus:ring-2 focus:ring-[#E55826]"
              autoFocus
            />
          </form>
        ) : (
          <h1 className="font-bold text-lg" style={{ color: '#3D291D' }}>
            PetCare 🐾
          </h1>
        )}
        
        <div className="flex items-center gap-2">
          <button onClick={handleSearchToggle} className="p-2">
            <Search size={20} style={{ color: '#3D291D' }} />
          </button>
          <button onClick={handleShare} className="p-2">
            <Share2 size={20} style={{ color: '#3D291D' }} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menú lateral */}
      <div className={`fixed top-0 left-0 h-full w-80 transform transition-transform duration-300 ease-in-out z-50 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ backgroundColor: '#B58568' }}>
        <div className="p-4">
          {/* Header del menú */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Menú</h2>
            <button onClick={handleMenuToggle} className="p-2">
              <X size={24} color="white" />
            </button>
          </div>

          {/* Perfil del usuario */}
          <div className="mb-6">
            <button 
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <User size={20} style={{ color: '#3D291D' }} />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Mi Perfil</p>
                <p className="text-white text-opacity-80 text-sm">Juan Pérez</p>
              </div>
            </button>
          </div>

          {/* Separador */}
          <div className="h-px bg-white bg-opacity-30 mb-4"></div>

          {/* Lista de mascotas */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 px-3">Mis Mascotas</h3>
            <div className="space-y-2">
              {userPets.map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => handlePetClick(pet.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  <ImageWithFallback 
                    src={pet.image}
                    alt={pet.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="text-white font-semibold">{pet.name}</p>
                    <p className="text-white text-opacity-80 text-sm">{pet.animal}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Botón agregar mascota */}
          <div className="mb-6">
            <button 
              onClick={handleAddPetClick}
              className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-white border-opacity-50 hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full border-2 border-white border-opacity-50 flex items-center justify-center">
                <Plus size={20} color="white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Agregar Mascota</p>
                <p className="text-white text-opacity-80 text-sm">Registrar nueva mascota</p>
              </div>
            </button>
          </div>

          {/* Separador */}
          <div className="h-px bg-white bg-opacity-30 mb-4"></div>

          {/* Configuración */}
          <div className="mb-6">
            <button 
              onClick={handleSettingsClick}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Settings size={20} style={{ color: '#3D291D' }} />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Configuración ⚙️</p>
                <p className="text-white text-opacity-80 text-sm">Ajustes de la aplicación</p>
              </div>
            </button>
          </div>

          {/* Separador */}
          <div className="h-px bg-white bg-opacity-30 mb-4"></div>

          {/* Botón cerrar sesión */}
          <div className="absolute bottom-6 left-4 right-4">
            <button 
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} color="white" />
              <span className="text-white font-semibold">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}