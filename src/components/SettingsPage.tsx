import { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { 
  Settings, 
  Bell, 
  Shield, 
  User, 
  Palette, 
  Moon, 
  Sun, 
  Globe, 
  Volume2, 
  VolumeX, 
  Smartphone,
  Database,
  HelpCircle,
  Mail,
  Star,
  Trash2,
  Download,
  Upload,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function SettingsPage({ onNavigate, onLogout }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    general: true,
    medical: true,
    reminders: true,
    community: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    petsVisible: true,
    medicalInfoVisible: false,
    locationSharing: false
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'es',
    soundEnabled: true,
    autoBackup: true
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    const data = {
      notifications,
      privacy,
      preferences,
      exportDate: new Date().toISOString()
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'petcare_settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.notifications) setNotifications(data.notifications);
            if (data.privacy) setPrivacy(data.privacy);
            if (data.preferences) setPreferences(data.preferences);
            alert('Configuración importada correctamente');
          } catch (error) {
            alert('Error al importar la configuración');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    alert('Esta funcionalidad requiere confirmación del servidor. En una app real, se enviaría una solicitud de eliminación.');
  };

  const SettingSection = ({ 
    title, 
    icon: Icon, 
    children 
  }: { 
    title: string; 
    icon: any; 
    children: React.ReactNode; 
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
        <div className="w-8 h-8 bg-[#FAE5A1] rounded-full flex items-center justify-center">
          <Icon size={18} className="text-[#E55826]" />
        </div>
        <h3 className="font-semibold text-[#3D291D]">{title}</h3>
      </div>
      {children}
    </div>
  );

  const SettingItem = ({ 
    label, 
    description, 
    value, 
    onChange, 
    type = 'toggle' 
  }: {
    label: string;
    description?: string;
    value: any;
    onChange: () => void;
    type?: 'toggle' | 'button';
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="font-medium text-[#3D291D]">{label}</p>
        {description && (
          <p className="text-sm text-[#B58568] mt-1">{description}</p>
        )}
      </div>
      {type === 'toggle' ? (
        <button
          onClick={onChange}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            value ? 'bg-[#E55826]' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              value ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      ) : (
        <button onClick={onChange} className="text-[#E55826] hover:underline">
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} onLogout={onLogout} />
      
      <main className="pt-20 pb-20 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#3D291D] mb-2">Configuración ⚙️</h1>
          <p className="text-[#B58568]">Personaliza tu experiencia en PetCare</p>
        </div>

        {/* Notificaciones */}
        <SettingSection title="Notificaciones" icon={Bell}>
          <SettingItem
            label="Notificaciones generales"
            description="Recibe notificaciones importantes de la app"
            value={notifications.general}
            onChange={() => handleNotificationChange('general')}
          />
          <SettingItem
            label="Recordatorios médicos"
            description="Citas veterinarias, medicinas y vacunas"
            value={notifications.medical}
            onChange={() => handleNotificationChange('medical')}
          />
          <SettingItem
            label="Recordatorios de cuidado"
            description="Comida, ejercicio y actividades diarias"
            value={notifications.reminders}
            onChange={() => handleNotificationChange('reminders')}
          />
          <SettingItem
            label="Actividad de comunidad"
            description="Nuevos posts, comentarios y eventos"
            value={notifications.community}
            onChange={() => handleNotificationChange('community')}
          />
          <SettingItem
            label="Ofertas y promociones"
            description="Descuentos en tienda y productos recomendados"
            value={notifications.marketing}
            onChange={() => handleNotificationChange('marketing')}
          />
        </SettingSection>

        {/* Privacidad */}
        <SettingSection title="Privacidad y Seguridad" icon={Shield}>
          <SettingItem
            label="Perfil público"
            description="Permitir que otros usuarios vean tu perfil"
            value={privacy.profileVisible}
            onChange={() => handlePrivacyChange('profileVisible')}
          />
          <SettingItem
            label="Mascotas visibles"
            description="Mostrar tus mascotas en la comunidad"
            value={privacy.petsVisible}
            onChange={() => handlePrivacyChange('petsVisible')}
          />
          <SettingItem
            label="Información médica"
            description="Compartir historial médico con veterinarios de la red"
            value={privacy.medicalInfoVisible}
            onChange={() => handlePrivacyChange('medicalInfoVisible')}
          />
          <SettingItem
            label="Compartir ubicación"
            description="Para mascotas perdidas y servicios cerca de ti"
            value={privacy.locationSharing}
            onChange={() => handlePrivacyChange('locationSharing')}
          />
        </SettingSection>

        {/* Preferencias */}
        <SettingSection title="Preferencias" icon={Palette}>
          <div className="py-3">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-[#3D291D]">Tema de la aplicación</p>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handlePreferenceChange('darkMode', false)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                    !preferences.darkMode ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Sun size={16} />
                  Claro
                </button>
                <button
                  onClick={() => handlePreferenceChange('darkMode', true)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                    preferences.darkMode ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Moon size={16} />
                  Oscuro
                </button>
              </div>
            </div>
          </div>

          <div className="py-3">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-[#3D291D]">Idioma</p>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="px-3 py-1 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826]"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>

          <SettingItem
            label="Sonidos de la app"
            description="Reproducir sonidos para notificaciones y acciones"
            value={preferences.soundEnabled}
            onChange={() => handlePreferenceChange('soundEnabled', !preferences.soundEnabled)}
          />

          <SettingItem
            label="Copia de seguridad automática"
            description="Guardar datos en la nube automáticamente"
            value={preferences.autoBackup}
            onChange={() => handlePreferenceChange('autoBackup', !preferences.autoBackup)}
          />
        </SettingSection>

        {/* Datos y Almacenamiento */}
        <SettingSection title="Datos y Almacenamiento" icon={Database}>
          <div className="space-y-3">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-3 bg-[#FAE5A1] bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download size={18} className="text-[#E55826]" />
                <div className="text-left">
                  <p className="font-medium text-[#3D291D]">Exportar mis datos</p>
                  <p className="text-sm text-[#B58568]">Descargar una copia de toda tu información</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#B58568]" />
            </button>

            <button
              onClick={handleImportData}
              className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Upload size={18} className="text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-[#3D291D]">Importar configuración</p>
                  <p className="text-sm text-[#B58568]">Restaurar configuración desde archivo</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#B58568]" />
            </button>
          </div>
        </SettingSection>

        {/* Soporte */}
        <SettingSection title="Soporte y Ayuda" icon={HelpCircle}>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle size={18} className="text-[#E55826]" />
                <p className="font-medium text-[#3D291D]">Centro de ayuda</p>
              </div>
              <ChevronRight size={20} className="text-[#B58568]" />
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#E55826]" />
                <p className="font-medium text-[#3D291D]">Contactar soporte</p>
              </div>
              <ChevronRight size={20} className="text-[#B58568]" />
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Star size={18} className="text-[#E55826]" />
                <p className="font-medium text-[#3D291D]">Calificar la app</p>
              </div>
              <ChevronRight size={20} className="text-[#B58568]" />
            </button>
          </div>
        </SettingSection>

        {/* Zona de peligro */}
        <SettingSection title="Zona de Peligro" icon={Trash2}>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
          >
            <Trash2 size={18} />
            <span className="font-medium">Eliminar cuenta</span>
          </button>
        </SettingSection>

        {/* Información de la app */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="text-center">
            <h3 className="font-semibold text-[#3D291D] mb-2">PetCare</h3>
            <p className="text-sm text-[#B58568] mb-1">Versión 1.0.0</p>
            <p className="text-xs text-[#B58568]">© 2024 PetCare. Todos los derechos reservados.</p>
          </div>
        </div>
      </main>

      <BottomNavigation onNavigate={onNavigate} />

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3D291D]">Eliminar cuenta</h3>
                  <p className="text-sm text-[#B58568]">Esta acción no se puede deshacer</p>
                </div>
              </div>
              
              <p className="text-[#3D291D] mb-6">
                ¿Estás seguro de que quieres eliminar tu cuenta? Se perderán todos tus datos, 
                incluyendo la información de tus mascotas, historial médico y configuraciones.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X size={16} />
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Check size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}