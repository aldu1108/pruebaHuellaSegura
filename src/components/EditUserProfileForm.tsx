import { useState } from 'react';
import { X, Save, Camera, Mail, Phone, MapPin, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

interface EditUserProfileFormProps {
  isOpen: boolean;
  userProfile: UserProfile;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}

export function EditUserProfileForm({ isOpen, userProfile, onClose, onSave }: EditUserProfileFormProps) {
  const [formData, setFormData] = useState(userProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handlePhotoChange = () => {
    // Simulación de cambio de foto
    const newAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTYwNTQyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
    setFormData({ ...formData, avatar: newAvatar });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-[#3D291D]">Editar Perfil</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-[#B58568]" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Foto de perfil */}
          <div className="text-center">
            <div className="relative inline-block">
              <ImageWithFallback 
                src={formData.avatar}
                alt="Perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#FAE5A1]"
              />
              <button 
                type="button"
                onClick={handlePhotoChange}
                className="absolute bottom-0 right-0 bg-[#E55826] text-white p-2 rounded-full hover:bg-[#d14918] transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
            <p className="text-sm text-[#B58568] mt-2">Toca para cambiar foto</p>
          </div>

          {/* Información personal */}
          <div>
            <label className="block text-sm font-semibold text-[#3D291D] mb-1">
              Nombre completo *
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D291D] mb-1">
              Correo electrónico *
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D291D] mb-1">
              Teléfono
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="+34 123 456 789"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D291D] mb-1">
              Dirección
            </label>
            <div className="relative">
              <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="Calle Principal 123, Madrid"
              />
            </div>
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
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}