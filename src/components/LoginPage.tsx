import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Eye, EyeOff, Mail, Lock, Heart, User, ArrowLeft, CheckCircle, AlertCircle, Stethoscope, Building, GraduationCap } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userType?: 'normal' | 'vet') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isVetLogin, setIsVetLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    veterinaryLicense: '',
    clinicName: '',
    specialization: ''
  });
  const [resetEmail, setResetEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Login/SignUp attempt:', formData, 'Type:', isVetLogin ? 'vet' : 'normal');
    onLogin(isVetLogin ? 'vet' : 'normal');
  };

  const handleDemoLogin = () => {
    // Login de demostración
    onLogin(isVetLogin ? 'vet' : 'normal');
  };

  const handleVetLogin = () => {
    setIsVetLogin(true);
    setIsSignUp(false);
    setShowForgotPassword(false);
  };

  const handleBackToNormalLogin = () => {
    setIsVetLogin(false);
    setIsSignUp(false);
    setShowForgotPassword(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      veterinaryLicense: '',
      clinicName: '',
      specialization: ''
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail.trim()) {
      setEmailError('Por favor ingresa tu correo electrónico');
      return;
    }

    if (!validateEmail(resetEmail)) {
      setEmailError('Por favor ingresa un correo electrónico válido');
      return;
    }

    setEmailError('');
    // Aquí iría la lógica para enviar el email de recuperación
    console.log('Password reset requested for:', resetEmail);
    setResetEmailSent(true);
    
    // Simular delay y resetear después de 3 segundos
    setTimeout(() => {
      setResetEmailSent(false);
      setShowForgotPassword(false);
      setResetEmail('');
    }, 3000);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetEmailSent(false);
    setResetEmail('');
    setEmailError('');
  };

  // Renderizar modal de recuperación de contraseña
  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAE5A1' }}>
        {/* Header decorativo */}
        <div className="text-center pt-12 pb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-[#3D291D] mb-2">Recuperar Contraseña</h1>
          <p className="text-[#B58568]">Te ayudamos a recuperar tu cuenta</p>
        </div>

        {/* Formulario de recuperación */}
        <div className="flex-1 bg-white rounded-t-3xl px-6 py-8">
          <div className="max-w-md mx-auto">
            {!resetEmailSent ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3D291D] mb-2">
                    ¿Olvidaste tu contraseña?
                  </h2>
                  <p className="text-[#B58568]">
                    {isVetLogin 
                      ? 'Ingresa tu correo profesional y te enviaremos un enlace para restablecer tu contraseña'
                      : 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña'
                    }
                  </p>
                </div>

                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                    <input
                      type="email"
                      placeholder={isVetLogin ? "Correo profesional" : "Correo electrónico"}
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        setEmailError('');
                      }}
                      className={`w-full pl-12 pr-4 py-3 border ${emailError ? 'border-red-500' : 'border-[#B58568] border-opacity-30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] bg-gray-50`}
                      required
                    />
                  </div>
                  
                  {emailError && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {emailError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#E55826] hover:bg-[#d14918] text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Enviar Enlace de Recuperación
                  </button>
                </form>

                <button
                  onClick={handleBackToLogin}
                  className="w-full mt-4 flex items-center justify-center gap-2 text-[#B58568] hover:text-[#E55826] py-2 transition-colors"
                >
                  <ArrowLeft size={20} />
                  Volver al inicio de sesión
                </button>

                {/* Información adicional */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">💡 Consejos de seguridad</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Revisa tu bandeja de spam si no recibes el correo</li>
                    <li>• El enlace será válido por 24 horas</li>
                    <li>• Si tienes problemas, contacta nuestro soporte</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#3D291D] mb-2">
                    ¡Correo Enviado!
                  </h2>
                  <p className="text-[#B58568]">
                    Hemos enviado un enlace de recuperación a:
                  </p>
                  <p className="font-semibold text-[#E55826] mt-2">{resetEmail}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-800 mb-2">📧 Revisa tu correo</h3>
                  <p className="text-green-700 text-sm">
                    Sigue las instrucciones del correo para restablecer tu contraseña. 
                    Si no lo ves, revisa la carpeta de spam.
                  </p>
                </div>

                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-[#EE9444] hover:bg-[#E55826] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Volver al inicio de sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAE5A1' }}>
      {/* Header decorativo */}
      <div className="text-center pt-12 pb-8">
        <div className="text-6xl mb-4">{isVetLogin ? '🩺' : '🐾'}</div>
        <h1 className="text-3xl font-bold text-[#3D291D] mb-2">
          {isVetLogin ? 'PetCare Veterinarios' : 'PetCare'}
        </h1>
        <p className="text-[#B58568]">
          {isVetLogin 
            ? 'Portal profesional para veterinarios' 
            : 'Tu compañero para el cuidado de mascotas'
          }
        </p>
        {isVetLogin && (
          <button
            onClick={handleBackToNormalLogin}
            className="mt-4 flex items-center justify-center gap-2 text-[#E55826] hover:text-[#d14918] mx-auto transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al login de usuarios
          </button>
        )}
      </div>

      {/* Formulario de login */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#3D291D] mb-2">
              {isVetLogin 
                ? (isSignUp ? 'Registro Veterinario' : 'Login Veterinario')
                : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')
              }
            </h2>
            <p className="text-[#B58568]">
              {isVetLogin
                ? (isSignUp 
                    ? 'Registra tu práctica veterinaria en PetCare'
                    : 'Accede a tu cuenta profesional'
                  )
                : (isSignUp 
                    ? 'Únete a la comunidad de cuidadores de mascotas' 
                    : 'Bienvenido de vuelta a PetCare'
                  )
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                  <input
                    type="text"
                    name="name"
                    placeholder={isVetLogin ? "Nombre completo del veterinario" : "Nombre completo"}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] bg-gray-50"
                    required={isSignUp}
                  />
                </div>

                {isVetLogin && (
                  <>
                    <div className="relative">
                      <Stethoscope size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                      <input
                        type="text"
                        name="veterinaryLicense"
                        placeholder="Número de colegiado/licencia"
                        value={formData.veterinaryLicense}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] bg-gray-50"
                        required={isSignUp && isVetLogin}
                      />
                    </div>

                    <div className="relative">
                      <Building size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                      <input
                        type="text"
                        name="clinicName"
                        placeholder="Nombre de la clínica/consultorio"
                        value={formData.clinicName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] bg-gray-50"
                        required={isSignUp && isVetLogin}
                      />
                    </div>

                    <div className="relative">
                      <GraduationCap size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] bg-gray-50"
                        required={isSignUp && isVetLogin}
                      >
                        <option value="">Selecciona especialización</option>
                        <option value="general">Medicina General</option>
                        <option value="surgery">Cirugía</option>
                        <option value="cardiology">Cardiología</option>
                        <option value="dermatology">Dermatología</option>
                        <option value="oncology">Oncología</option>
                        <option value="neurology">Neurología</option>
                        <option value="emergency">Emergencias</option>
                        <option value="exotic">Animales Exóticos</option>
                        <option value="behavior">Comportamiento Animal</option>
                      </select>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
              <input
                type="email"
                name="email"
                placeholder={isVetLogin ? "Correo profesional" : "Correo electrónico"}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] bg-gray-50"
                required
              />
            </div>

            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] bg-gray-50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B58568] hover:text-[#E55826]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {isSignUp && (
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-[#B58568] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] bg-gray-50"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Enlace de recuperación de contraseña */}
            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[#E55826] text-sm hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#E55826] hover:bg-[#d14918] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[#B58568] bg-opacity-30"></div>
            <span className="px-4 text-[#B58568] text-sm">o</span>
            <div className="flex-1 h-px bg-[#B58568] bg-opacity-30"></div>
          </div>

          {/* Login de demostración */}
          <button
            onClick={handleDemoLogin}
            className="w-full bg-[#EE9444] hover:bg-[#E55826] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Heart size={20} />
            Probar con Cuenta Demo
          </button>

          {/* Botón para veterinarios (solo mostrar si no estamos ya en modo veterinario) */}
          {!isVetLogin && (
            <button
              onClick={handleVetLogin}
              className="w-full mt-3 bg-[#B58568] hover:bg-[#9d6f5a] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Stethoscope size={20} />
              Iniciar Sesión como Veterinario
            </button>
          )}

          {/* Toggle entre login y signup */}
          <div className="text-center mt-6">
            <p className="text-[#B58568]">
              {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#E55826] font-semibold ml-2 hover:underline"
              >
                {isSignUp ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </p>
          </div>

          {/* Características de la app */}
          <div className="mt-8 space-y-3">
            {isVetLogin ? (
              <>
                <div className="flex items-center gap-3 text-[#B58568]">
                  <div className="w-8 h-8 rounded-full bg-[#FAE5A1] flex items-center justify-center">
                    <span>📋</span>
                  </div>
                  <span className="text-sm">Gestión de historiales médicos</span>
                </div>
                <div className="flex items-center gap-3 text-[#B58568]">
                  <div className="w-8 h-8 rounded-full bg-[#FAE5A1] flex items-center justify-center">
                    <span>📅</span>
                  </div>
                  <span className="text-sm">Agenda de citas y turnos</span>
                </div>
                <div className="flex items-center gap-3 text-[#B58568]">
                  <div className="w-8 h-8 rounded-full bg-[#FAE5A1] flex items-center justify-center">
                    <span>👥</span>
                  </div>
                  <span className="text-sm">Portal de pacientes integrado</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 text-[#B58568]">
                  <div className="w-8 h-8 rounded-full bg-[#FAE5A1] flex items-center justify-center">
                    <span>🏥</span>
                  </div>
                  <span className="text-sm">Historial médico completo</span>
                </div>
                <div className="flex items-center gap-3 text-[#B58568]">
                  <div className="w-8 h-8 rounded-full bg-[#FAE5A1] flex items-center justify-center">
                    <span>📅</span>
                  </div>
                  <span className="text-sm">Recordatorios personalizados</span>
                </div>
                <div className="flex items-center gap-3 text-[#B58568]">
                  <div className="w-8 h-8 rounded-full bg-[#FAE5A1] flex items-center justify-center">
                    <span>🔍</span>
                  </div>
                  <span className="text-sm">Búsqueda de mascotas perdidas</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}