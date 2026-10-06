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

  // Enviar datos al backend
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username: username.value, password: password.value })
  });
  const data = await res.json();
  if (res.ok) {
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').textContent = data.message || 'Error de autenticación';
    document.getElementById('loginError').classList.remove('d-none');
  }
});
