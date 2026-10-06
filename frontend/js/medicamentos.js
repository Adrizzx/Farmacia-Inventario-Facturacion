// medicamentos.js - Lógica para gestión de medicamentos

document.addEventListener('DOMContentLoaded', async () => {
  await cargarMedicamentos();

  document.getElementById('formMedicamento').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      this.classList.add('was-validated');
      return;
    }
    const datos = Object.fromEntries(new FormData(this));
    const res = await fetch('/api/medicamentos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    });
    if (res.ok) {
      await cargarMedicamentos();
      this.reset();
      this.classList.remove('was-validated');
      bootstrap.Modal.getInstance(document.getElementById('modalMedicamento')).hide();
    }
  });
});

async function cargarMedicamentos() {
  const res = await fetch('/api/medicamentos');
  const medicamentos = await res.json();
  const tbody = document.getElementById('tablaMedicamentos');
  tbody.innerHTML = '';
  medicamentos.forEach(med => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${med.nombre}</td>
      <td>${med.principio}</td>
      <td>${med.laboratorio}</td>
      <td>${med.codigo_barras}</td>
      <td>${med.vencimiento}</td>
      <td>${med.lote}</td>
      <td>${med.categoria}</td>
      <td>${med.cantidad}</td>
      <td>$${med.precio_venta}</td>
      <td><button class="btn btn-sm btn-danger">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}
