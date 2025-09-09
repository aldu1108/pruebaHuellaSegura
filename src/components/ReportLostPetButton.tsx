import { AlertTriangle, Plus } from 'lucide-react';

interface ReportLostPetButtonProps {
  onClick: () => void;
}

export function ReportLostPetButton({ onClick }: ReportLostPetButtonProps) {
  return (
    <div className="px-4 mb-6">
      <button 
        onClick={onClick}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <AlertTriangle size={24} />
          <span className="font-bold text-lg">¡Reportar Mascota Perdida!</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-red-100">
          <Plus size={16} />
          <span>Crear reporte de búsqueda</span>
        </div>
      </button>
      
      {/* Información adicional */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="text-red-600 mt-0.5" />
          <div className="text-sm">
            <p className="text-red-800 font-semibold mb-1">Actúa rápido:</p>
            <ul className="text-red-700 space-y-0.5">
              <li>• Las primeras 24 horas son cruciales</li>
              <li>• Comparte en redes sociales automáticamente</li>
              <li>• Alerta a la comunidad local</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}