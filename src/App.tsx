import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { LostPetsPage } from './components/LostPetsPage';
import { PetsProfilePage } from './components/PetsProfilePage';
import { UserProfilePage } from './components/UserProfilePage';
import { VeterinaryPage } from './components/VeterinaryPage';
import { CommunityPage } from './components/CommunityPage';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'normal' | 'vet'>('normal');
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleNavigate = (page: string, petId?: number) => {
    setCurrentPage(page);
    if (petId) {
      setSelectedPetId(petId);
    } else {
      setSelectedPetId(null);
    }
  };

  const handleLogin = (type: 'normal' | 'vet' = 'normal') => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentPage(type === 'vet' ? 'vet' : 'home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('normal');
    setCurrentPage('home');
    setSelectedPetId(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const renderPage = () => {
    const commonProps = {
      onNavigate: handleNavigate,
      onLogout: handleLogout,
      onSearch: handleSearch,
      onFilter: handleFilter,
      searchTerm,
      activeFilters,
      selectedPetId
    };

    // Si el usuario es veterinario, solo mostrar la página de veterinario
    if (userType === 'vet') {
      return <VeterinaryPage {...commonProps} />;
    }

    // Para usuarios normales, mostrar las páginas correspondientes
    switch (currentPage) {
      case 'home':
        return <HomePage {...commonProps} />;
      case 'search':
        return <LostPetsPage {...commonProps} />;
      case 'pets':
        return <PetsProfilePage {...commonProps} />;
      case 'profile':
        return <UserProfilePage {...commonProps} />;
      case 'vet':
        return <VeterinaryPage {...commonProps} />;
      case 'community':
        return <CommunityPage {...commonProps} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} onLogout={handleLogout} />;
      default:
        return <HomePage {...commonProps} />;
    }
  };

  // Si no está autenticado, mostrar la página de login
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return renderPage();
}