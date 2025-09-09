import { Plus } from 'lucide-react';

interface AddPetButtonProps {
  onClick: () => void;
}

export function AddPetButton({ onClick }: AddPetButtonProps) {
  return (
    <div className="px-4 mb-6">
      <button 
        onClick={onClick}
        className="w-full bg-[#EE9444] hover:bg-[#E55826] transition-colors rounded-lg p-4 flex items-center justify-center gap-3 shadow-md"
      >
        {/* Bone SVG Icon */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-white"
        >
          <path 
            d="M6 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm14 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm-8-6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-4z" 
            fill="currentColor"
          />
          <ellipse cx="4" cy="6" rx="2" ry="3" fill="currentColor"/>
          <ellipse cx="20" cy="6" rx="2" ry="3" fill="currentColor"/>
          <ellipse cx="4" cy="18" rx="2" ry="3" fill="currentColor"/>
          <ellipse cx="20" cy="18" rx="2" ry="3" fill="currentColor"/>
          <rect x="4" y="10" width="16" height="4" rx="2" fill="currentColor"/>
        </svg>
        <span className="text-white font-semibold">Agregar + Mascota</span>
      </button>
    </div>
  );
}