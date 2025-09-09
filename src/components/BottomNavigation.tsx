import { Heart, Search, Home, Users, Stethoscope } from 'lucide-react';

interface BottomNavigationProps {
  onNavigate: (page: string) => void;
}

export function BottomNavigation({ onNavigate }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 px-4 flex items-center justify-around" style={{ backgroundColor: '#EE9444' }}>
      <button 
        className="p-3 rounded-lg transition-colors" 
        style={{ backgroundColor: '#E55826' }}
        onClick={() => onNavigate('pets')}
      >
        <Heart size={24} color="white" />
      </button>
      
      <button 
        className="p-3 rounded-lg transition-colors" 
        style={{ backgroundColor: '#E55826' }}
        onClick={() => onNavigate('search')}
      >
        <Search size={24} color="white" />
      </button>
      
      <button 
        className="p-3 rounded-lg transition-colors bg-white"
        onClick={() => onNavigate('home')}
      >
        <Home size={24} style={{ color: '#E55826' }} />
      </button>
      
      <button 
        className="p-3 rounded-lg transition-colors" 
        style={{ backgroundColor: '#E55826' }}
        onClick={() => onNavigate('community')}
      >
        <Users size={24} color="white" />
      </button>
      
      <button 
        className="p-3 rounded-lg transition-colors" 
        style={{ backgroundColor: '#E55826' }}
        onClick={() => onNavigate('vet')}
      >
        <Stethoscope size={24} color="white" />
      </button>
    </nav>
  );
}