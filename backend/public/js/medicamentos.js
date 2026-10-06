// medicamentos.js - Lógica para gestión de medicamentos

document.addEventListener('DOMContentLoaded', async () => {
  cargarMedicamentosLocal();

  document.getElementById('formMedicamento').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      this.classList.add('was-validated');
      return;
    }
    const datos = Object.fromEntries(new FormData(this));
    let meds = JSON.parse(localStorage.getItem('medicamentos') || '[]');
    meds.push(datos);
    localStorage.setItem('medicamentos', JSON.stringify(meds));
    this.reset();
    this.classList.remove('was-validated');
    bootstrap.Modal.getInstance(document.getElementById('modalMedicamento')).hide();
    cargarMedicamentosLocal();
  });
});

function cargarMedicamentosLocal() {
  let meds = JSON.parse(localStorage.getItem('medicamentos') || '[]');
  if (meds.length === 0) {
    meds = [
      {nombre:'Paracetamol', principio:'Paracetamol', laboratorio:'Genfar', codigo_barras:'123456', vencimiento:'2025-08-01', lote:'A1', categoria:'Analgésico', cantidad:10, precio_venta:2.5},
      {nombre:'Ibuprofeno', principio:'Ibuprofeno', laboratorio:'Bayer', codigo_barras:'654321', vencimiento:'2025-07-20', lote:'B2', categoria:'Antiinflamatorio', cantidad:7, precio_venta:3.0}
    ];
    localStorage.setItem('medicamentos', JSON.stringify(meds));
  }
  const tbody = document.getElementById('tablaMedicamentos');
  tbody.innerHTML = '';
  meds.forEach((med, i) => {
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
      <td><button class="btn btn-sm btn-danger" onclick="eliminarMedicamento(${i})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function eliminarMedicamento(idx) {
  let meds = JSON.parse(localStorage.getItem('medicamentos') || '[]');
  meds.splice(idx, 1);
  localStorage.setItem('medicamentos', JSON.stringify(meds));
  cargarMedicamentosLocal();
}
