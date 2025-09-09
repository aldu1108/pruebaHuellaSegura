import { useState } from 'react';
import { LostPetsSection } from './LostPetsSection';
import { AdoptionSection } from './AdoptionSection';
import { Search, Heart, AlertTriangle } from 'lucide-react';

export function PetsAndAdoptionSection() {
  const [activeTab, setActiveTab] = useState<'lost' | 'adoption'>('lost');

  return (
    <div className="mb-6" data-adoption-section>
      {/* Tabs Header */}
      <div className="mb-4">
        <div className="bg-white rounded-lg shadow-sm p-1 flex">
          <button
            onClick={() => setActiveTab('lost')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'lost'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-[#B58568] hover:bg-gray-50'
            }`}
          >
            <Search size={18} />
            <span className="font-semibold">Mascotas Perdidas</span>
            {activeTab === 'lost' && (
              <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                ACTIVO
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('adoption')}
            data-adoption-tab
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'adoption'
                ? 'bg-[#E55826] text-white shadow-md'
                : 'text-[#B58568] hover:bg-gray-50'
            }`}
          >
            <Heart size={18} />
            <span className="font-semibold">Adopción</span>
            {activeTab === 'adoption' && (
              <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                ACTIVO
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Indicadores rápidos */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div 
          className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
            activeTab === 'lost' 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-200 bg-white hover:border-red-300'
          }`}
          onClick={() => setActiveTab('lost')}
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-red-600" />
            <span className="font-semibold text-red-700">Emergencia</span>
          </div>
          <p className="text-sm text-red-600">2 mascotas perdidas hoy</p>
          <p className="text-xs text-red-500 mt-1">Tu ayuda es crucial</p>
        </div>

        <div 
          className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
            activeTab === 'adoption' 
              ? 'border-[#E55826] bg-[#FAE5A1] bg-opacity-30' 
              : 'border-gray-200 bg-white hover:border-[#EE9444]'
          }`}
          onClick={() => setActiveTab('adoption')}
        >
          <div className="flex items-center gap-2 mb-1">
            <Heart size={16} className="text-[#E55826]" />
            <span className="font-semibold text-[#E55826]">Adopción</span>
          </div>
          <p className="text-sm text-[#3D291D]">3 mascotas disponibles</p>
          <p className="text-xs text-[#B58568] mt-1">1 adopción urgente</p>
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-300">
        {activeTab === 'lost' && <LostPetsSection />}
        {activeTab === 'adoption' && <AdoptionSection />}
      </div>

      {/* Call to Action Footer */}
      <div className="mt-4 bg-gradient-to-r from-[#FAE5A1] to-[#EE9444] bg-opacity-20 rounded-lg p-4">
        <div className="text-center">
          <h3 className="font-semibold text-[#3D291D] mb-2 flex items-center justify-center gap-2">
            <Heart size={18} className="text-[#E55826]" />
            ¡Cada acción cuenta!
          </h3>
          <p className="text-sm text-[#3D291D] mb-3">
            {activeTab === 'lost' 
              ? 'Ayuda a reunir familias con sus mascotas perdidas compartiendo y manteniendo los ojos abiertos.'
              : 'Dale una segunda oportunidad a una mascota. La adopción responsable cambia vidas.'
            }
          </p>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => setActiveTab(activeTab === 'lost' ? 'adoption' : 'lost')}
              className="bg-white text-[#E55826] px-4 py-2 rounded-lg text-sm font-semibold border border-[#E55826] hover:bg-[#E55826] hover:text-white transition-colors"
            >
              {activeTab === 'lost' ? 'Ver Adopciones' : 'Ver Perdidas'}
            </button>
            <button className="bg-[#E55826] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d14918] transition-colors">
              {activeTab === 'lost' ? 'Reportar Perdida' : 'Adoptar Ahora'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}