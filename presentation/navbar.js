document.addEventListener('DOMContentLoaded', function() {
  const menuHamburguesa = document.querySelector('.menu-hamburguesa');
  const navLinks = document.querySelector('.nav-links');

  menuHamburguesa.addEventListener('click', () => {
    navLinks.classList.toggle('activo');
    menuHamburguesa.classList.toggle('activo');
  });

  // Opcional: Cerrar el menú al hacer clic en un enlace (útil en móviles)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('activo');
      menuHamburguesa.classList.remove('activo');
    });
  });
});