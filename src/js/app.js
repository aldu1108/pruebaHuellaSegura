// PetCare - Aplicación Principal JavaScript Vanilla
class PetCareApp {
    constructor() {
        this.currentPage = 'home';
        this.isAuthenticated = false;
        this.userType = null; // 'client' o 'vet'
        this.currentUser = null;
        this.selectedPetId = null;
        this.searchTerm = '';
        this.activeFilters = [];
        this.sidebarOpen = false;
        
        // Datos de ejemplo para usuarios cliente
        this.pets = [
            {
                id: 1,
                name: 'Luna',
                type: 'Golden Retriever',
                age: '2 años',
                status: 'Saludable',
                image: 'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NTY2MzQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
                lastVisit: '10 Dic 2024',
                weight: '25kg',
                nextAppointment: '15 Ene 2025'
            },
            {
                id: 2,
                name: 'Whiskers',
                type: 'Gato Persa',
                age: '1 año',
                status: 'Revisión pendiente',
                image: 'https://images.unsplash.com/photo-1604242251651-546f5f05ccb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcGVyc2lhbiUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY4OTA1Nnww&ixlib=rb-4.1.0&q=80&w=400',
                lastVisit: '5 Ene 2025',
                weight: '4kg',
                nextAppointment: '20 Ene 2025'
            }
        ];

        // Datos de ejemplo para veterinarios
        this.vetPatients = [
            {
                id: 1,
                name: 'Luna',
                type: 'Golden Retriever',
                age: '2 años',
                owner: 'María García',
                ownerPhone: '+34 600 123 456',
                lastVisit: '10 Dic 2024',
                weight: '25kg',
                nextAppointment: '15 Ene 2025',
                image: 'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NTY2MzQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
                medicalHistory: [
                    {
                        id: 1,
                        date: '10 Dic 2024',
                        type: 'Consulta general',
                        diagnosis: 'Revisión rutinaria - Excelente estado de salud',
                        treatment: 'Continuar con alimentación actual',
                        weight: '25kg',
                        temperature: '38.5°C',
                        heartRate: '110 bpm',
                        documents: ['radiografia_luna_10dic.pdf']
                    },
                    {
                        id: 2,
                        date: '15 Sep 2024',
                        type: 'Vacunación',
                        diagnosis: 'Vacunación anual completa',
                        treatment: 'Vacuna rabia y polivalente',
                        weight: '24kg',
                        temperature: '38.2°C',
                        heartRate: '105 bpm',
                        documents: ['cartilla_vacunas_luna.pdf']
                    }
                ]
            },
            {
                id: 2,
                name: 'Whiskers',
                type: 'Gato Persa',
                age: '1 año',
                owner: 'Carlos Ruiz',
                ownerPhone: '+34 655 987 321',
                lastVisit: '5 Ene 2025',
                weight: '4kg',
                nextAppointment: '20 Ene 2025',
                image: 'https://images.unsplash.com/photo-1604242251651-546f5f05ccb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcGVyc2lhbiUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY4OTA1Nnww&ixlib=rb-4.1.0&q=80&w=400',
                medicalHistory: [
                    {
                        id: 1,
                        date: '5 Ene 2025',
                        type: 'Consulta dermatológica',
                        diagnosis: 'Dermatitis leve en zona abdominal',
                        treatment: 'Champú medicado y crema tópica durante 10 días',
                        weight: '4kg',
                        temperature: '38.8°C',
                        heartRate: '180 bpm',
                        documents: ['analisis_piel_whiskers.pdf']
                    }
                ]
            }
        ];

        this.vetAppointments = [
            {
                id: 1,
                petName: 'Luna',
                petId: 1,
                ownerName: 'María García',
                date: '2025-01-15',
                time: '10:00',
                type: 'Vacunación',
                status: 'Confirmada',
                notes: 'Vacuna anual de refuerzo'
            },
            {
                id: 2,
                petName: 'Whiskers',
                petId: 2,
                ownerName: 'Carlos Ruiz',
                date: '2025-01-20',
                time: '14:00',
                type: 'Control dermatológico',
                status: 'Pendiente',
                notes: 'Seguimiento tratamiento dermatitis'
            },
            {
                id: 3,
                petName: 'Max',
                petId: 3,
                ownerName: 'Laura Sánchez',
                date: '2025-01-18',
                time: '11:30',
                type: 'Consulta general',
                status: 'Confirmada',
                notes: 'Primera consulta cachorro'
            }
        ];

        // Menús según tipo de usuario
        this.clientMenuItems = [
            { id: 'home', label: 'Página Principal', icon: '🏠' },
            { id: 'pets', label: 'Mis Mascotas', icon: '🐕' },
            { id: 'search', label: 'Mascotas Perdidas', icon: '🔍' },
            { id: 'store', label: 'Tienda', icon: '🛒' },
            { id: 'community', label: 'Comunidad', icon: '👥' },
            { id: 'vet', label: 'Veterinario', icon: '🏥' }
        ];

        this.vetMenuItems = [
            { id: 'vet-dashboard', label: 'Panel Principal', icon: '🏥' },
            { id: 'vet-patients', label: 'Mis Pacientes', icon: '🐕' },
            { id: 'vet-appointments', label: 'Agenda de Citas', icon: '📅' },
            { id: 'vet-history', label: 'Historial Médico', icon: '📋' },
            { id: 'vet-profile', label: 'Mi Perfil', icon: '👨‍⚕️' }
        ];

        this.clientNavItems = [
            { id: 'home', label: 'Inicio', icon: '🏠' },
            { id: 'search', label: 'Buscar', icon: '🔍' },
            { id: 'pets', label: 'Mascotas', icon: '❤️' },
            { id: 'community', label: 'Comunidad', icon: '👥' },
            { id: 'vet', label: 'Veterinario', icon: '🏥' }
        ];

        this.vetNavItems = [
            { id: 'vet-dashboard', label: 'Panel', icon: '🏥' },
            { id: 'vet-patients', label: 'Pacientes', icon: '🐕' },
            { id: 'vet-appointments', label: 'Agenda', icon: '📅' },
            { id: 'vet-history', label: 'Historial', icon: '📋' }
        ];

        this.init();
    }

    init() {
        // Inicializar la aplicación después de que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupEventListeners();
        
        // Ir directamente al login sin loader
        document.getElementById('app').classList.remove('hidden');
        this.showLoginPage();
    }

