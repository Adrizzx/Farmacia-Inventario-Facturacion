// register.js - Registro de usuarios en localStorage

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('regUser');
  const pass = document.getElementById('regPass');
  const pass2 = document.getElementById('regPass2');
  let valid = true;

  if (!user.value.trim()) {
    user.classList.add('is-invalid');
    valid = false;
  } else {
    user.classList.remove('is-invalid');
  }
  if (!pass.value.trim()) {
    pass.classList.add('is-invalid');
    valid = false;
  } else {
    pass.classList.remove('is-invalid');
  }
  if (pass.value !== pass2.value) {
    pass2.classList.add('is-invalid');
    valid = false;
  } else {
    pass2.classList.remove('is-invalid');
  }
  if (!valid) return;

  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (usuarios.find(u => u.user === user.value)) {
    document.getElementById('registerError').textContent = 'El usuario ya existe.';
    document.getElementById('registerError').classList.remove('d-none');
    document.getElementById('registerSuccess').classList.add('d-none');
    return;
  }
  usuarios.push({ user: user.value, pass: pass.value });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  document.getElementById('registerError').classList.add('d-none');
  document.getElementById('registerSuccess').textContent = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
  document.getElementById('registerSuccess').classList.remove('d-none');
  this.reset();
});
