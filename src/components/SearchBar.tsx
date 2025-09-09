import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

export function SearchBar({ onSearch, searchTerm }: SearchBarProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: 'pets', label: 'Mascotas', icon: '🐾' },
    { id: 'vets', label: 'Veterinarios', icon: '🏥' },
    { id: 'lost', label: 'Perdidos', icon: '🔍' },
    { id: 'reminders', label: 'Recordatorios', icon: '⏰' },
  ];

  const handleSearch = (term: string) => {
    setLocalSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  const handleFilterToggle = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(f => f !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    console.log('Filtros aplicados:', newFilters);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  return (
    <div className="mb-6">
      {/* Barra de búsqueda principal */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
          <input
            type="text"
            placeholder="Buscar mascotas, veterinarios, recordatorios..."
            value={localSearchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-white rounded-lg border border-[#B58568] border-opacity-30 focus:outline-none focus:ring-2 focus:ring-[#E55826] text-[#3D291D]"
          />
          {localSearchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B58568] hover:text-[#E55826]"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`p-3 rounded-lg transition-colors ${
            isFilterOpen || selectedFilters.length > 0
              ? 'bg-[#E55826] text-white'
              : 'bg-white text-[#B58568] border border-[#B58568] border-opacity-30'
          }`}
        >
          <Filter size={20} />
        </button>
      </form>

      {/* Panel de filtros */}
      {isFilterOpen && (
        <div className="bg-white rounded-lg border border-[#B58568] border-opacity-30 p-4 mb-4">
          <h3 className="font-semibold text-[#3D291D] mb-3">Filtrar por categoría:</h3>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterToggle(filter.id)}
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  selectedFilters.includes(filter.id)
                    ? 'bg-[#E55826] text-white'
                    : 'bg-gray-50 text-[#3D291D] hover:bg-gray-100'
                }`}
              >
                <span>{filter.icon}</span>
                <span className="text-sm">{filter.label}</span>
              </button>
            ))}
          </div>
          
          {selectedFilters.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#B58568] border-opacity-20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#B58568]">
                  {selectedFilters.length} filtro(s) aplicado(s)
                </span>
                <button
                  onClick={() => setSelectedFilters([])}
                  className="text-sm text-[#E55826] hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sugerencias de búsqueda */}
      {localSearchTerm && (
        <div className="bg-white rounded-lg border border-[#B58568] border-opacity-30 p-4">
          <h4 className="font-semibold text-[#3D291D] mb-2">Sugerencias:</h4>
          <div className="space-y-2">
            <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-[#3D291D]">
              🐕 Buscar "{localSearchTerm}" en mascotas
            </button>
            <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-[#3D291D]">
              🏥 Buscar "{localSearchTerm}" en veterinarios
            </button>
            <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-[#3D291D]">
              🔍 Buscar "{localSearchTerm}" en mascotas perdidas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}