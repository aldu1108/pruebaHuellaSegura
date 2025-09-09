import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { ChevronLeft, ChevronRight, Clock, Stethoscope, Pill, Syringe, Heart, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarEvent {
  id: number;
  petId: number;
  petName: string;
  petImage: string;
  title: string;
  type: 'vaccine' | 'medicine' | 'vet' | 'grooming' | 'checkup';
  time: string;
  date: Date;
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

export function PetCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Datos de ejemplo de eventos del calendario
  const events: CalendarEvent[] = [
    {
      id: 1,
      petId: 1,
      petName: 'Max',
      petImage: 'https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwb3J0cmFpdCUyMGhhcHB5fGVufDF8fHx8MTc1NjA2MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Vacuna anual',
      type: 'vaccine',
      time: '14:00',
      date: new Date(),
      priority: 'high',
      description: 'Vacuna anual completa'
    },
    {
      id: 2,
      petId: 2,
      petName: 'Luna',
      petImage: 'https://images.unsplash.com/photo-1665857145482-7747d2b16a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBzaXR0aW5nJTIwY3V0ZXxlbnwxfHx8fDE3NTYwNjAyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Medicina para alergias',
      type: 'medicine',
      time: '18:30',
      date: new Date(),
      priority: 'medium',
      description: 'Administrar antihistamínico'
    },
    {
      id: 3,
      petId: 1,
      petName: 'Max',
      petImage: 'https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwb3J0cmFpdCUyMGhhcHB5fGVufDF8fHx8MTc1NjA2MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Cita veterinario',
      type: 'vet',
      time: '10:00',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mañana
      priority: 'high',
      description: 'Revisión general'
    },
    {
      id: 4,
      petId: 2,
      petName: 'Luna',
      petImage: 'https://images.unsplash.com/photo-1665857145482-7747d2b16a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBzaXR0aW5nJTIwY3V0ZXxlbnwxfHx8fDE3NTYwNjAyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Peluquería canina',
      type: 'grooming',
      time: '16:00',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Pasado mañana
      priority: 'low',
      description: 'Corte de pelo y uñas'
    },
    {
      id: 5,
      petId: 1,
      petName: 'Max',
      petImage: 'https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwb3J0cmFpdCUyMGhhcHB5fGVufDF8fHx8MTc1NjA2MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Revisión dental',
      type: 'checkup',
      time: '11:30',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // En una semana
      priority: 'medium',
      description: 'Limpieza dental programada'
    }
  ];

  // Función para obtener eventos de una fecha específica
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  // Función para verificar si una fecha tiene eventos
  const hasEvents = (date: Date) => {
    return events.some(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  // Función para obtener el icono según el tipo de evento
  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'vaccine':
        return <Syringe size={14} className="text-red-600" />;
      case 'medicine':
        return <Pill size={14} className="text-blue-600" />;
      case 'vet':
        return <Stethoscope size={14} className="text-green-600" />;
      case 'grooming':
        return <Heart size={14} className="text-pink-600" />;
      case 'checkup':
        return <CalendarIcon size={14} className="text-purple-600" />;
      default:
        return <Clock size={14} className="text-gray-600" />;
    }
  };

  // Función para obtener el color de prioridad
  const getPriorityColor = (priority: CalendarEvent['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const formatTime = (time: string) => time;

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon size={20} className="text-[#E55826]" />
          <h2 className="text-lg font-semibold text-[#3D291D]">Calendario de Cuidados</h2>
        </div>
        <div className="text-sm text-[#B58568]">
          {events.length} eventos programados
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendario */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const newMonth = new Date(currentMonth);
                newMonth.setMonth(newMonth.getMonth() - 1);
                setCurrentMonth(newMonth);
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={20} className="text-[#B58568]" />
            </button>
            
            <h3 className="font-semibold text-[#3D291D]">
              {currentMonth.toLocaleDateString('es-ES', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h3>
            
            <button
              onClick={() => {
                const newMonth = new Date(currentMonth);
                newMonth.setMonth(newMonth.getMonth() + 1);
                setCurrentMonth(newMonth);
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight size={20} className="text-[#B58568]" />
            </button>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md border border-[#B58568] border-opacity-30"
            modifiers={{
              hasEvents: (date) => hasEvents(date)
            }}
            modifiersClassNames={{
              hasEvents: "bg-[#FAE5A1] font-semibold text-[#E55826] relative"
            }}
          />

          {/* Leyenda */}
          <div className="text-xs text-[#B58568]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FAE5A1] rounded"></div>
              <span>Días con eventos programados</span>
            </div>
          </div>
        </div>

        {/* Eventos del día seleccionado */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#3D291D] flex items-center gap-2">
            <Clock size={16} />
            {selectedDate ? formatDate(selectedDate) : 'Selecciona una fecha'}
            {selectedDateEvents.length > 0 && (
              <span className="bg-[#E55826] text-white text-xs px-2 py-1 rounded-full">
                {selectedDateEvents.length}
              </span>
            )}
          </h3>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((event) => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border-l-4 ${getPriorityColor(event.priority)} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getEventIcon(event.type)}
                          <span className="font-semibold text-[#3D291D] text-sm">
                            {event.title}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={event.petImage}
                            alt={event.petName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-sm text-[#B58568]">{event.petName}</span>
                          <span className="text-xs text-[#B58568]">•</span>
                          <span className="text-sm font-medium text-[#3D291D]">{formatTime(event.time)}</span>
                        </div>
                        
                        {event.description && (
                          <div className="text-xs text-[#B58568]">{event.description}</div>
                        )}
                      </div>
                      
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        event.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : event.priority === 'medium' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {event.priority === 'high' ? 'Urgente' : 
                         event.priority === 'medium' ? 'Medio' : 'Bajo'}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8">
                <CalendarIcon size={48} className="text-[#B58568] mx-auto mb-3 opacity-50" />
                <div className="text-[#B58568] text-sm">
                  No hay eventos programados para esta fecha
                </div>
                <div className="text-xs text-[#B58568] mt-1">
                  Selecciona otra fecha para ver los recordatorios
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resumen de próximos eventos */}
      <div className="mt-6 pt-4 border-t border-[#B58568] border-opacity-20">
        <h4 className="font-medium text-[#3D291D] mb-3 text-sm">Próximos eventos esta semana</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {events
            .filter(event => {
              const eventDate = event.date;
              const today = new Date();
              const nextWeek = new Date(today);
              nextWeek.setDate(today.getDate() + 7);
              return eventDate >= today && eventDate <= nextWeek;
            })
            .slice(0, 3)
            .map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-2 p-2 bg-[#FAE5A1] bg-opacity-50 rounded-lg text-xs"
              >
                {getEventIcon(event.type)}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#3D291D] truncate">{event.petName}</div>
                  <div className="text-[#B58568] truncate">{formatDate(event.date)}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}