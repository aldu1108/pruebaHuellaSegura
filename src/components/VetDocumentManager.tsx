import { useState } from 'react';
import { FileText, Upload, Download, Eye, Trash2, Camera, Image, FileType, ChevronLeft } from 'lucide-react';
import { BottomNavigationVet } from './BottomNavigationVet';

interface Document {
  id: number;
  name: string;
  type: 'image' | 'pdf' | 'text' | 'other';
  size: string;
  uploadDate: string;
  petName: string;
  consultationDate: string;
  category: 'radiografia' | 'analisis' | 'receta' | 'informe' | 'imagen' | 'otro';
  url: string;
  thumbnail?: string;
}

interface VetDocumentManagerProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function VetDocumentManager({ onBack, onNavigate }: VetDocumentManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [petFilter, setPetFilter] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Radiografía Luna - Enero 2024.jpg',
      type: 'image',
      size: '2.1 MB',
      uploadDate: '2024-01-15',
      petName: 'Luna',
      consultationDate: '2024-01-15',
      category: 'radiografia',
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx4cmF5JTIwdmV0ZXJpbmFyeSUyMGRvZ3xlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx4cmF5JTIwdmV0ZXJpbmFyeSUyMGRvZ3xlbnwxfHx8fDE3NTYwNjI0MTN8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: 2,
      name: 'Análisis de sangre - Whiskers.pdf',
      type: 'pdf',
      size: '345 KB',
      uploadDate: '2024-01-10',
      petName: 'Whiskers',
      consultationDate: '2024-01-10',
      category: 'analisis',
      url: '#',
    },
    {
      id: 3,
      name: 'Receta Max - Post-operatorio.pdf',
      type: 'pdf',
      size: '128 KB',
      uploadDate: '2023-12-20',
      petName: 'Max',
      consultationDate: '2023-12-20',
      category: 'receta',
      url: '#',
    },
    {
      id: 4,
      name: 'Informe cirugía Max.docx',
      type: 'text',
      size: '89 KB',
      uploadDate: '2023-12-20',
      petName: 'Max',
      consultationDate: '2023-12-20',
      category: 'informe',
      url: '#',
    },
    {
      id: 5,
      name: 'Foto herida cicatrizada - Max.jpg',
      type: 'image',
      size: '1.8 MB',
      uploadDate: '2024-01-05',
      petName: 'Max',
      consultationDate: '2024-01-05',
      category: 'imagen',
      url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb3702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBoZWFsaW5nJTIwd291bmR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      thumbnail: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb3702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBoZWFsaW5nJTIwd291bmR8ZW58MXx8fHwxNzU2MDYyNDE0fDA&ixlib=rb-4.1.0&q=80&w=400'
    }
  ]);

  const pets = Array.from(new Set(documents.map(doc => doc.petName)));

  const categories = [
    { value: 'radiografia', label: 'Radiografías', icon: FileType },
    { value: 'analisis', label: 'Análisis', icon: FileText },
    { value: 'receta', label: 'Recetas', icon: FileText },
    { value: 'informe', label: 'Informes', icon: FileText },
    { value: 'imagen', label: 'Imágenes', icon: Image },
    { value: 'otro', label: 'Otros', icon: FileText }
  ];

  const getDocumentIcon = (type: string, category: string) => {
    if (type === 'image') return Image;
    if (category === 'radiografia') return FileType;
    return FileText;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'radiografia':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'analisis':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'receta':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'informe':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'imagen':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.petName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesPet = petFilter === 'all' || doc.petName === petFilter;
    return matchesSearch && matchesCategory && matchesPet;
  });

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
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
            <h1 className="text-xl font-bold text-[#3D291D]">Documentos</h1>
            <p className="text-sm text-[#3D291D] opacity-80">Gestiona archivos de consultas</p>
          </div>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#E55826] hover:bg-[#d14920] text-white p-2 rounded-lg transition-colors"
        >
          <Upload size={20} />
        </button>
      </div>

      {/* Estadísticas */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="font-semibold text-[#3D291D] mb-3">Resumen de Documentos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-[#E55826]">{documents.length}</div>
              <div className="text-xs text-[#B58568]">Total</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#E55826]">
                {documents.filter(d => d.category === 'radiografia').length}
              </div>
              <div className="text-xs text-[#B58568]">Radiografías</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#E55826]">
                {documents.filter(d => d.category === 'analisis').length}
              </div>
              <div className="text-xs text-[#B58568]">Análisis</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#E55826]">
                {documents.filter(d => d.type === 'image').length}
              </div>
              <div className="text-xs text-[#B58568]">Imágenes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex-1 p-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <select
                value={petFilter}
                onChange={(e) => setPetFilter(e.target.value)}
                className="flex-1 p-2 border border-[#B58568] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55826] text-sm"
              >
                <option value="all">Todas las mascotas</option>
                {pets.map(pet => (
                  <option key={pet} value={pet}>{pet}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de documentos */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#3D291D]">
            Documentos ({filteredDocuments.length})
          </h2>
        </div>

        {filteredDocuments.length > 0 ? (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => {
              const IconComponent = getDocumentIcon(doc.type, doc.category);
              return (
                <div key={doc.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {doc.thumbnail ? (
                        <img 
                          src={doc.thumbnail} 
                          alt={doc.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <IconComponent size={20} className="text-[#B58568]" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#3D291D] truncate">{doc.name}</h3>
                            <p className="text-sm text-[#B58568]">{doc.petName} • {doc.size}</p>
                          </div>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs border ${getCategoryColor(doc.category)}`}>
                            {categories.find(c => c.value === doc.category)?.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-[#B58568] mb-3">
                          <span>Subido: {new Date(doc.uploadDate).toLocaleDateString('es-ES')}</span>
                          <span>Consulta: {new Date(doc.consultationDate).toLocaleDateString('es-ES')}</span>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleViewDocument(doc)}
                            className="flex-1 px-3 py-2 bg-[#EE9444] hover:bg-[#E55826] text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <Eye size={14} />
                            Ver
                          </button>
                          <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                            <Download size={14} />
                            Descargar
                          </button>
                          <button 
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FileText size={48} className="text-[#B58568] mx-auto mb-4" />
            <h3 className="font-semibold text-[#3D291D] mb-2">No se encontraron documentos</h3>
            <p className="text-[#B58568] text-sm mb-4">
              No hay documentos que coincidan con los filtros aplicados.
            </p>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 bg-[#E55826] hover:bg-[#d14920] text-white rounded-lg transition-colors"
            >
              Subir Primer Documento
            </button>
          </div>
        )}
      </div>

      {/* Modal de subida */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#3D291D]">Subir Documento</h3>
            </div>
            <div className="p-4">
              <div className="border-2 border-dashed border-[#B58568] rounded-lg p-8 text-center">
                <Upload size={32} className="text-[#B58568] mx-auto mb-3" />
                <p className="text-[#3D291D] mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-sm text-[#B58568]">Máximo 10MB • JPG, PNG, PDF, DOC</p>
                <button className="mt-3 px-4 py-2 bg-[#E55826] hover:bg-[#d14920] text-white rounded-lg transition-colors">
                  Seleccionar Archivos
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-[#B58568] border border-[#B58568] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de vista de documento */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#3D291D]">{selectedDocument.name}</h3>
              <button 
                onClick={() => setSelectedDocument(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {selectedDocument.thumbnail ? (
                <img 
                  src={selectedDocument.url} 
                  alt={selectedDocument.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText size={48} className="text-[#B58568]" />
                  <div className="ml-3">
                    <p className="font-medium text-[#3D291D]">{selectedDocument.name}</p>
                    <p className="text-sm text-[#B58568]">{selectedDocument.size}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                Descargar
              </button>
              <button 
                onClick={() => setSelectedDocument(null)}
                className="px-4 py-2 text-[#B58568] border border-[#B58568] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}