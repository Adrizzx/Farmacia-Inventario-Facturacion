// navbar.js - Navbar reutilizable para navegación
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-expand-lg navbar-dark bg-primary mb-3';
  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html">Farmacia</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav2">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav2">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="dashboard.html">Dashboard</a></li>
          <li class="nav-item"><a class="nav-link" href="medicamentos.html">Medicamentos</a></li>
          <li class="nav-item"><a class="nav-link" href="ventas.html">Ventas</a></li>
          <li class="nav-item"><a class="nav-link" href="reportes.html">Reportes</a></li>
          <li class="nav-item"><a class="nav-link" href="login.html">Salir</a></li>
        </ul>
      </div>
    </div>
  `;
  // Insertar navbar al principio del body si no existe ya uno
  if (!document.querySelector('.navbar')) {
    document.body.insertBefore(nav, document.body.firstChild);
  }
});
