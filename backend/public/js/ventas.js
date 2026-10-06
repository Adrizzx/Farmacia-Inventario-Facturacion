// ventas.js - Lógica para registro de ventas y facturación

// ventas.js - Lógica para registro de ventas y facturación (DEMO sin backend)
document.addEventListener('DOMContentLoaded', function() {
  // Obtener medicamentos de localStorage
  let medicamentos = JSON.parse(localStorage.getItem('medicamentos') || '[]');
  if (medicamentos.length === 0) {
    medicamentos = [
      { nombre: 'Paracetamol' },
      { nombre: 'Ibuprofeno' }
    ];
  }
  const contenedor = document.getElementById('medicamentosVenta');
  let idx = 0;

  function agregarCampo() {
    const div = document.createElement('div');
    div.className = 'row g-2 align-items-end mb-2';
    div.innerHTML = `
      <div class="col-md-6">
        <select class="form-select" name="medicamento_${idx}" required>
          <option value="">Seleccione medicamento</option>
          ${medicamentos.map(m => `<option value="${m.nombre}">${m.nombre}</option>`).join('')}
        </select>
      </div>
      <div class="col-md-3">
        <input type="number" class="form-control" name="cantidad_${idx}" min="1" required placeholder="Cantidad">
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-outline-danger btn-sm eliminarCampo">Quitar</button>
      </div>
    `;
    contenedor.appendChild(div);
    div.querySelector('.eliminarCampo').onclick = () => div.remove();
    idx++;
  }

  document.getElementById('agregarMedicamento').onclick = agregarCampo;
  agregarCampo();

  document.getElementById('formVenta').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      this.classList.add('was-validated');
      return;
    }
    // Guardar venta en localStorage
    const datos = Object.fromEntries(new FormData(this));
    let ventas = JSON.parse(localStorage.getItem('ventas') || '[]');
    // Armar detalle de medicamentos
    let detalle = [];
    for (let i = 0; datos[`medicamento_${i}`]; i++) {
      detalle.push({
        medicamento: datos[`medicamento_${i}`],
        cantidad: datos[`cantidad_${i}`]
      });
    }
    ventas.push({
      cliente_nombre: datos.cliente_nombre,
      cliente_cedula: datos.cliente_cedula,
      fecha: datos.fecha,
      detalle,
      total: 'Calculado demo'
    });
    localStorage.setItem('ventas', JSON.stringify(ventas));
    alert('Venta registrada correctamente');
    this.reset();
    contenedor.innerHTML = '';
    idx = 0;
    agregarCampo();
  });
});
