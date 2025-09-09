import { useState } from 'react';
import { X, Calendar, User, Building, FileText, DollarSign, Stethoscope, AlertCircle, Upload, Paperclip } from 'lucide-react';

interface AddMedicalRecordFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: NewMedicalRecord) => void;
}

interface NewMedicalRecord {
  petName: string;
  date: string;
  time: string;
  type: string;
  veterinarian: string;
  clinic: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  cost: string;
  nextAppointment?: string;
}

export function AddMedicalRecordForm({ isOpen, onClose, onSave }: AddMedicalRecordFormProps) {
  const [formData, setFormData] = useState<NewMedicalRecord>({
    petName: '',
    date: '',
    time: '',
    type: '',
    veterinarian: '',
    clinic: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    cost: '',
    nextAppointment: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const pets = ['Luna', 'Whiskers', 'Max', 'Kiwi'];
  const consultationTypes = [
    'Consulta General',
    'Vacunación',
    'Emergencia',
    'Cirugía',
    'Revisión',
    'Tratamiento',
    'Análisis',
    'Desparasitación',
    'Control de peso',
    'Dental'
  ];

  const commonVets = [
    'María González',
    'Carlos Rodríguez', 
    'Ana López',
    'Roberto Silva',
    'Laura Martínez',
    'Diego Fernández'
  ];

  const commonClinics = [
    'Clínica Veterinaria San Martín',
    'Hospital Veterinario Central',
    'Clínica Veterinaria Especializada',
    'Clínica Veterinaria Exóticos',
    'Centro Veterinario Madrid',
    'Hospital de Mascotas'
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.petName) newErrors.petName = 'Selecciona una mascota';
    if (!formData.date) newErrors.date = 'La fecha es obligatoria';
    if (!formData.time) newErrors.time = 'La hora es obligatoria';
    if (!formData.type) newErrors.type = 'Selecciona el tipo de consulta';
    if (!formData.veterinarian) newErrors.veterinarian = 'El veterinario es obligatorio';
    if (!formData.clinic) newErrors.clinic = 'La clínica es obligatoria';
    if (!formData.diagnosis) newErrors.diagnosis = 'El diagnóstico es obligatorio';
    if (!formData.treatment) newErrors.treatment = 'El tratamiento es obligatorio';

    // Validar que la fecha no sea en el futuro para consultas ya realizadas
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
      newErrors.date = 'Para citas futuras, usa el calendario de recordatorios';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof NewMedicalRecord, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      
      // Reset form
      setFormData({
        petName: '',
        date: '',
        time: '',
        type: '',
        veterinarian: '',
        clinic: '',
        diagnosis: '',
        treatment: '',
        notes: '',
        cost: '',
        nextAppointment: ''
      });
      setAttachedFiles([]);
      
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setAttachedFiles([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FAE5A1] rounded-full flex items-center justify-center">
              <Stethoscope size={20} className="text-[#E55826]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#3D291D]">Nueva Consulta Médica</h2>
              <p className="text-sm text-[#B58568]">Registra el historial médico de tu mascota</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={20} className="text-[#B58568]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#3D291D] flex items-center gap-2">
              <FileText size={16} />
              Información Básica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mascota */}
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Mascota *
                </label>
                <select
                  value={formData.petName}
                  onChange={(e) => handleInputChange('petName', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] ${
                    errors.petName ? 'border-red-500' : 'border-[#B58568] border-opacity-30'
                  }`}
                >
                  <option value="">Seleccionar mascota</option>
                  {pets.map(pet => (
                    <option key={pet} value={pet}>{pet}</option>
                  ))}
                </select>
                {errors.petName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.petName}
                  </p>
                )}
              </div>

              {/* Tipo de consulta */}
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Tipo de Consulta *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] ${
                    errors.type ? 'border-red-500' : 'border-[#B58568] border-opacity-30'
                  }`}
                >
                  <option value="">Seleccionar tipo</option>
                  {consultationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.type}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Fecha de la Consulta *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] ${
                    errors.date ? 'border-red-500' : 'border-[#B58568] border-opacity-30'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Hora */}
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Hora *
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] ${
                    errors.time ? 'border-red-500' : 'border-[#B58568] border-opacity-30'
                  }`}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.time}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Información médica */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#3D291D] flex items-center gap-2">
              <User size={16} />
              Información Médica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Veterinario */}
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Veterinario *
                </label>
                <input
                  type="text"
                  list="veterinarians"
                  value={formData.veterinarian}
                  onChange={(e) => handleInputChange('veterinarian', e.target.value)}
                  placeholder="Nombre del veterinario"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] ${
                    errors.veterinarian ? 'border-red-500' : 'border-[#B58568] border-opacity-30'
                  }`}
                />
                <datalist id="veterinarians">
                  {commonVets.map(vet => (
                    <option key={vet} value={vet} />
                  ))}
                </datalist>
                {errors.veterinarian && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.veterinarian}
                  </p>
                )}
              </div>

              {/* Clínica */}
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Clínica/Hospital *
                </label>
                <input
                  type="text"
                  list="clinics"
                  value={formData.clinic}
                  onChange={(e) => handleInputChange('clinic', e.target.value)}
                  placeholder="Nombre de la clínica"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] ${
                    errors.clinic ? 'border-red-500' : 'border-[#B58568] border-opacity-30'
                  }`}
                />
                <datalist id="clinics">
                  {commonClinics.map(clinic => (
                    <option key={clinic} value={clinic} />
                  ))}
                </datalist>
                {errors.clinic && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.clinic}
                  </p>
                )}
              </div>
            </div>

            {/* Diagnóstico */}
            <div>
              <label className="block text-sm font-medium text-[#3D291D] mb-2">
                Diagnóstico *
              </label>
              <textarea
                value={formData.diagnosis}
                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                placeholder="Describe el diagnóstico o motivo de la consulta"
                rows={3}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] resize-none ${
                  errors.diagnosis ? 'border-red-500' : 'border-[#B58568] border-opacity-30'
                }`}
              />
              {errors.diagnosis && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.diagnosis}
                </p>
              )}
            </div>

            {/* Tratamiento */}
            <div>
              <label className="block text-sm font-medium text-[#3D291D] mb-2">
                Tratamiento *
              </label>
              <textarea
                value={formData.treatment}
                onChange={(e) => handleInputChange('treatment', e.target.value)}
                placeholder="Describe el tratamiento aplicado o recetado"
                rows={3}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] resize-none ${
                  errors.treatment ? 'border-red-500' : 'border-[#B58568] border-opacity-30'
                }`}
              />
              {errors.treatment && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.treatment}
                </p>
              )}
            </div>

            {/* Notas */}
            <div>
              <label className="block text-sm font-medium text-[#3D291D] mb-2">
                Notas Adicionales
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Observaciones adicionales, recomendaciones, etc."
                rows={2}
                className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] resize-none"
              />
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#3D291D] flex items-center gap-2">
              <Building size={16} />
              Información Adicional
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Costo */}
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Costo de la Consulta
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.cost}
                    onChange={(e) => handleInputChange('cost', e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B58568] text-sm">€</span>
                </div>
              </div>

              {/* Próxima cita */}
              <div>
                <label className="block text-sm font-medium text-[#3D291D] mb-2">
                  Próxima Cita (Opcional)
                </label>
                <input
                  type="date"
                  value={formData.nextAppointment}
                  onChange={(e) => handleInputChange('nextAppointment', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
                />
              </div>
            </div>
          </div>

          {/* Documentos adjuntos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#3D291D] flex items-center gap-2">
              <Paperclip size={16} />
              Documentos Adjuntos (Opcional)
            </h3>
            
            {/* Zona de subida */}
            <div className="border-2 border-dashed border-[#B58568] border-opacity-50 rounded-lg p-4">
              <div className="text-center">
                <Upload size={32} className="text-[#B58568] mx-auto mb-2" />
                <p className="text-[#3D291D] mb-1">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-sm text-[#B58568] mb-3">Radiografías, análisis, fotos, etc. (Máximo 10MB cada uno)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf,.doc,.docx"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setAttachedFiles([...attachedFiles, ...files]);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 bg-[#E55826] hover:bg-[#d14920] text-white rounded-lg cursor-pointer transition-colors"
                >
                  Seleccionar Archivos
                </label>
              </div>
            </div>

            {/* Lista de archivos adjuntos */}
            {attachedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#3D291D]">Archivos seleccionados:</p>
                {attachedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-[#B58568]" />
                      <span className="text-sm text-[#3D291D]">{file.name}</span>
                      <span className="text-xs text-[#B58568]">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
                      }}
                      className="p-1 hover:bg-gray-200 rounded text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-[#B58568] border-opacity-30 text-[#B58568] rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#E55826] text-white rounded-lg hover:bg-[#d14918] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Guardando...
                </>
              ) : (
                'Guardar Consulta'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}