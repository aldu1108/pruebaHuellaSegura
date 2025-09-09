import { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle, Heart, Share2, UserPlus, Calendar, MapPin, Camera, Plus, TrendingUp, Award, Users } from 'lucide-react';

interface CommunityPageProps {
  onNavigate: (page: string, petId?: number) => void;
  onLogout?: () => void;
  onSearch?: (term: string) => void;
  onFilter?: (filters: string[]) => void;
  searchTerm?: string;
  activeFilters?: string[];
  selectedPetId?: number | null;
}

interface CommunityPost {
  id: number;
  author: {
    name: string;
    avatar: string;
    badges: string[];
  };
  content: string;
  image?: string;
  petName?: string;
  location?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  type: 'general' | 'achievement' | 'help' | 'event';
}

export function CommunityPage({ 
  onNavigate, 
  onLogout, 
  onSearch, 
  onFilter, 
  searchTerm, 
  activeFilters, 
  selectedPetId 
}: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'groups'>('feed');
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 1,
      author: {
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
        badges: ['🏆', '❤️']
      },
      content: '¡Luna acaba de pasar su primer examen veterinario con excelentes resultados! 🎉 Gracias al Dr. Martínez por el cuidado excepcional.',
      image: 'https://images.unsplash.com/photo-1719292607023-b2fb3a30a9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      petName: 'Luna',
      timestamp: 'Hace 2 horas',
      likes: 24,
      comments: 5,
      isLiked: false,
      type: 'achievement'
    },
    {
      id: 2,
      author: {
        name: 'Carlos Ruiz',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
        badges: ['🐱']
      },
      content: '¿Alguien sabe de un buen veterinario especialista en gatos en la zona de Salamanca? Mi gatito necesita una revisión especializada.',
      location: 'Madrid, Salamanca',
      timestamp: 'Hace 4 horas',
      likes: 12,
      comments: 8,
      isLiked: true,
      type: 'help'
    },
    {
      id: 3,
      author: {
        name: 'Ana López',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
        badges: ['🌟', '🏅']
      },
      content: 'Evento de adopción este sábado en el Parque del Retiro. ¡Ven a conocer a nuestros peludos en busca de hogar! 🏠❤️',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      location: 'Parque del Retiro',
      timestamp: 'Hace 6 horas',
      likes: 45,
      comments: 12,
      isLiked: false,
      type: 'event'
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    alert('Función de comentarios - Por implementar');
  };

  const handleShare = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post && navigator.share) {
      navigator.share({
        title: `Post de ${post.author.name}`,
        text: post.content,
        url: window.location.href,
      });
    } else {
      alert('Post compartido - Por implementar');
    }
  };

  const handleNewPost = () => {
    alert('Crear nuevo post - Por implementar');
  };

  const handleJoinEvent = (eventId: number) => {
    alert('Unirse al evento - Por implementar');
  };

  const handleJoinGroup = (groupName: string) => {
    alert(`Unirse al grupo "${groupName}" - Por implementar`);
  };

  const communityStats = {
    members: 1247,
    activePets: 856,
    postsToday: 23,
    helpRequests: 7
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Adopción Solidaria',
      date: '15 Feb',
      time: '10:00',
      location: 'Parque del Retiro',
      attendees: 45
    },
    {
      id: 2,
      title: 'Taller de Primeros Auxilios',
      date: '18 Feb',
      time: '16:00',
      location: 'Centro Veterinario',
      attendees: 12
    }
  ];

  const topGroups = [
    { name: 'Dueños de Golden Retriever', members: 234, icon: '🐕' },
    { name: 'Gatos de Madrid', members: 189, icon: '🐱' },
    { name: 'Primeros Auxilios Pet', members: 156, icon: '🏥' },
    { name: 'Adopción Responsable', members: 203, icon: '❤️' }
  ];

  const renderPost = (post: CommunityPost) => (
    <div key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Header del post */}
      <div className="flex items-center gap-3 mb-3">
        <ImageWithFallback 
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#3D291D]">{post.author.name}</h3>
            <div className="flex gap-1">
              {post.author.badges.map((badge, index) => (
                <span key={index} className="text-sm">{badge}</span>
              ))}
            </div>
          </div>
          <p className="text-sm text-[#B58568]">{post.timestamp}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          post.type === 'achievement' ? 'bg-yellow-100 text-yellow-800' :
          post.type === 'help' ? 'bg-blue-100 text-blue-800' :
          post.type === 'event' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {post.type === 'achievement' ? '🏆 Logro' :
           post.type === 'help' ? '❓ Ayuda' :
           post.type === 'event' ? '📅 Evento' : 'General'}
        </div>
      </div>

      {/* Contenido */}
      <p className="text-[#3D291D] mb-3">{post.content}</p>

      {/* Imagen */}
      {post.image && (
        <ImageWithFallback 
          src={post.image}
          alt="Post image"
          className="w-full h-64 object-cover rounded-lg mb-3"
        />
      )}

      {/* Información adicional */}
      {(post.petName || post.location) && (
        <div className="flex items-center gap-4 text-sm text-[#B58568] mb-3">
          {post.petName && <span>🐾 {post.petName}</span>}
          {post.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {post.location}
            </span>
          )}
        </div>
      )}

      {/* Acciones */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <button 
          onClick={() => handleLike(post.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            post.isLiked 
              ? 'bg-red-100 text-red-600' 
              : 'hover:bg-gray-100 text-[#B58568]'
          }`}
        >
          <Heart size={16} className={post.isLiked ? 'fill-current' : ''} />
          <span>{post.likes}</span>
        </button>

        <button 
          onClick={() => handleComment(post.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B58568] transition-colors"
        >
          <MessageCircle size={16} />
          <span>{post.comments}</span>
        </button>

        <button 
          onClick={() => handleShare(post.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B58568] transition-colors"
        >
          <Share2 size={16} />
          <span>Compartir</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        onSearch={onSearch}
        searchTerm={searchTerm}
      />
      
      <main className="pt-20 pb-20 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#3D291D] mb-2">Comunidad PetCare 🌟</h1>
          <p className="text-[#B58568]">Conecta con otros amantes de las mascotas</p>
        </div>

        {/* Estadísticas de la comunidad */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-[#E55826]">{communityStats.members}</div>
                <div className="text-xs text-[#B58568]">Miembros</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#E55826]">{communityStats.activePets}</div>
                <div className="text-xs text-[#B58568]">Mascotas</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#E55826]">{communityStats.postsToday}</div>
                <div className="text-xs text-[#B58568]">Posts hoy</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#E55826]">{communityStats.helpRequests}</div>
                <div className="text-xs text-[#B58568]">Ayudas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex bg-white rounded-lg shadow-md p-1">
            {[
              { id: 'feed', label: 'Feed', icon: TrendingUp },
              { id: 'events', label: 'Eventos', icon: Calendar },
              { id: 'groups', label: 'Grupos', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#E55826] text-white'
                      : 'text-[#B58568] hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido según tab activo */}
        {activeTab === 'feed' && (
          <div>
            {/* Botón para nuevo post */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <button 
                onClick={handleNewPost}
                className="w-full flex items-center gap-3 p-3 border border-[#B58568] border-opacity-30 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Camera size={20} className="text-[#E55826]" />
                <span className="text-[#B58568]">¿Qué quieres compartir con la comunidad?</span>
              </button>
            </div>

            {/* Posts */}
            {posts.map(renderPost)}
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#3D291D]">Próximos Eventos</h2>
              <button className="bg-[#E55826] text-white px-4 py-2 rounded-lg text-sm">
                Crear Evento
              </button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-[#3D291D]">{event.title}</h3>
                    <span className="bg-[#FAE5A1] text-[#3D291D] px-2 py-1 rounded-full text-xs">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#B58568] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {event.attendees} asistirán
                    </span>
                  </div>
                  <button 
                    onClick={() => handleJoinEvent(event.id)}
                    className="w-full bg-[#EE9444] text-white py-2 rounded-lg hover:bg-[#E55826] transition-colors"
                  >
                    Unirse al Evento
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#3D291D]">Grupos Populares</h2>
              <button className="bg-[#E55826] text-white px-4 py-2 rounded-lg text-sm">
                Crear Grupo
              </button>
            </div>

            <div className="space-y-3">
              {topGroups.map((group, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#FAE5A1] rounded-full flex items-center justify-center text-2xl">
                        {group.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#3D291D]">{group.name}</h3>
                        <p className="text-sm text-[#B58568]">{group.members} miembros</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleJoinGroup(group.name)}
                      className="bg-[#EE9444] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#E55826] transition-colors"
                    >
                      Unirse
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <BottomNavigation onNavigate={onNavigate} />
    </div>
  );
}