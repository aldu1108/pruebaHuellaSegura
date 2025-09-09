import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X, Camera, Calendar, Weight, Ruler, Heart, Save } from 'lucide-react';

interface AddPetFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (petData: any) => void;
}

export function AddPetForm({ isOpen, onClose, onSave }: AddPetFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    animal: '',
    breed: '',
    birthDate: '',
    sex: '',
    weight: '',
    color: '',
    microchip: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBwbGFjZWhvbGRlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPet = {
      id: Date.now(),
      ...formData,
      age: calculateAge(formData.birthDate)
    };
    onSave(newPet);
    onClose();
    // Reset form
    setFormData({
      name: '',
      animal: '',
      breed: '',
      birthDate: '',
      sex: '',
      weight: '',
      color: '',
      microchip: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBwbGFjZWhvbGRlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    });
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return months > 0 ? `${years} años ${months} meses` : `${years} años`;
    } else if (months > 0) {
      return `${months} meses`;
    } else {
      return `${diffDays} días`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-[#3D291D]">Agregar Nueva Mascota</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-[#B58568]" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Foto de la mascota */}
          <div className="text-center">
            <div className="relative inline-block">
              <ImageWithFallback 
                src={formData.image}
                alt="Nueva mascota"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#FAE5A1]"
              />
              <button 
                type="button"
                className="absolute bottom-0 right-0 bg-[#E55826] text-white p-2 rounded-full"
              >
                <Camera size={16} />
              </button>
            </div>
            <p className="text-sm text-[#B58568] mt-2">Toca para cambiar foto</p>
          </div>

          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="Ej: Luna"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Animal *
              </label>
              <select
                name="animal"
                value={formData.animal}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                required
              >
                <option value="">Seleccionar</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Conejo">Conejo</option>
                <option value="Reptil">Reptil</option>
                <option value="Pez">Pez</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D291D] mb-1">
              Raza
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
              placeholder="Ej: Golden Retriever"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Fecha de Nacimiento *
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Sexo *
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                required
              >
                <option value="">Seleccionar</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Peso
              </label>
              <div className="relative">
                <Weight size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  placeholder="Ej: 25 kg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="Ej: Dorado"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D291D] mb-1">
              Microchip
            </label>
            <input
              type="text"
              name="microchip"
              value={formData.microchip}
              onChange={handleInputChange}
              className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
              placeholder="Número de microchip"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D291D] mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] resize-none"
              placeholder="Describe el temperamento, características especiales, etc."
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#B58568] border-opacity-30 text-[#B58568] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#E55826] text-white rounded-lg hover:bg-[#d14918] transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Guardar Mascota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}