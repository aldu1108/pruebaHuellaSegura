import { useState } from 'react';
import { X, Save, Camera, MapPin, Calendar, Clock, Phone, Mail, Share2, AlertTriangle, Upload } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReportLostPetFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: any) => void;
}

export function ReportLostPetForm({ isOpen, onClose, onSubmit }: ReportLostPetFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Información de la mascota
    petName: '',
    petType: '',
    breed: '',
    color: '',
    size: '',
    age: '',
    sex: '',
    microchip: '',
    specialMarks: '',
    petImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBwbGFjZWhvbGRlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    
    // Información del incidente
    lostDate: '',
    lostTime: '',
    lastSeenLocation: '',
    locationDetails: '',
    circumstances: '',
    
    // Información de contacto
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    emergencyContact: '',
    
    // Recompensa
    hasReward: false,
    rewardAmount: '',
    
    // Configuraciones
    shareOnSocialMedia: true,
    allowContact: true,
    sendAlerts: true
  });

  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = () => {
    // Simulación de carga de imagen
    const sampleImages = [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setFormData({ ...formData, petImage: randomImage });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLocationPermission('pending');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // En una app real, aquí usarías un servicio de geocodificación inversa
          const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setFormData({ ...formData, lastSeenLocation: locationString });
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationPermission('denied');
          alert('No se pudo obtener la ubicación. Por favor ingresa la dirección manualmente.');
        }
      );
    } else {
      alert('La geolocalización no está soportada en este navegador.');
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reportData = {
      ...formData,
      id: Date.now(),
      reportDate: new Date().toISOString(),
      status: 'active'
    };
    onSubmit(reportData);
    onClose();
    // Reset form
    setCurrentStep(1);
    setFormData({
      petName: '', petType: '', breed: '', color: '', size: '', age: '', sex: '',
      microchip: '', specialMarks: '', petImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      lostDate: '', lostTime: '', lastSeenLocation: '', locationDetails: '', circumstances: '',
      ownerName: '', ownerPhone: '', ownerEmail: '', emergencyContact: '',
      hasReward: false, rewardAmount: '',
      shareOnSocialMedia: true, allowContact: true, sendAlerts: true
    });
  };

  if (!isOpen) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#3D291D] mb-4">Información de la Mascota</h3>
            
            {/* Foto de la mascota */}
            <div className="text-center">
              <div className="relative inline-block">
                <ImageWithFallback 
                  src={formData.petImage}
                  alt="Mascota perdida"
                  className="w-32 h-32 rounded-lg object-cover border-4 border-[#FAE5A1]"
                />
                <button 
                  type="button"
                  onClick={handleImageUpload}
                  className="absolute bottom-0 right-0 bg-[#E55826] text-white p-2 rounded-full hover:bg-[#d14918] transition-colors"
                >
                  <Camera size={16} />
                </button>
              </div>
              <p className="text-sm text-[#B58568] mt-2">Foto reciente de tu mascota *</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Nombre de la mascota *
                </label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  placeholder="Ej: Luna"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Tipo de animal *
                </label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Conejo">Conejo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Color principal *
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  placeholder="Ej: Dorado"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Tamaño *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Pequeño">Pequeño</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Grande">Grande</option>
                  <option value="Muy Grande">Muy Grande</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Edad aproximada
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  placeholder="Ej: 3 años"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Sexo
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                >
                  <option value="">Seleccionar</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Número de microchip
              </label>
              <input
                type="text"
                name="microchip"
                value={formData.microchip}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="Si lo conoces"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Marcas distintivas
              </label>
              <textarea
                name="specialMarks"
                value={formData.specialMarks}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] resize-none"
                placeholder="Cicatrices, manchas especiales, collar, etc."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#3D291D] mb-4">Información del Incidente</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Fecha en que se perdió *
                </label>
                <div className="relative">
                  <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="date"
                    name="lostDate"
                    value={formData.lostDate}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Hora aproximada
                </label>
                <div className="relative">
                  <Clock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="time"
                    name="lostTime"
                    value={formData.lostTime}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Última ubicación conocida *
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="text"
                    name="lastSeenLocation"
                    value={formData.lastSeenLocation}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                    placeholder="Dirección o punto de referencia"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-4 py-3 bg-[#EE9444] text-white rounded-lg hover:bg-[#E55826] transition-colors flex items-center gap-2"
                >
                  <MapPin size={16} />
                  GPS
                </button>
              </div>
              {locationPermission === 'pending' && (
                <p className="text-sm text-[#B58568] mt-1">Obteniendo ubicación...</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Detalles del lugar
              </label>
              <textarea
                name="locationDetails"
                value={formData.locationDetails}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] resize-none"
                placeholder="Describe el lugar: parque, cerca de una escuela, zona comercial, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                ¿Cómo se perdió? *
              </label>
              <textarea
                name="circumstances"
                value={formData.circumstances}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] resize-none"
                placeholder="Describe las circunstancias: se escapó del jardín, se asustó con fuegos artificiales, se perdió durante un paseo, etc."
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#3D291D] mb-4">Información de Contacto</h3>
            
            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Tu nombre completo *
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="Nombre del propietario"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Teléfono principal *
                </label>
                <div className="relative">
                  <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                    placeholder="+34 123 456 789"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3D291D] mb-1">
                Contacto de emergencia
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                placeholder="Teléfono alternativo"
              />
            </div>

            {/* Recompensa */}
            <div className="bg-[#FAE5A1] bg-opacity-30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  name="hasReward"
                  checked={formData.hasReward}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#E55826] border-[#B58568] rounded focus:ring-[#E55826]"
                />
                <label className="font-semibold text-[#3D291D]">
                  Ofrecer recompensa
                </label>
              </div>
              {formData.hasReward && (
                <input
                  type="text"
                  name="rewardAmount"
                  value={formData.rewardAmount}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  placeholder="Cantidad de la recompensa (ej: €200)"
                />
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#3D291D] mb-4">Configuraciones de Búsqueda</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-[#3D291D]">Compartir en redes sociales</h4>
                  <p className="text-sm text-[#B58568]">Publicar automáticamente en Facebook, Twitter</p>
                </div>
                <input
                  type="checkbox"
                  name="shareOnSocialMedia"
                  checked={formData.shareOnSocialMedia}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#E55826] border-[#B58568] rounded focus:ring-[#E55826]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-[#3D291D]">Permitir contacto directo</h4>
                  <p className="text-sm text-[#B58568]">Los usuarios podrán llamarte directamente</p>
                </div>
                <input
                  type="checkbox"
                  name="allowContact"
                  checked={formData.allowContact}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#E55826] border-[#B58568] rounded focus:ring-[#E55826]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-[#3D291D]">Alertas de búsqueda</h4>
                  <p className="text-sm text-[#B58568]">Recibir notificaciones de posibles avistamientos</p>
                </div>
                <input
                  type="checkbox"
                  name="sendAlerts"
                  checked={formData.sendAlerts}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#E55826] border-[#B58568] rounded focus:ring-[#E55826]"
                />
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-[#E55826] bg-opacity-10 border border-[#E55826] border-opacity-30 rounded-lg p-4">
              <h4 className="font-semibold text-[#3D291D] mb-2 flex items-center gap-2">
                <AlertTriangle size={16} />
                Resumen del Reporte
              </h4>
              <div className="text-sm text-[#3D291D] space-y-1">
                <p><strong>Mascota:</strong> {formData.petName} ({formData.petType})</p>
                <p><strong>Color:</strong> {formData.color}</p>
                <p><strong>Perdido el:</strong> {formData.lostDate}</p>
                <p><strong>Lugar:</strong> {formData.lastSeenLocation}</p>
                <p><strong>Contacto:</strong> {formData.ownerPhone}</p>
                {formData.hasReward && <p><strong>Recompensa:</strong> {formData.rewardAmount}</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-[#3D291D]">Reportar Mascota Perdida</h2>
            <div className="flex items-center gap-2 mt-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-2 rounded-full ${
                    step <= currentStep ? 'bg-[#E55826]' : 'bg-gray-200'
                  }`}
                />
              ))}
              <span className="text-sm text-[#B58568] ml-2">
                Paso {currentStep} de 4
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-[#B58568]" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-4">
          {renderStep()}

          {/* Botones de navegación */}
          <div className="flex gap-3 pt-6 mt-6 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex-1 py-3 border border-[#B58568] border-opacity-30 text-[#B58568] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Anterior
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 py-3 bg-[#E55826] text-white rounded-lg hover:bg-[#d14918] transition-colors"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 py-3 bg-[#E55826] text-white rounded-lg hover:bg-[#d14918] transition-colors flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Publicar Reporte
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}