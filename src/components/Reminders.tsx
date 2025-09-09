import { Bell, Calendar, Clock, ChevronRight } from 'lucide-react';

export function Reminders() {
  const reminders = [
    {
      id: 1,
      pet: 'Max',
      type: 'Vacuna',
      time: '14:00',
      date: 'Hoy',
      priority: 'high' as const
    },
    {
      id: 2,
      pet: 'Luna',
      type: 'Medicina',
      time: '18:30',
      date: 'Hoy',
      priority: 'medium' as const
    },
    {
      id: 3,
      pet: 'Max',
      type: 'Cita veterinario',
      time: '10:00',
      date: 'Mañana',
      priority: 'high' as const
    }
  ];

  const todayReminders = reminders.filter(r => r.date === 'Hoy');
  const upcomingReminders = reminders.filter(r => r.date !== 'Hoy');

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-[#E55826]" />
          <h2 className="text-lg font-semibold text-[#3D291D]">Recordatorios Urgentes</h2>
        </div>
        <span className="text-sm text-[#B58568]">
          {todayReminders.length} para hoy
        </span>
      </div>
      
      {/* Recordatorios de hoy */}
      {todayReminders.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[#E55826] rounded-full"></div>
            <h3 className="font-medium text-[#3D291D] text-sm">Para hoy</h3>
          </div>
          <div className="space-y-2">
            {todayReminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${getPriorityColor(reminder.priority)} hover:shadow-sm transition-shadow cursor-pointer`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[#3D291D] text-sm">{reminder.pet}</span>
                    <span className="text-xs text-[#B58568]">•</span>
                    <span className="text-sm text-[#3D291D]">{reminder.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-[#B58568]" />
                    <span className="text-xs text-[#B58568]">{reminder.time}</span>
                    {reminder.priority === 'high' && (
                      <span className="bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full">
                        Urgente
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#B58568]" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximos recordatorios */}
      {upcomingReminders.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[#B58568] rounded-full"></div>
            <h3 className="font-medium text-[#3D291D] text-sm">Próximamente</h3>
          </div>
          <div className="space-y-2">
            {upcomingReminders.slice(0, 2).map((reminder) => (
              <div 
                key={reminder.id} 
                className="flex items-center justify-between p-2 bg-[#FAE5A1] bg-opacity-30 rounded-lg hover:bg-opacity-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-[#B58568]" />
                    <span className="text-xs text-[#B58568]">{reminder.date}</span>
                  </div>
                  <span className="text-xs text-[#B58568]">•</span>
                  <span className="text-sm text-[#3D291D]">{reminder.pet}</span>
                  <span className="text-xs text-[#B58568]">{reminder.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#B58568]">{reminder.time}</span>
                  <ChevronRight size={14} className="text-[#B58568]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reminders.length === 0 && (
        <div className="text-center py-6">
          <Bell size={32} className="text-[#B58568] mx-auto mb-2 opacity-50" />
          <div className="text-[#B58568] text-sm">No tienes recordatorios pendientes</div>
          <div className="text-xs text-[#B58568] mt-1">¡Perfecto! Tus mascotas están al día</div>
        </div>
      )}

      {/* Botón para ver todos */}
      <div className="mt-4 pt-3 border-t border-[#B58568] border-opacity-20">
        <button className="w-full text-center text-sm text-[#E55826] hover:text-[#d14918] transition-colors flex items-center justify-center gap-1">
          Ver todos los recordatorios
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}