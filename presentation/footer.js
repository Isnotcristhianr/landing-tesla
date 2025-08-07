// Footer JavaScript para página estilo Tesla
document.addEventListener('DOMContentLoaded', function() {
    
    // Función para inicializar los puntos de navegación
    function initNavigationDots() {
        const dots = document.querySelectorAll('.dot');
        
        // Agregar event listeners a cada punto
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Remover clase active de todos los puntos
                dots.forEach(d => d.classList.remove('active'));
                
                // Agregar clase active al punto clickeado
                this.classList.add('active');
                
                // Aquí puedes agregar lógica para navegar a la sección correspondiente
                navigateToSection(index);
            });
        });
        
        // Activar el primer punto por defecto
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
    }
    
    // Función para navegar a la sección correspondiente
    function navigateToSection(sectionIndex) {
        // Array de secciones (puedes ajustar según tu estructura)
        const sections = [
            'model-s',
            'model-3', 
            'model-x',
            'model-y',
            'cybertruck',
            'powerwall'
        ];
        
        if (sections[sectionIndex]) {
            // Scroll suave a la sección
            const targetSection = document.getElementById(sections[sectionIndex]);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
    
    // Función para actualizar el punto activo basado en el scroll
    function updateActiveDotOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const dots = document.querySelectorAll('.dot');
        
        if (sections.length === 0 || dots.length === 0) return;
        
        let currentSection = '';
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Actualizar el punto activo
        dots.forEach((dot, index) => {
            const sectionId = sections[index] ? sections[index].id : '';
            if (sectionId === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Función para crear dinámicamente los puntos de navegación
    function createNavigationDots() {
        const sections = document.querySelectorAll('section[id]');
        const navigationContainer = document.querySelector('.navigation-dots');
        
        if (!navigationContainer || sections.length === 0) return;
        
        // Limpiar puntos existentes
        navigationContainer.innerHTML = '';
        
        // Crear puntos para cada sección
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.setAttribute('data-section', section.id);
            dot.setAttribute('title', section.dataset.title || `Sección ${index + 1}`);
            
            navigationContainer.appendChild(dot);
        });
    }
    
    // Función para manejar el responsive del footer
    function handleFooterResponsive() {
        const footer = document.querySelector('.tesla-footer');
        const disclaimerContainer = document.querySelector('.disclaimer-container');
        
        if (!footer || !disclaimerContainer) return;
        
        // Ajustar padding en dispositivos móviles
        if (window.innerWidth <= 768) {
            footer.style.padding = '40px 20px 30px';
            disclaimerContainer.style.maxWidth = '100%';
        } else {
            footer.style.padding = '60px 40px 40px';
            disclaimerContainer.style.maxWidth = '800px';
        }
    }
    
    // Función para animar la aparición del footer
    function animateFooter() {
        const footer = document.querySelector('.tesla-footer');
        if (footer) {
            footer.style.opacity = '0';
            footer.style.transform = 'translateY(20px)';
            footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    // Función para manejar el scroll infinito (opcional)
    function handleInfiniteScroll() {
        let currentIndex = 0;
        const dots = document.querySelectorAll('.dot');
        
        setInterval(() => {
            if (dots.length > 0) {
                dots.forEach(d => d.classList.remove('active'));
                dots[currentIndex].classList.add('active');
                
                currentIndex = (currentIndex + 1) % dots.length;
            }
        }, 5000); // Cambiar cada 5 segundos
    }
    
    // Inicializar todas las funcionalidades
    function initFooter() {
        createNavigationDots();
        initNavigationDots();
        handleFooterResponsive();
        animateFooter();
        
        // Event listeners
        window.addEventListener('scroll', updateActiveDotOnScroll);
        window.addEventListener('resize', handleFooterResponsive);
        
        // Opcional: activar scroll infinito
        // handleInfiniteScroll();
    }
    
    // Inicializar cuando el DOM esté listo
    initFooter();
    
    // Exportar funciones para uso externo si es necesario
    window.TeslaFooter = {
        navigateToSection,
        updateActiveDotOnScroll,
        handleFooterResponsive,
        animateFooter
    };
});
