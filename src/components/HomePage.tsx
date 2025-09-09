import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { PetSection } from './PetSection';
import { PetCalendar } from './PetCalendar';
import { LostPetsSection } from './LostPetsSection';
import { Reminders } from './Reminders';
import { BottomNavigation } from './BottomNavigation';

interface HomePageProps {
  onNavigate: (page: string, petId?: number) => void;
  onLogout?: () => void;
  onSearch?: (term: string) => void;
  onFilter?: (filters: string[]) => void;
  searchTerm?: string;
  activeFilters?: string[];
  selectedPetId?: number | null;
}

export function HomePage({ 
  onNavigate, 
  onLogout, 
  onSearch, 
  onFilter, 
  searchTerm, 
  activeFilters, 
  selectedPetId 
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        onSearch={onSearch}
        searchTerm={searchTerm}
      />
      
      <main className="pt-20 pb-20 px-4">
        <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
        <PetSection />
        <PetCalendar />
        <Reminders />
        <LostPetsSection />
      </main>
      
      <BottomNavigation onNavigate={onNavigate} />
    </div>
  );
}