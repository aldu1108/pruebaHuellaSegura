import { useState } from 'react';
import { Calendar, Clock, Plus, Search, Filter, User, Phone, Mail, ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';
import { AddAppointmentForm } from './AddAppointmentForm';

interface Appointment {
  id: number;
  petName: string;
  petType: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  petImage: string;
}

interface NewAppointment {
  petName: string;
  petType: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  date: string;
  time: string;
  type: string;
  notes?: string;
}

interface VetAppointmentSchedulerProps {
  onBack: () => void;
}

export function VetAppointmentScheduler({ onBack }: VetAppointmentSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      petName: 'Luna',
      petType: 'Perro - Golden Retriever',
      ownerName: 'María Rodríguez',
      ownerPhone: '+34 666 123 456',
      ownerEmail: 'maria.rodriguez@email.com',
      date: '2024-01-15',
      time: '09:00',
      type: 'Consulta General',
      status: 'confirmed',
      notes: 'Primera consulta del año',
      petImage: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      petName: 'Whiskers',
      petType: 'Gato - Persa',
      ownerName: 'Carlos Gómez',
      ownerPhone: '+34 666 789 012',
      ownerEmail: 'carlos.gomez@email.com',
      date: '2024-01-15',
      time: '10:30',
      type: 'Vacunación',
      status: 'pending',
      notes: 'Vacuna anual pendiente',
      petImage: 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDQ4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      petName: 'Max',
      petType: 'Perro - Pastor Alemán',
      ownerName: 'Ana López',
      ownerPhone: '+34 666 345 678',
      ownerEmail: 'ana.lopez@email.com',
      date: '2024-01-15',
      time: '12:00',
      type: 'Revisión Post-Operatoria',
      status: 'confirmed',
      notes: 'Control después de cirugía',
      petImage: 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTU5NjEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 4,
      petName: 'Bella',
      petType: 'Perro - Labrador',
      ownerName: 'Pedro Martín',
      ownerPhone: '+34 666 901 234',
      ownerEmail: 'pedro.martin@email.com',
      date: '2024-01-15',
      time: '15:30',
      type: 'Emergencia',
      status: 'pending',
      notes: 'Consulta urgente - problema digestivo',
      petImage: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMGRvZ3xlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    // Agregar más citas para diferentes fechas del mes
    {
      id: 5,
      petName: 'Rocco',
      petType: 'Perro - Pitbull',
      ownerName: 'Sandra López',
      ownerPhone: '+34 666 555 777',
      ownerEmail: 'sandra.lopez@email.com',
      date: '2024-01-16',
      time: '11:00',
      type: 'Vacunación',
      status: 'confirmed',
      notes: 'Vacuna de refuerzo',
      petImage: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMGRvZ3xlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 6,
      petName: 'Mimi',
      petType: 'Gato - Mestizo',
      ownerName: 'Roberto Vega',
      ownerPhone: '+34 666 888 999',
      ownerEmail: 'roberto.vega@email.com',
      date: '2024-01-17',
      time: '14:30',
      type: 'Consulta General',
      status: 'pending',
      notes: 'Revisión rutinaria',
      petImage: 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MDQ4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ]);

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  
  // Para vista de día
  const dayAppointments = appointments.filter(apt => apt.date === selectedDateStr);
  
  // Para vista de mes
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const monthAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate.getFullYear() === currentYear && aptDate.getMonth() === currentMonth;
  });

  const filteredAppointments = (view === 'month' ? monthAppointments : dayAppointments).filter(apt => {
    const matchesSearch = 
      apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (days > 0 ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + days);
    }
    setSelectedDate(newDate);
  };

  const handleSaveAppointment = (newAppointment: NewAppointment) => {
    const appointment: Appointment = {
      id: Math.max(...appointments.map(a => a.id)) + 1,
      ...newAppointment,
      status: 'confirmed',
      petImage: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlcnxlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    };
    
    setAppointments([...appointments, appointment]);
  };

  const updateAppointmentStatus = (id: number, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  // Funciones para el calendario mensual
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Agregar días vacíos del mes anterior
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Agregar días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getAppointmentsForDate = (day: number) => {
    if (!day) return [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#FAE5A1] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-[#EE9444] hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-[#3D291D]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#3D291D]">Agenda de Citas</h1>
            <p className="text-sm text-[#3D291D] opacity-80">Gestiona las citas veterinarias</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAddFormOpen(true)}
          className="bg-[#E55826] hover:bg-[#d14920] text-white p-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Navegación de fecha */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => changeDate(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft size={16} />
            </button>
            <h2 className="text-lg font-semibold text-[#3D291D]">
              {view === 'month' 
                ? selectedDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })
                : selectedDate.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
              }
            </h2>
            <button 
              onClick={() => changeDate(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* Botones de vista */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'day' 
                    ? 'bg-[#E55826] text-white' 
                    : 'text-[#B58568] hover:bg-gray-200'
                }`}
              >
                <List size={14} className="inline mr-1" />
                Día
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'month' 
                    ? 'bg-[#E55826] text-white' 
                    : 'text-[#B58568] hover:bg-gray-200'
                }`}
              >
                <Grid size={14} className="inline mr-1" />
                Mes
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-[#B58568] mb-3">
          {filteredAppointments.length} citas {view === 'month' ? 'este mes' : 'programadas'}
        </div>

        {/* Filtros */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B58568]" />
            <input
              type="text"
              placeholder="Buscar por mascota, dueño o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="confirmed">Confirmadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-4 py-4">
        {view === 'month' ? (
          /* Vista de calendario mensual */
          <div className="bg-white rounded-lg shadow-md">
            {/* Encabezados de días */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="p-3 text-center text-sm font-semibold text-[#3D291D] bg-[#FAE5A1]">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Días del mes */}
            <div className="grid grid-cols-7">
              {getDaysInMonth(selectedDate).map((day, index) => {
                const dayAppointments = day ? getAppointmentsForDate(day) : [];
                const isToday = day && 
                  new Date().getDate() === day && 
                  new Date().getMonth() === selectedDate.getMonth() && 
                  new Date().getFullYear() === selectedDate.getFullYear();
                
                return (
                  <div 
                    key={index} 
                    className={`min-h-[80px] border-r border-b border-gray-200 p-1 ${
                      day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                    } ${isToday ? 'bg-blue-50' : ''}`}
                    onClick={() => {
                      if (day) {
                        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                        setSelectedDate(newDate);
                        setView('day');
                      }
                    }}
                  >
                    {day && (
                      <div>
                        <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-[#3D291D]'} mb-1`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map((apt, i) => (
                            <div 
                              key={i}
                              className={`text-xs px-1 py-0.5 rounded truncate ${getStatusColor(apt.status)}`}
                            >
                              {apt.time} {apt.petName}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-[#B58568]">
                              +{dayAppointments.length - 2} más
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Vista de lista diaria */
          <div>
            {filteredAppointments.length > 0 ? (
              <div className="space-y-3">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <img 
                          src={appointment.petImage} 
                          alt={appointment.petName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-[#3D291D]">{appointment.petName}</h3>
                              <p className="text-sm text-[#B58568]">{appointment.petType}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-[#E55826] text-sm mb-1">
                                <Clock size={14} />
                                {appointment.time}
                              </div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getStatusColor(appointment.status)}`}>
                                {getStatusText(appointment.status)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium text-[#3D291D] mb-1">{appointment.type}</p>
                            {appointment.notes && (
                              <p className="text-sm text-[#B58568]">{appointment.notes}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-[#B58568] mb-3">
                            <div className="flex items-center gap-1">
                              <User size={12} />
                              {appointment.ownerName}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone size={12} />
                              {appointment.ownerPhone}
                            </div>
                          </div>

                          {/* Acciones */}
                          <div className="flex gap-2 pt-2 border-t border-gray-100">
                            {appointment.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                  className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                                >
                                  Confirmar
                                </button>
                                <button 
                                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                  className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                                >
                                  Cancelar
                                </button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && (
                              <>
                                <button 
                                  onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                  className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                                >
                                  Marcar Completada
                                </button>
                                <button 
                                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                  className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                                >
                                  Cancelar
                                </button>
                              </>
                            )}
                            {appointment.status === 'completed' && (
                              <div className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg text-center">
                                Cita completada
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Calendar size={48} className="text-[#B58568] mx-auto mb-4" />
                <h3 className="font-semibold text-[#3D291D] mb-2">No hay citas programadas</h3>
                <p className="text-[#B58568] text-sm mb-4">
                  No se encontraron citas para esta fecha con los filtros aplicados.
                </p>
                <button 
                  onClick={() => setIsAddFormOpen(true)}
                  className="px-4 py-2 bg-[#E55826] hover:bg-[#d14920] text-white rounded-lg transition-colors"
                >
                  Programar Nueva Cita
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Formulario de nueva cita */}
      <AddAppointmentForm 
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={handleSaveAppointment}
      />
    </div>
  );
}