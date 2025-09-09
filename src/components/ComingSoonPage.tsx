import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Construction } from 'lucide-react';

interface ComingSoonPageProps {
  onNavigate: (page: string) => void;
  title: string;
  description: string;
}

export function ComingSoonPage({ onNavigate, title, description }: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-4 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <Construction size={64} className="text-[#E55826] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#3D291D] mb-2">{title}</h1>
            <p className="text-[#B58568] mb-6">{description}</p>
            <button 
              onClick={() => onNavigate('home')}
              className="bg-[#E55826] text-white px-6 py-2 rounded-lg"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </main>
      
      <BottomNavigation onNavigate={onNavigate} />
    </div>
  );
}