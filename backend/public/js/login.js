// login.js - Validación y envío del formulario de login

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  let valid = true;

  if (!username.value.trim()) {
    username.classList.add('is-invalid');
    valid = false;
  } else {
    username.classList.remove('is-invalid');
  }
  if (!password.value.trim()) {
    password.classList.add('is-invalid');
    valid = false;
  } else {
    password.classList.remove('is-invalid');
  }
  if (!valid) return;

  // Login con usuarios de localStorage o demo
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (
    (username.value === 'admin' && password.value === 'admin') ||
    usuarios.find(u => u.user === username.value && u.pass === password.value)
  ) {
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').textContent = 'Usuario o contraseña incorrectos. Usa admin/admin o regístrate.';
    document.getElementById('loginError').classList.remove('d-none');
  }
});
