import { Calendar, FileText, Users, Stethoscope, Home } from 'lucide-react';

interface BottomNavigationVetProps {
  onNavigate: (page: string) => void;
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

export function BottomNavigationVet({ onNavigate, currentSection = 'dashboard', onSectionChange }: BottomNavigationVetProps) {
  const handleSectionClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  const getButtonStyle = (section: string) => {
    return currentSection === section 
      ? "p-3 rounded-lg transition-colors bg-white"
      : "p-3 rounded-lg transition-colors hover:bg-[#d14920]";
  };

  const getIconColor = (section: string) => {
    return currentSection === section ? '#E55826' : 'white';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 px-4 flex items-center justify-around" style={{ backgroundColor: '#EE9444' }}>
      <button 
        className={getButtonStyle('dashboard')}
        onClick={() => handleSectionClick('dashboard')}
      >
        <Home size={24} color={getIconColor('dashboard')} />
      </button>
      
      <button 
        className={getButtonStyle('patients')}
        onClick={() => handleSectionClick('patients')}
      >
        <Users size={24} color={getIconColor('patients')} />
      </button>
      
      <button 
        className={getButtonStyle('appointments')}
        onClick={() => handleSectionClick('appointments')}
      >
        <Calendar size={24} color={getIconColor('appointments')} />
      </button>
      
      <button 
        className={getButtonStyle('documents')}
        onClick={() => handleSectionClick('documents')}
      >
        <FileText size={24} color={getIconColor('documents')} />
      </button>
      
      <button 
        className={getButtonStyle('records')}
        onClick={() => handleSectionClick('records')}
      >
        <Stethoscope size={24} color={getIconColor('records')} />
      </button>
    </nav>
  );
}