    setupEventListeners() {
        // Menú hamburguesa
        document.getElementById('menu-btn').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('close-menu-btn').addEventListener('click', () => this.closeSidebar());
        document.getElementById('sidebar-overlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('sidebar-overlay')) {
                this.closeSidebar();
            }
        });

        // Búsqueda
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.handleSearch();
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        const overlay = document.getElementById('sidebar-overlay');
        const sidebar = document.getElementById('sidebar');
        
        if (this.sidebarOpen) {
            overlay.classList.remove('hidden');
            setTimeout(() => sidebar.classList.add('open'), 10);
        } else {
            this.closeSidebar();
        }
    }

    closeSidebar() {
        this.sidebarOpen = false;
        const overlay = document.getElementById('sidebar-overlay');
        const sidebar = document.getElementById('sidebar');
        
        sidebar.classList.remove('open');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }

    navigateTo(page, petId = null) {
        this.currentPage = page;
        this.selectedPetId = petId;
        this.closeSidebar();
        this.renderCurrentPage();
        this.updateActiveNavigation();
    }

    showLoginPage() {
        const mainContent = document.getElementById('main-content').querySelector('div');
        const header = document.getElementById('header');
        const bottomNav = document.getElementById('bottom-nav');
        
        // Ocultar header y navegación durante login
        header.style.display = 'none';
        bottomNav.style.display = 'none';
        
        mainContent.innerHTML = `
            <div class="min-h-screen flex items-center justify-center px-4" style="background: linear-gradient(135deg, var(--petcare-header) 0%, var(--petcare-menu-bg) 100%);">
                <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                    <div class="text-center mb-8">
                        <div class="mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-4" style="background-color: var(--petcare-header);">
                            <span class="text-3xl">🐾</span>
                        </div>
                        <h1 class="text-3xl font-bold" style="color: var(--petcare-menu-text);">PetCare</h1>
                        <p class="text-gray-600 mt-2">Cuidado integral para tus mascotas</p>
                    </div>

                    <div id="login-tabs" class="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button id="client-tab" class="flex-1 py-2 px-4 rounded-md font-medium transition" style="background-color: var(--petcare-accent); color: white;">
                            Cliente
                        </button>
                        <button id="vet-tab" class="flex-1 py-2 px-4 rounded-md font-medium transition text-gray-600 hover:text-gray-800">
                            Veterinario
                        </button>
                    </div>

                    <form id="login-form" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                id="login-email"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="tucorreo@ejemplo.com"
                                required
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                            <input 
                                type="password" 
                                id="login-password"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div class="flex items-center justify-between">
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-orange-600 focus:ring-orange-500">
                                <span class="ml-2 text-sm text-gray-600">Recordarme</span>
                            </label>
                            <a href="#" class="text-sm text-orange-600 hover:text-orange-700">¿Olvidaste tu contraseña?</a>
                        </div>

                        <button 
                            type="submit" 
                            class="w-full py-3 px-4 rounded-lg font-medium text-white transition hover:shadow-lg"
                            style="background-color: var(--petcare-accent);"
                        >
                            <span id="login-button-text">Iniciar Sesión como Cliente</span>
                        </button>
                    </form>

                    <div class="mt-6 text-center">
                        <span class="text-gray-600">¿No tienes cuenta? </span>
                        <button id="register-link" class="text-orange-600 hover:text-orange-700 font-medium">
                            Registrarse como Cliente
                        </button>
                    </div>

                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <div class="text-center text-sm text-gray-500">
                            <p>🔒 Tus datos están protegidos</p>
                            <p class="mt-1">Demo: cliente@demo.com / vet@demo.com (contraseña: demo123)</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupLoginEventListeners();
    }

    setupLoginEventListeners() {
        const clientTab = document.getElementById('client-tab');
        const vetTab = document.getElementById('vet-tab');
        const loginForm = document.getElementById('login-form');
        const loginButtonText = document.getElementById('login-button-text');
        const registerLink = document.getElementById('register-link');

        let selectedUserType = 'client';

        // Cambio de pestañas
        clientTab.addEventListener('click', () => {
            selectedUserType = 'client';
            clientTab.style.backgroundColor = 'var(--petcare-accent)';
            clientTab.style.color = 'white';
            vetTab.style.backgroundColor = 'transparent';
            vetTab.style.color = '#6b7280';
            loginButtonText.textContent = 'Iniciar Sesión como Cliente';
            registerLink.textContent = 'Registrarse como Cliente';
        });

        vetTab.addEventListener('click', () => {
            selectedUserType = 'vet';
            vetTab.style.backgroundColor = 'var(--petcare-accent)';
            vetTab.style.color = 'white';
            clientTab.style.backgroundColor = 'transparent';
            clientTab.style.color = '#6b7280';
            loginButtonText.textContent = 'Iniciar Sesión como Veterinario';
            registerLink.textContent = 'Registrarse como Veterinario';
        });

        // Manejo del formulario de login
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Validación simple para demo
            if ((email === 'cliente@demo.com' || email === 'demo@cliente.com') && password === 'demo123') {
                this.login('client', { email, name: 'Usuario Demo', id: 1 });
            } else if ((email === 'vet@demo.com' || email === 'demo@vet.com') && password === 'demo123') {
                this.login('vet', { email, name: 'Dr. Demo', id: 1, license: 'VET001', specialty: 'Medicina General' });
            } else if (email && password) {
                // Para demo, cualquier credencial válida funciona
                if (selectedUserType === 'client') {
                    this.login('client', { email, name: 'Usuario Cliente', id: 1 });
                } else {
                    this.login('vet', { email, name: 'Dr. Veterinario', id: 1, license: 'VET001', specialty: 'Medicina General' });
                }
            } else {
                alert('Por favor, ingresa email y contraseña válidos');
            }
        });
    }

    login(userType, userData) {
        this.isAuthenticated = true;
        this.userType = userType;
        this.currentUser = userData;
        
        // Mostrar header y navegación
        document.getElementById('header').style.display = 'block';
        document.getElementById('bottom-nav').style.display = 'block';
        document.getElementById('logout-btn').classList.remove('hidden');
        
        // Navegar a la página inicial según el tipo de usuario
        if (userType === 'vet') {
            this.currentPage = 'vet-dashboard';
        } else {
            this.currentPage = 'home';
        }
        
        this.renderMenuItems();
        this.renderBottomNavigation();
        this.renderCurrentPage();
    }

    logout() {
        this.isAuthenticated = false;
        this.userType = null;
        this.currentUser = null;
        this.selectedPetId = null;
        document.getElementById('logout-btn').classList.add('hidden');
        this.showLoginPage();
    }

    renderMenuItems() {
        const menuNav = document.getElementById('menu-nav');
        menuNav.innerHTML = '';

        const menuItems = this.userType === 'vet' ? this.vetMenuItems : this.clientMenuItems;

        menuItems.forEach(item => {
            const button = document.createElement('button');
            button.className = `w-full flex items-center gap-4 p-4 rounded-lg transition ${
                this.currentPage === item.id 
                    ? 'bg-white bg-opacity-20' 
                    : 'hover:bg-white hover:bg-opacity-10'
            }`;
            button.onclick = () => this.navigateTo(item.id);
            
            button.innerHTML = `
                <span class="text-2xl">${item.icon}</span>
                <span class="font-medium" style="color: var(--petcare-menu-text);">
                    ${item.label}
                </span>
            `;
            
            menuNav.appendChild(button);
        });
    }

    renderBottomNavigation() {
        const bottomNav = document.getElementById('bottom-nav');
        const container = bottomNav.querySelector('.flex');
        container.innerHTML = '';

        const navItems = this.userType === 'vet' ? this.vetNavItems : this.clientNavItems;

        navItems.forEach(item => {
            const button = document.createElement('button');
            const isActive = this.currentPage === item.id;
            
            button.className = 'flex flex-col items-center py-2 px-3 rounded-lg transition';
            button.style.backgroundColor = isActive ? 'var(--petcare-nav-button)' : 'transparent';
            button.style.color = isActive ? 'white' : 'var(--petcare-nav-button)';
            button.onclick = () => this.navigateTo(item.id);
            
            button.innerHTML = `
                <span class="text-lg mb-1">${item.icon}</span>
                <span class="text-xs font-medium">${item.label}</span>
            `;
            
            container.appendChild(button);
        });
    }

    updateActiveNavigation() {
        this.renderMenuItems();
        this.renderBottomNavigation();
    }

    renderCurrentPage() {
        if (!this.isAuthenticated) {
            this.showLoginPage();
            return;
        }

        const mainContent = document.getElementById('main-content').querySelector('div');
        
        switch (this.currentPage) {
            case 'home':
                this.renderHomePage(mainContent);
                break;
            case 'pets':
                this.renderPetsPage(mainContent);
                break;
            case 'search':
                this.renderSearchPage(mainContent);
                break;
            case 'store':
                this.renderStorePage(mainContent);
                break;
            case 'community':
                this.renderCommunityPage(mainContent);
                break;
            case 'vet':
                this.renderVetPage(mainContent);
                break;
            // Páginas del veterinario
            case 'vet-dashboard':
                this.renderVetDashboard(mainContent);
                break;
            case 'vet-patients':
                this.renderVetPatients(mainContent);
                break;
            case 'vet-appointments':
                this.renderVetAppointments(mainContent);
                break;
            case 'vet-history':
                this.renderVetHistory(mainContent);
                break;
            case 'vet-profile':
                this.renderVetProfile(mainContent);
                break;
            case 'vet-patient-detail':
                this.renderVetPatientDetail(mainContent);
                break;
            case 'vet-add-visit':
                this.renderVetAddVisit(mainContent);
                break;
            default:
                if (this.userType === 'vet') {
                    this.renderVetDashboard(mainContent);
                } else {
                    this.renderHomePage(mainContent);
                }
        }
    }

    renderHomePage(container) {
        const upcomingEvents = [
            { title: 'Vacuna Luna', date: '15 Ene', time: '10:00 AM' },
            { title: 'Control Whiskers', date: '20 Ene', time: '2:00 PM' }
        ];

        const reminders = [
            { title: 'Dar medicina a Luna', time: '8:00 AM', priority: 'high' },
            { title: 'Pasear a Whiskers', time: '6:00 PM', priority: 'medium' }
        ];

        container.innerHTML = `
            <div class="space-y-6">
                <!-- Bienvenida -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        ¡Bienvenido a PetCare! 🐾
                    </h2>
                    <p class="text-gray-600 mb-4">
                        Tu aplicación integral para el cuidado de mascotas
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center p-4 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="text-2xl mb-2">🏥</div>
                            <div class="font-semibold" style="color: var(--petcare-menu-text);">2</div>
                            <div class="text-sm" style="color: var(--petcare-menu-text);">Citas pendientes</div>
                        </div>
                        <div class="text-center p-4 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="text-2xl mb-2">💊</div>
                            <div class="font-semibold" style="color: var(--petcare-menu-text);">1</div>
                            <div class="text-sm" style="color: var(--petcare-menu-text);">Medicamento hoy</div>
                        </div>
                    </div>
                </div>

                <!-- Recordatorios -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Recordatorios de Hoy
                    </h3>
                    <div class="space-y-3">
                        ${reminders.map(reminder => `
                            <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                                <div class="w-3 h-3 rounded-full ${reminder.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}"></div>
                                <div class="flex-1">
                                    <h4 class="font-medium" style="color: var(--petcare-menu-text);">${reminder.title}</h4>
                                    <p class="text-sm text-gray-600">${reminder.time}</p>
                                </div>
                                <button class="btn-primary text-sm">
                                    Marcar
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Próximas Citas -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Próximas Citas
                    </h3>
                    <div class="space-y-3">
                        ${upcomingEvents.map(event => `
                            <div class="flex items-center gap-3 p-3 rounded-lg" style="background-color: var(--petcare-header);">
                                <div class="text-2xl">📅</div>
                                <div class="flex-1">
                                    <h4 class="font-medium" style="color: var(--petcare-menu-text);">${event.title}</h4>
                                    <p class="text-sm" style="color: var(--petcare-menu-text);">${event.date} - ${event.time}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Mis Mascotas -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold" style="color: var(--petcare-menu-text);">
                            Mis Mascotas
                        </h3>
                        <button class="btn-primary">
                            + Agregar
                        </button>
                    </div>
                    <div class="space-y-4">
                        ${this.pets.map(pet => `
                            <div class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer" onclick="app.navigateTo('pets', ${pet.id})">
                                <img 
                                    src="${pet.image}" 
                                    alt="${pet.name}"
                                    class="w-16 h-16 rounded-full object-cover"
                                />
                                <div class="flex-1">
                                    <h4 class="font-semibold" style="color: var(--petcare-menu-text);">${pet.name}</h4>
                                    <p class="text-sm text-gray-600">${pet.type} • ${pet.age}</p>
                                    <p class="text-sm ${pet.status === 'Saludable' ? 'text-green-600' : 'text-yellow-600'}">
                                        ${pet.status}
                                    </p>
                                    <p class="text-xs text-gray-500">Última visita: ${pet.lastVisit}</p>
                                </div>
                                <button class="btn-secondary text-sm">
                                    Ver perfil
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderPetsPage(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Mis Mascotas 🐕🐱
                    </h2>
                    <p class="text-gray-600 mb-6">
                        Gestiona los perfiles completos de tus mascotas
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Botón agregar mascota -->
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition cursor-pointer">
                            <div class="text-4xl mb-4">➕</div>
                            <h3 class="font-semibold mb-2" style="color: var(--petcare-menu-text);">
                                Agregar Nueva Mascota
                            </h3>
                            <p class="text-sm text-gray-600 mb-4">
                                Crea un perfil completo para tu mascota
                            </p>
                            <button class="btn-primary">
                                Crear Perfil
                            </button>
                        </div>
                        
                        <!-- Mascotas existentes -->
                        ${this.pets.map(pet => `
                            <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition cursor-pointer" onclick="app.viewPetDetail(${pet.id})">
                                <div class="text-center mb-4">
                                    <img 
                                        src="${pet.image}" 
                                        alt="${pet.name}"
                                        class="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                                    />
                                    <h3 class="font-semibold text-lg" style="color: var(--petcare-menu-text);">${pet.name}</h3>
                                    <p class="text-sm text-gray-600">${pet.type}</p>
                                </div>
                                
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Edad:</span>
                                        <span style="color: var(--petcare-menu-text);">${pet.age}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Peso:</span>
                                        <span style="color: var(--petcare-menu-text);">${pet.weight}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Estado:</span>
                                        <span class="${pet.status === 'Saludable' ? 'text-green-600' : 'text-yellow-600'}">${pet.status}</span>
                                    </div>
                                </div>
                                
                                <div class="mt-4 pt-4 border-t border-gray-200">
                                    <button class="w-full btn-primary text-sm">
                                        Ver Perfil Completo
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderSearchPage(container) {
        const lostPets = [
            {
                id: 1,
                name: 'Max',
                type: 'Golden Retriever',
                location: 'Parque Central',
                date: '15 Enero 2025',
                image: 'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NTY2MzQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
                contact: '+34 600 123 456'
            },
            {
                id: 2,
                name: 'Bella',
                type: 'Labrador Chocolate',
                location: 'Plaza Mayor',
                date: '12 Enero 2025',
                image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face',
                contact: '+34 655 987 321'
            }
        ];

        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Mascotas Perdidas 🔍
                    </h2>
                    <p class="text-gray-600 mb-6">
                        Ayuda a reunir mascotas con sus familias
                    </p>
                    
                    <div class="flex gap-4 mb-6">
                        <button class="btn-primary flex-1">
                            📢 Reportar Pérdida
                        </button>
                        <button class="btn-secondary flex-1">
                            👁️ He Visto una Mascota
                        </button>
                    </div>
                    
                    <!-- Filtros -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <select class="p-2 border border-gray-300 rounded-lg bg-white">
                            <option>Todas las especies</option>
                            <option>Perros</option>
                            <option>Gatos</option>
                            <option>Otros</option>
                        </select>
                        <select class="p-2 border border-gray-300 rounded-lg bg-white">
                            <option>Todas las zonas</option>
                            <option>Centro</option>
                            <option>Norte</option>
                            <option>Sur</option>
                        </select>
                        <select class="p-2 border border-gray-300 rounded-lg bg-white">
                            <option>Últimos 7 días</option>
                            <option>Últimos 15 días</option>
                            <option>Último mes</option>
                        </select>
                        <button class="btn-secondary">
                            🔄 Limpiar Filtros
                        </button>
                    </div>
                </div>

                <!-- Lista de mascotas perdidas -->
                <div class="space-y-4">
                    ${lostPets.map(pet => `
                        <div class="bg-white rounded-lg shadow-sm p-4">
                            <div class="flex gap-4">
                                <img 
                                    src="${pet.image}" 
                                    alt="${pet.name}"
                                    class="w-24 h-24 rounded-lg object-cover"
                                />
                                <div class="flex-1">
                                    <div class="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 class="font-semibold text-lg" style="color: var(--petcare-menu-text);">${pet.name}</h3>
                                            <p class="text-sm text-gray-600">${pet.type}</p>
                                        </div>
                                        <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                            PERDIDO
                                        </span>
                                    </div>
                                    
                                    <div class="space-y-1 text-sm">
                                        <p class="flex items-center gap-2">
                                            <span>📍</span>
                                            <span class="text-gray-600">Último avistamiento:</span>
                                            <span style="color: var(--petcare-menu-text);">${pet.location}</span>
                                        </p>
                                        <p class="flex items-center gap-2">
                                            <span>📅</span>
                                            <span class="text-gray-600">Perdido desde:</span>
                                            <span style="color: var(--petcare-menu-text);">${pet.date}</span>
                                        </p>
                                        <p class="flex items-center gap-2">
                                            <span>📞</span>
                                            <span class="text-gray-600">Contacto:</span>
                                            <span style="color: var(--petcare-menu-text);">${pet.contact}</span>
                                        </p>
                                    </div>
                                    
                                    <div class="flex gap-2 mt-4">
                                        <button class="btn-primary text-sm">
                                            💬 Contactar
                                        </button>
                                        <button class="btn-secondary text-sm">
                                            🔗 Compartir
                                        </button>
                                        <button class="btn-secondary text-sm">
                                            👁️ Lo he visto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Estadísticas -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Estadísticas de la Comunidad
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="text-center p-4 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="font-bold text-2xl" style="color: var(--petcare-menu-text);">89%</div>
                            <div class="text-sm" style="color: var(--petcare-menu-text);">Reunificaciones</div>
                        </div>
                        <div class="text-center p-4 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="font-bold text-2xl" style="color: var(--petcare-menu-text);">247</div>
                            <div class="text-sm" style="color: var(--petcare-menu-text);">Mascotas encontradas</div>
                        </div>
                        <div class="text-center p-4 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="font-bold text-2xl" style="color: var(--petcare-menu-text);">12</div>
                            <div class="text-sm" style="color: var(--petcare-menu-text);">Perdidas activas</div>
                        </div>
                        <div class="text-center p-4 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="font-bold text-2xl" style="color: var(--petcare-menu-text);">1,342</div>
                            <div class="text-sm" style="color: var(--petcare-menu-text);">Voluntarios activos</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderStorePage(container) {
        const categories = [
            { name: 'Alimento', icon: '🍖', count: '127 productos' },
            { name: 'Juguetes', icon: '🎾', count: '89 productos' },
            { name: 'Medicina', icon: '💊', count: '45 productos' },
            { name: 'Accesorios', icon: '🦴', count: '203 productos' },
            { name: 'Higiene', icon: '🧼', count: '67 productos' },
            { name: 'Camas', icon: '🛏️', count: '34 productos' }
        ];

        const featuredProducts = [
            {
                name: 'Royal Canin Adult',
                price: '€45.99',
                image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop',
                rating: 4.8
            },
            {
                name: 'Juguete Interactivo',
                price: '€19.99',
                image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
                rating: 4.6
            }
        ];

        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Tienda PetCare 🛒
                    </h2>
                    <p class="text-gray-600 mb-6">
                        Todo lo que necesitas para tu mascota, entregado a domicilio
                    </p>
                    
                    <!-- Barra de búsqueda de productos -->
                    <div class="relative mb-6">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            class="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                        <svg class="absolute left-4 top-1/2 transform -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                    </div>
                    
                    <!-- Carrito -->
                    <div class="flex items-center justify-between mb-6 p-4 rounded-lg" style="background-color: var(--petcare-header);">
                        <div class="flex items-center gap-3">
                            <span class="text-2xl">🛒</span>
                            <div>
                                <h3 class="font-semibold" style="color: var(--petcare-menu-text);">Mi Carrito</h3>
                                <p class="text-sm" style="color: var(--petcare-menu-text);">3 productos • €84.97</p>
                            </div>
                        </div>
                        <button class="btn-primary">
                            Ver Carrito
                        </button>
                    </div>
                </div>

                <!-- Categorías -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Categorías
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        ${categories.map(category => `
                            <div class="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer">
                                <div class="text-3xl mb-2">${category.icon}</div>
                                <h4 class="font-medium mb-1" style="color: var(--petcare-menu-text);">${category.name}</h4>
                                <p class="text-sm text-gray-600">${category.count}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Productos destacados -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Productos Destacados
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${featuredProducts.map(product => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <img 
                                    src="${product.image}" 
                                    alt="${product.name}"
                                    class="w-full h-48 object-cover rounded-lg mb-3"
                                />
                                <h4 class="font-semibold mb-2" style="color: var(--petcare-menu-text);">${product.name}</h4>
                                <div class="flex items-center gap-2 mb-2">
                                    <div class="flex text-yellow-400">★★★★★</div>
                                    <span class="text-sm text-gray-600">(${product.rating})</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="font-bold text-lg" style="color: var(--petcare-accent);">${product.price}</span>
                                    <button class="btn-primary text-sm">
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Ofertas especiales -->
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-sm p-6 text-white">
                    <h3 class="text-lg font-semibold mb-2">🎉 Ofertas Especiales</h3>
                    <p class="mb-4">Descuentos exclusivos para miembros de PetCare</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white bg-opacity-20 rounded-lg p-4">
                            <h4 class="font-semibold">20% OFF</h4>
                            <p class="text-sm">En tu primera compra</p>
                        </div>
                        <div class="bg-white bg-opacity-20 rounded-lg p-4">
                            <h4 class="font-semibold">Envío GRATIS</h4>
                            <p class="text-sm">En pedidos +€50</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCommunityPage(container) {
        const posts = [
            {
                id: 1,
                author: 'María García',
                time: 'Hace 2 horas',
                content: '¡Luna acaba de pasar su primer examen veterinario con excelentes resultados! 🎉 Gracias al Dr. Martínez por el cuidado excepcional.',
                likes: 24,
                comments: 5,
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
                image: 'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NTY2MzQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=600'
            },
            {
                id: 2,
                author: 'Carlos Ruiz',
                time: 'Hace 4 horas',
                content: '¿Alguien sabe de un buen veterinario especialista en gatos en la zona de Salamanca? Mi gatito necesita una revisión especializada.',
                likes: 12,
                comments: 8,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            },
            {
                id: 3,
                author: 'Ana López',
                time: 'Hace 6 horas',
                content: 'Evento de adopción este sábado en el Parque del Retiro. ¡Ven a conocer a nuestros peludos en busca de hogar! 🏠❤️',
                likes: 45,
                comments: 12,
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
            }
        ];

        container.innerHTML = `
            <div class="space-y-6">
                <!-- Header -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold mb-2" style="color: var(--petcare-menu-text);">
                        Comunidad PetCare 👥
                    </h2>
                    <p class="text-gray-600 mb-4">
                        Conecta con otros amantes de las mascotas
                    </p>
                    
                    <!-- Estadísticas -->
                    <div class="grid grid-cols-4 gap-4 mb-4">
                        <div class="text-center p-3 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="font-bold" style="color: var(--petcare-menu-text);">1,247</div>
                            <div class="text-xs" style="color: var(--petcare-menu-text);">Miembros</div>
                        </div>
                        <div class="text-center p-3 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="font-bold" style="color: var(--petcare-menu-text);">856</div>
                            <div class="text-xs" style="color: var(--petcare-menu-text);">Mascotas</div>
                        </div>
                        <div class="text-center p-3 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="font-bold" style="color: var(--petcare-menu-text);">23</div>
                            <div class="text-xs" style="color: var(--petcare-menu-text);">Posts hoy</div>
                        </div>
                        <div class="text-center p-3 rounded-lg" style="background-color: var(--petcare-header);">
                            <div class="font-bold" style="color: var(--petcare-menu-text);">7</div>
                            <div class="text-xs" style="color: var(--petcare-menu-text);">Ayudas</div>
                        </div>
                    </div>

                    <!-- Botón nuevo post -->
                    <button class="w-full flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        <span class="text-2xl">📷</span>
                        <span class="text-gray-600">¿Qué quieres compartir con la comunidad?</span>
                    </button>
                </div>

                <!-- Posts -->
                ${posts.map(post => `
                    <div class="bg-white rounded-lg shadow-sm p-4">
                        <div class="flex items-center gap-3 mb-3">
                            <img 
                                src="${post.avatar}"
                                alt="${post.author}"
                                class="w-10 h-10 rounded-full object-cover"
                            />
                            <div class="flex-1">
                                <h4 class="font-semibold" style="color: var(--petcare-menu-text);">${post.author}</h4>
                                <p class="text-sm text-gray-500">${post.time}</p>
                            </div>
                        </div>
                        
                        <p class="text-gray-700 mb-4">${post.content}</p>
                        
                        ${post.image ? `
                            <img src="${post.image}" alt="Post image" class="w-full h-64 object-cover rounded-lg mb-4">
                        ` : ''}
                        
                        <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                            <button class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                                <span>❤️</span>
                                <span class="text-sm text-gray-600">${post.likes}</span>
                            </button>
                            <button class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                                <span>💬</span>
                                <span class="text-sm text-gray-600">${post.comments}</span>
                            </button>
                            <button class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                                <span>🔄</span>
                                <span class="text-sm text-gray-600">Compartir</span>
                            </button>
                        </div>
                    </div>
                `).join('')}

                <!-- Eventos próximos -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Próximos Eventos
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 p-3 rounded-lg" style="background-color: var(--petcare-header);">
                            <span class="text-2xl">📅</span>
                            <div class="flex-1">
                                <h4 class="font-semibold" style="color: var(--petcare-menu-text);">Feria de Adopción</h4>
                                <p class="text-sm" style="color: var(--petcare-menu-text);">Sábado 25 Enero - Parque del Retiro</p>
                            </div>
                            <button class="btn-primary text-sm">
                                Asistir
                            </button>
                        </div>
                        <div class="flex items-center gap-3 p-3 rounded-lg" style="background-color: var(--petcare-header);">
                            <span class="text-2xl">🎓</span>
                            <div class="flex-1">
                                <h4 class="font-semibold" style="color: var(--petcare-menu-text);">Taller de Entrenamiento</h4>
                                <p class="text-sm" style="color: var(--petcare-menu-text);">Domingo 2 Febrero - Centro Canino Madrid</p>
                            </div>
                            <button class="btn-primary text-sm">
                                Apuntarse
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderVetPage(container) {
        const appointments = [
            { pet: 'Luna', service: 'Vacuna', date: '15 Ene', time: '10:00 AM', vet: 'Dr. Martínez' },
            { pet: 'Whiskers', service: 'Control', date: '20 Ene', time: '2:00 PM', vet: 'Dra. López' }
        ];

        const vets = [
            {
                name: 'Dr. Carlos Martínez',
                specialty: 'Medicina General',
                rating: 4.9,
                experience: '15 años',
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
            },
            {
                name: 'Dra. Ana López',
                specialty: 'Cirugía',
                rating: 4.8,
                experience: '12 años',
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
            }
        ];

        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Servicios Veterinarios 🏥
                    </h2>
                    <p class="text-gray-600 mb-6">
                        El mejor cuidado médico para tu mascota
                    </p>
                    
                    <!-- Acciones rápidas -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <button class="btn-primary flex flex-col items-center p-4">
                            <span class="text-2xl mb-2">📅</span>
                            <span class="text-sm">Nueva Cita</span>
                        </button>
                        <button class="btn-secondary flex flex-col items-center p-4">
                            <span class="text-2xl mb-2">🚨</span>
                            <span class="text-sm">Emergencia</span>
                        </button>
                        <button class="btn-secondary flex flex-col items-center p-4">
                            <span class="text-2xl mb-2">📋</span>
                            <span class="text-sm">Historial</span>
                        </button>
                        <button class="btn-secondary flex flex-col items-center p-4">
                            <span class="text-2xl mb-2">💊</span>
                            <span class="text-sm">Recetas</span>
                        </button>
                    </div>
                </div>

                <!-- Próximas citas -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Próximas Citas
                    </h3>
                    <div class="space-y-3">
                        ${appointments.map(appointment => `
                            <div class="flex justify-between items-center p-4 rounded-lg" style="background-color: var(--petcare-header);">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-lg" style="background-color: var(--petcare-accent);">
                                        🐕
                                    </div>
                                    <div>
                                        <h4 class="font-semibold" style="color: var(--petcare-menu-text);">${appointment.service} - ${appointment.pet}</h4>
                                        <p class="text-sm" style="color: var(--petcare-menu-text);">${appointment.vet} • ${appointment.date} ${appointment.time}</p>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <button class="btn-primary text-sm">
                                        Modificar
                                    </button>
                                    <button class="btn-secondary text-sm">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Veterinarios recomendados -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Veterinarios Recomendados
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${vets.map(vet => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div class="flex items-center gap-4 mb-3">
                                    <img 
                                        src="${vet.image}" 
                                        alt="${vet.name}"
                                        class="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div class="flex-1">
                                        <h4 class="font-semibold" style="color: var(--petcare-menu-text);">${vet.name}</h4>
                                        <p class="text-sm text-gray-600">${vet.specialty}</p>
                                        <div class="flex items-center gap-2 mt-1">
                                            <div class="flex text-yellow-400 text-sm">★★★★★</div>
                                            <span class="text-sm text-gray-600">(${vet.rating})</span>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-600 mb-3">
                                    ${vet.experience} de experiencia
                                </p>
                                <div class="flex gap-2">
                                    <button class="btn-primary text-sm flex-1">
                                        Agendar Cita
                                    </button>
                                    <button class="btn-secondary text-sm">
                                        Ver Perfil
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Recordatorios médicos -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Recordatorios Médicos
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 p-3 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
                            <span class="text-2xl">💊</span>
                            <div class="flex-1">
                                <h4 class="font-semibold" style="color: var(--petcare-menu-text);">Medicación Luna</h4>
                                <p class="text-sm text-gray-600">Antibiótico cada 8 horas - Próxima dosis: 8:00 PM</p>
                            </div>
                            <button class="btn-primary text-sm">
                                ✓ Hecho
                            </button>
                        </div>
                        <div class="flex items-center gap-3 p-3 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                            <span class="text-2xl">🏥</span>
                            <div class="flex-1">
                                <h4 class="font-semibold" style="color: var(--petcare-menu-text);">Revisión Anual Whiskers</h4>
                                <p class="text-sm text-gray-600">Programar cita para checkup completo</p>
                            </div>
                            <button class="btn-primary text-sm">
                                Agendar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Consejos de salud -->
                <div class="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-sm p-6 text-white">
                    <h3 class="text-lg font-semibold mb-2">💡 Consejo de Salud del Día</h3>
                    <p class="mb-4">
                        La hidratación es clave para la salud de tu mascota. Asegúrate de que siempre tenga agua fresca disponible, especialmente en días calurosos.
                    </p>
                    <button class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                        Ver Más Consejos
                    </button>
                </div>
            </div>
        `;
    }

    handleSearch() {
        console.log('Buscando:', this.searchTerm);
        // Implementar lógica de búsqueda
    }

    viewPetDetail(petId) {
        console.log('Ver detalle de mascota:', petId);
        // Implementar vista de detalle de mascota
    }

    // Métodos del Veterinario
    renderVetDashboard(container) {
        const todayAppointments = this.vetAppointments.filter(apt => apt.date === '2025-01-15');
        const todayPatientsCount = todayAppointments.length;
        const totalPatients = this.vetPatients.length;

        container.innerHTML = `
            <div class="space-y-6">
                <!-- Header del Dashboard ---->
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-sm p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold mb-2">¡Bienvenido, ${this.currentUser.name}! 👨‍⚕️</h2>
                            <p class="opacity-90">Panel de Control Veterinario</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm opacity-90">Hoy es</p>
                            <p class="font-semibold">${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                </div>

                <!-- Estadísticas Rápidas -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-white rounded-lg shadow-sm p-4 text-center">
                        <div class="text-3xl mb-2">📅</div>
                        <div class="text-2xl font-bold text-blue-600">${todayPatientsCount}</div>
                        <div class="text-sm text-gray-600">Citas hoy</div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm p-4 text-center">
                        <div class="text-3xl mb-2">🐕</div>
                        <div class="text-2xl font-bold text-green-600">${totalPatients}</div>
                        <div class="text-sm text-gray-600">Pacientes totales</div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm p-4 text-center">
                        <div class="text-3xl mb-2">📋</div>
                        <div class="text-2xl font-bold text-orange-600">24</div>
                        <div class="text-sm text-gray-600">Historiales</div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm p-4 text-center">
                        <div class="text-3xl mb-2">🏥</div>
                        <div class="text-2xl font-bold text-purple-600">12</div>
                        <div class="text-sm text-gray-600">Urgencias mes</div>
                    </div>
                </div>

                <!-- Acciones Rápidas -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Acciones Rápidas
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button onclick="app.navigateTo('vet-patients')" class="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition">
                            <span class="text-2xl mb-2">🐕</span>
                            <span class="font-medium">Ver Pacientes</span>
                        </button>
                        <button onclick="app.navigateTo('vet-appointments')" class="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50 transition">
                            <span class="text-2xl mb-2">📅</span>
                            <span class="font-medium">Agenda</span>
                        </button>
                        <button onclick="app.navigateTo('vet-add-visit')" class="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition">
                            <span class="text-2xl mb-2">➕</span>
                            <span class="font-medium">Nueva Visita</span>
                        </button>
                        <button onclick="app.navigateTo('vet-history')" class="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition">
                            <span class="text-2xl mb-2">📋</span>
                            <span class="font-medium">Historiales</span>
                        </button>
                    </div>
                </div>

                <!-- Próximas Citas de Hoy -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold" style="color: var(--petcare-menu-text);">
                            Citas de Hoy (${todayAppointments.length})
                        </h3>
                        <button onclick="app.navigateTo('vet-appointments')" class="btn-primary text-sm">
                            Ver Todas
                        </button>
                    </div>
                    ${todayAppointments.length > 0 ? `
                        <div class="space-y-3">
                            ${todayAppointments.map(appointment => `
                                <div class="flex items-center justify-between p-4 rounded-lg" style="background-color: var(--petcare-header);">
                                    <div class="flex items-center gap-4">
                                        <div class="text-2xl">⏰</div>
                                        <div>
                                            <h4 class="font-semibold" style="color: var(--petcare-menu-text);">${appointment.time} - ${appointment.petName}</h4>
                                            <p class="text-sm" style="color: var(--petcare-menu-text);">${appointment.type} • ${appointment.ownerName}</p>
                                            <p class="text-xs text-gray-600">${appointment.notes}</p>
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="app.viewVetPatientDetail(${appointment.petId})" class="btn-primary text-sm">
                                            Ver Paciente
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-8 text-gray-500">
                            <div class="text-4xl mb-4">📅</div>
                            <p>No hay citas programadas para hoy</p>
                        </div>
                    `}
                </div>

                <!-- Últimas Actualizaciones -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">
                        Últimas Actualizaciones
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                            <span class="text-xl">✅</span>
                            <div>
                                <p class="font-medium text-green-800">Historial actualizado - Whiskers</p>
                                <p class="text-sm text-green-600">Tratamiento dermatológico registrado</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                            <span class="text-xl">📄</span>
                            <div>
                                <p class="font-medium text-blue-800">Documento subido - Luna</p>
                                <p class="text-sm text-blue-600">Radiografía de control agregada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderVetPatients(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-semibold" style="color: var(--petcare-menu-text);">
                            Mis Pacientes 🐕
                        </h2>
                        <div class="flex gap-2">
                            <select class="px-3 py-2 border border-gray-300 rounded-lg">
                                <option>Todos los tipos</option>
                                <option>Perros</option>
                                <option>Gatos</option>
                                <option>Otros</option>
                            </select>
                            <input 
                                type="text" 
                                placeholder="Buscar paciente..."
                                class="px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${this.vetPatients.map(patient => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer" onclick="app.viewVetPatientDetail(${patient.id})">
                                <div class="flex items-center gap-4 mb-4">
                                    <img 
                                        src="${patient.image}" 
                                        alt="${patient.name}"
                                        class="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div class="flex-1">
                                        <h3 class="font-semibold text-lg" style="color: var(--petcare-menu-text);">${patient.name}</h3>
                                        <p class="text-sm text-gray-600">${patient.type} • ${patient.age}</p>
                                        <p class="text-sm text-gray-500">Propietario: ${patient.owner}</p>
                                    </div>
                                </div>
                                
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Peso:</span>
                                        <span style="color: var(--petcare-menu-text);">${patient.weight}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Última visita:</span>
                                        <span style="color: var(--petcare-menu-text);">${patient.lastVisit}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Próxima cita:</span>
                                        <span style="color: var(--petcare-menu-text);">${patient.nextAppointment}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Contacto:</span>
                                        <span style="color: var(--petcare-menu-text);">${patient.ownerPhone}</span>
                                    </div>
                                </div>
                                
                                <div class="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                                    <button class="flex-1 btn-primary text-sm">
                                        Ver Historial
                                    </button>
                                    <button onclick="event.stopPropagation(); app.navigateTo('vet-add-visit', ${patient.id})" class="flex-1 btn-secondary text-sm">
                                        Nueva Visita
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderVetAppointments(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-semibold" style="color: var(--petcare-menu-text);">
                            Agenda de Citas 📅
                        </h2>
                        <div class="flex gap-2">
                            <button class="btn-primary">
                                + Nueva Cita
                            </button>
                            <select class="px-3 py-2 border border-gray-300 rounded-lg">
                                <option>Esta semana</option>
                                <option>Este mes</option>
                                <option>Próximos 30 días</option>
                            </select>
                        </div>
                    </div>

                    <!-- Calendario simplificado -->
                    <div class="mb-6 bg-gray-50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold">Enero 2025</h3>
                            <div class="flex gap-2">
                                <button class="p-2 hover:bg-gray-200 rounded">←</button>
                                <button class="p-2 hover:bg-gray-200 rounded">→</button>
                            </div>
                        </div>
                        <div class="grid grid-cols-7 gap-2 text-center text-sm">
                            <div class="font-medium text-gray-600 py-2">L</div>
                            <div class="font-medium text-gray-600 py-2">M</div>
                            <div class="font-medium text-gray-600 py-2">X</div>
                            <div class="font-medium text-gray-600 py-2">J</div>
                            <div class="font-medium text-gray-600 py-2">V</div>
                            <div class="font-medium text-gray-600 py-2">S</div>
                            <div class="font-medium text-gray-600 py-2">D</div>
                            ${Array.from({length: 31}, (_, i) => {
                                const day = i + 1;
                                const hasAppointment = this.vetAppointments.some(apt => apt.date === `2025-01-${day.toString().padStart(2, '0')}`);
                                const isToday = day === 15;
                                return `
                                    <div class="py-2 rounded ${isToday ? 'bg-blue-500 text-white' : ''} ${hasAppointment ? 'bg-orange-100 border border-orange-300' : 'hover:bg-gray-200'} cursor-pointer">
                                        ${day}
                                        ${hasAppointment ? '<div class="w-2 h-2 bg-orange-500 rounded-full mx-auto mt-1"></div>' : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Lista de citas -->
                    <div class="space-y-4">
                        <h3 class="font-semibold text-lg" style="color: var(--petcare-menu-text);">Próximas Citas</h3>
                        ${this.vetAppointments.map(appointment => {
                            const statusColors = {
                                'Confirmada': 'bg-green-100 text-green-800 border-green-200',
                                'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                                'Cancelada': 'bg-red-100 text-red-800 border-red-200'
                            };
                            
                            return `
                                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-4">
                                            <div class="text-center">
                                                <div class="font-bold text-lg" style="color: var(--petcare-menu-text);">${appointment.date.split('-')[2]}</div>
                                                <div class="text-sm text-gray-600">ENE</div>
                                            </div>
                                            <div class="flex-1">
                                                <div class="flex items-center gap-3 mb-2">
                                                    <h4 class="font-semibold" style="color: var(--petcare-menu-text);">${appointment.time} - ${appointment.petName}</h4>
                                                    <span class="px-2 py-1 rounded-full text-xs font-medium border ${statusColors[appointment.status]}">
                                                        ${appointment.status}
                                                    </span>
                                                </div>
                                                <p class="text-sm text-gray-600 mb-1">${appointment.type} • Propietario: ${appointment.ownerName}</p>
                                                <p class="text-sm text-gray-500">${appointment.notes}</p>
                                            </div>
                                        </div>
                                        <div class="flex gap-2">
                                            <button onclick="app.viewVetPatientDetail(${appointment.petId})" class="btn-secondary text-sm">
                                                Ver Paciente
                                            </button>
                                            <button class="btn-primary text-sm">
                                                Editar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderVetHistory(container) {
        const allMedicalRecords = this.vetPatients.flatMap(patient => 
            patient.medicalHistory.map(record => ({
                ...record,
                patientName: patient.name,
                patientType: patient.type,
                owner: patient.owner,
                patientId: patient.id
            }))
        ).sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-semibold" style="color: var(--petcare-menu-text);">
                            Historial Médico Completo 📋
                        </h2>
                        <div class="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Buscar en historial..."
                                class="px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            <select class="px-3 py-2 border border-gray-300 rounded-lg">
                                <option>Todos los tipos</option>
                                <option>Consulta general</option>
                                <option>Vacunación</option>
                                <option>Cirugía</option>
                                <option>Urgencia</option>
                            </select>
                            <input 
                                type="date" 
                                class="px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div class="space-y-4">
                        ${allMedicalRecords.map(record => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div class="flex items-start gap-4">
                                    <div class="text-center min-w-[80px]">
                                        <div class="font-bold" style="color: var(--petcare-menu-text);">${record.date.split(' ')[0]}</div>
                                        <div class="text-sm text-gray-600">${record.date.split(' ')[1]} ${record.date.split(' ')[2]}</div>
                                    </div>
                                    
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <h4 class="font-semibold text-lg" style="color: var(--petcare-menu-text);">${record.patientName}</h4>
                                            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                ${record.type}
                                            </span>
                                        </div>
                                        
                                        <p class="text-sm text-gray-600 mb-3">${record.patientType} • Propietario: ${record.owner}</p>
                                        
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <h5 class="font-medium text-sm text-gray-700 mb-1">Diagnóstico:</h5>
                                                <p class="text-sm" style="color: var(--petcare-menu-text);">${record.diagnosis}</p>
                                            </div>
                                            <div>
                                                <h5 class="font-medium text-sm text-gray-700 mb-1">Tratamiento:</h5>
                                                <p class="text-sm" style="color: var(--petcare-menu-text);">${record.treatment}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="grid grid-cols-3 gap-4 mb-3 text-sm">
                                            <div>
                                                <span class="text-gray-600">Peso:</span>
                                                <span class="font-medium ml-2">${record.weight}</span>
                                            </div>
                                            <div>
                                                <span class="text-gray-600">Temperatura:</span>
                                                <span class="font-medium ml-2">${record.temperature}</span>
                                            </div>
                                            <div>
                                                <span class="text-gray-600">Ritmo Cardíaco:</span>
                                                <span class="font-medium ml-2">${record.heartRate}</span>
                                            </div>
                                        </div>
                                        
                                        ${record.documents && record.documents.length > 0 ? `
                                            <div class="flex items-center gap-2 mt-3">
                                                <span class="text-sm text-gray-600">Documentos adjuntos:</span>
                                                ${record.documents.map(doc => `
                                                    <span class="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                                        📄 ${doc}
                                                    </span>
                                                `).join('')}
                                            </div>
                                        ` : ''}
                                    </div>
                                    
                                    <div class="flex flex-col gap-2">
                                        <button onclick="app.viewVetPatientDetail(${record.patientId})" class="btn-secondary text-sm">
                                            Ver Paciente
                                        </button>
                                        <button class="btn-primary text-sm">
                                            Editar Registro
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${allMedicalRecords.length === 0 ? `
                        <div class="text-center py-12 text-gray-500">
                            <div class="text-4xl mb-4">📋</div>
                            <p>No hay registros médicos disponibles</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderVetProfile(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold mb-6" style="color: var(--petcare-menu-text);">
                        Mi Perfil Profesional 👨‍⚕️
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Información Personal -->
                        <div class="md:col-span-2 space-y-6">
                            <div>
                                <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">Información Personal</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                                        <input type="text" value="${this.currentUser.name}" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Número de Colegiado</label>
                                        <input type="text" value="${this.currentUser.license || 'VET001'}" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                                        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                            <option selected>Medicina General</option>
                                            <option>Cirugía</option>
                                            <option>Dermatología</option>
                                            <option>Cardiología</option>
                                            <option>Oncología</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                        <input type="tel" value="+34 666 123 456" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    </div>
                                    <div class="col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input type="email" value="${this.currentUser.email}" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">Información Profesional</h3>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Años de Experiencia</label>
                                        <input type="number" value="8" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Clínica/Hospital</label>
                                        <input type="text" value="Clínica Veterinaria San Marcos" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                                        <textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="2">Calle Mayor 123, 28001 Madrid</textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Biografía Profesional</label>
                                        <textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="4">Veterinario especializado en medicina general con 8 años de experiencia. Apasionado por el bienestar animal y comprometido con brindar la mejor atención médica a nuestros compañeros de cuatro patas.</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Panel lateral -->
                        <div class="space-y-6">
                            <!-- Foto de perfil -->
                            <div class="text-center">
                                <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                                    👨‍⚕️
                                </div>
                                <button class="btn-secondary text-sm">
                                    Cambiar Foto
                                </button>
                            </div>
                            
                            <!-- Estadísticas -->
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h4 class="font-semibold mb-3" style="color: var(--petcare-menu-text);">Estadísticas</h4>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-sm text-gray-600">Pacientes atendidos:</span>
                                        <span class="font-medium">${this.vetPatients.length}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-sm text-gray-600">Consultas este mes:</span>
                                        <span class="font-medium">47</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-sm text-gray-600">Calificación promedio:</span>
                                        <span class="font-medium">4.8 ⭐</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Configuración -->
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h4 class="font-semibold mb-3" style="color: var(--petcare-menu-text);">Configuración</h4>
                                <div class="space-y-3">
                                    <button class="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">
                                        🔔 Notificaciones
                                    </button>
                                    <button class="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">
                                        🔒 Privacidad
                                    </button>
                                    <button class="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">
                                        📅 Horarios de trabajo
                                    </button>
                                    <button onclick="app.logout()" class="w-full text-left py-2 px-3 hover:bg-red-100 rounded text-sm text-red-600">
                                        🚪 Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pt-6 border-t border-gray-200 flex gap-4">
                        <button class="btn-primary">
                            Guardar Cambios
                        </button>
                        <button class="btn-secondary">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    viewVetPatientDetail(patientId) {
        this.selectedPetId = patientId;
        this.navigateTo('vet-patient-detail', patientId);
    }

    renderVetPatientDetail(container) {
        const patient = this.vetPatients.find(p => p.id === this.selectedPetId);
        if (!patient) {
            container.innerHTML = '<div class="text-center py-8">Paciente no encontrado</div>';
            return;
        }

        container.innerHTML = `
            <div class="space-y-6">
                <!-- Header del paciente -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center gap-6">
                        <img 
                            src="${patient.image}" 
                            alt="${patient.name}"
                            class="w-24 h-24 rounded-full object-cover"
                        />
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold mb-2" style="color: var(--petcare-menu-text);">${patient.name}</h2>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-600">Tipo:</span>
                                    <div class="font-medium">${patient.type}</div>
                                </div>
                                <div>
                                    <span class="text-gray-600">Edad:</span>
                                    <div class="font-medium">${patient.age}</div>
                                </div>
                                <div>
                                    <span class="text-gray-600">Peso:</span>
                                    <div class="font-medium">${patient.weight}</div>
                                </div>
                                <div>
                                    <span class="text-gray-600">Propietario:</span>
                                    <div class="font-medium">${patient.owner}</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <button onclick="app.navigateTo('vet-add-visit', ${patient.id})" class="btn-primary">
                                Nueva Visita
                            </button>
                            <button onclick="app.navigateTo('vet-patients')" class="btn-secondary">
                                Volver
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Información de contacto -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">Información de Contacto</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-center gap-3">
                            <span class="text-xl">📞</span>
                            <div>
                                <div class="font-medium">${patient.ownerPhone}</div>
                                <div class="text-sm text-gray-600">Teléfono principal</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-xl">📧</span>
                            <div>
                                <div class="font-medium">${patient.owner.toLowerCase().replace(' ', '.')}@email.com</div>
                                <div class="text-sm text-gray-600">Email</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Historial médico -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold" style="color: var(--petcare-menu-text);">Historial Médico</h3>
                        <button onclick="app.navigateTo('vet-add-visit', ${patient.id})" class="btn-primary text-sm">
                            + Agregar Visita
                        </button>
                    </div>
                    
                    <div class="space-y-4">
                        ${patient.medicalHistory.map(record => `
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 class="font-semibold" style="color: var(--petcare-menu-text);">${record.type}</h4>
                                        <p class="text-sm text-gray-600">${record.date}</p>
                                    </div>
                                    <button class="btn-secondary text-sm">Editar</button>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <h5 class="font-medium text-sm text-gray-700 mb-1">Diagnóstico:</h5>
                                        <p class="text-sm">${record.diagnosis}</p>
                                    </div>
                                    <div>
                                        <h5 class="font-medium text-sm text-gray-700 mb-1">Tratamiento:</h5>
                                        <p class="text-sm">${record.treatment}</p>
                                    </div>
                                </div>
                                
                                <div class="grid grid-cols-3 gap-4 mb-3 text-sm bg-gray-50 p-3 rounded">
                                    <div>
                                        <span class="text-gray-600">Peso:</span>
                                        <span class="font-medium ml-2">${record.weight}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">Temperatura:</span>
                                        <span class="font-medium ml-2">${record.temperature}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">Ritmo Cardíaco:</span>
                                        <span class="font-medium ml-2">${record.heartRate}</span>
                                    </div>
                                </div>
                                
                                ${record.documents && record.documents.length > 0 ? `
                                    <div class="border-t border-gray-200 pt-3">
                                        <h5 class="font-medium text-sm text-gray-700 mb-2">Documentos adjuntos:</h5>
                                        <div class="flex flex-wrap gap-2">
                                            ${record.documents.map(doc => `
                                                <span class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs cursor-pointer hover:bg-blue-200">
                                                    📄 ${doc}
                                                </span>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderVetAddVisit(container) {
        const patient = this.selectedPetId ? this.vetPatients.find(p => p.id === this.selectedPetId) : null;
        
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-semibold" style="color: var(--petcare-menu-text);">
                            Registrar Nueva Visita 📝
                        </h2>
                        <button onclick="app.navigateTo('vet-patients')" class="btn-secondary">
                            Cancelar
                        </button>
                    </div>

                    <form id="new-visit-form" class="space-y-6">
                        <!-- Selección de paciente -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                            <select id="patient-select" class="w-full px-3 py-2 border border-gray-300 rounded-lg" ${patient ? 'disabled' : ''}>
                                ${patient ? `
                                    <option value="${patient.id}" selected>${patient.name} - ${patient.type} (${patient.owner})</option>
                                ` : `
                                    <option value="">Seleccionar paciente...</option>
                                    ${this.vetPatients.map(p => `
                                        <option value="${p.id}">${p.name} - ${p.type} (${p.owner})</option>
                                    `).join('')}
                                `}
                            </select>
                        </div>

                        <!-- Información básica -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de la visita</label>
                                <input 
                                    type="date" 
                                    id="visit-date"
                                    value="${new Date().toISOString().split('T')[0]}"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de consulta</label>
                                <select id="visit-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                                    <option value="">Seleccionar tipo...</option>
                                    <option value="Consulta general">Consulta general</option>
                                    <option value="Vacunación">Vacunación</option>
                                    <option value="Cirugía">Cirugía</option>
                                    <option value="Consulta dermatológica">Consulta dermatológica</option>
                                    <option value="Consulta cardiológica">Consulta cardiológica</option>
                                    <option value="Urgencia">Urgencia</option>
                                    <option value="Control postoperatorio">Control postoperatorio</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        <!-- Medidas vitales -->
                        <div>
                            <h3 class="text-lg font-semibold mb-4" style="color: var(--petcare-menu-text);">Medidas Vitales</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        id="weight"
                                        placeholder="25.0"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Temperatura (°C)</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        id="temperature"
                                        placeholder="38.5"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Ritmo Cardíaco (bpm)</label>
                                    <input 
                                        type="number"
                                        id="heart-rate"
                                        placeholder="110"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Diagnóstico y tratamiento -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Diagnóstico</label>
                                <textarea 
                                    id="diagnosis"
                                    rows="4"
                                    placeholder="Descripción detallada del diagnóstico..."
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tratamiento</label>
                                <textarea 
                                    id="treatment"
                                    rows="4"
                                    placeholder="Descripción del tratamiento y medicación..."
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <!-- Notas adicionales -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</label>
                            <textarea 
                                id="notes"
                                rows="3"
                                placeholder="Observaciones adicionales, recomendaciones para el propietario, etc."
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            ></textarea>
                        </div>

                        <!-- Documentos -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Documentos Médicos</label>
                            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <div class="text-4xl mb-4">📄</div>
                                <p class="text-gray-600 mb-4">Arrastra archivos aquí o haz clic para seleccionar</p>
                                <input 
                                    type="file" 
                                    id="documents"
                                    multiple 
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    class="hidden"
                                />
                                <button type="button" onclick="document.getElementById('documents').click()" class="btn-secondary">
                                    Seleccionar Archivos
                                </button>
                                <p class="text-xs text-gray-500 mt-2">Formatos: PDF, JPG, PNG (máx. 10MB por archivo)</p>
                            </div>
                            <div id="selected-files" class="mt-3 space-y-2"></div>
                        </div>

                        <!-- Botones de acción -->
                        <div class="flex gap-4 pt-4 border-t border-gray-200">
                            <button type="submit" class="btn-primary">
                                Guardar Visita
                            </button>
                            <button type="button" onclick="app.navigateTo('vet-patients')" class="btn-secondary">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.setupNewVisitForm();
    }

    setupNewVisitForm() {
        const form = document.getElementById('new-visit-form');
        const documentsInput = document.getElementById('documents');
        const selectedFilesDiv = document.getElementById('selected-files');

        // Manejo de archivos
        documentsInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            selectedFilesDiv.innerHTML = '';
            
            files.forEach((file, index) => {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'flex items-center justify-between p-2 bg-gray-50 rounded';
                fileDiv.innerHTML = `
                    <span class="text-sm">📄 ${file.name}</span>
                    <button type="button" onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700">
                        ✕
                    </button>
                `;
                selectedFilesDiv.appendChild(fileDiv);
            });
        });

        // Manejo del formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                patientId: document.getElementById('patient-select').value,
                date: document.getElementById('visit-date').value,
                type: document.getElementById('visit-type').value,
                weight: document.getElementById('weight').value,
                temperature: document.getElementById('temperature').value,
                heartRate: document.getElementById('heart-rate').value,
                diagnosis: document.getElementById('diagnosis').value,
                treatment: document.getElementById('treatment').value,
                notes: document.getElementById('notes').value,
                documents: Array.from(documentsInput.files).map(f => f.name)
            };

            // Simulación de guardado
            this.saveNewVisit(formData);
        });
    }

    saveNewVisit(visitData) {
        const patient = this.vetPatients.find(p => p.id == visitData.patientId);
        if (!patient) {
            alert('Error: Paciente no encontrado');
            return;
        }

        const newRecord = {
            id: Date.now(),
            date: new Date(visitData.date).toLocaleDateString('es-ES'),
            type: visitData.type,
            diagnosis: visitData.diagnosis,
            treatment: visitData.treatment,
            weight: visitData.weight + 'kg',
            temperature: visitData.temperature + '°C',
            heartRate: visitData.heartRate + ' bpm',
            documents: visitData.documents || []
        };

        patient.medicalHistory.unshift(newRecord);
        patient.lastVisit = newRecord.date;
        patient.weight = newRecord.weight;

        alert('Visita registrada exitosamente');
        this.navigateTo('vet-patient-detail', patient.id);
    }
}

// Inicializar la aplicación
const app = new PetCareApp();