// ventas.js - Lógica para registro de ventas y facturación

document.addEventListener('DOMContentLoaded', async () => {
  let medicamentos = await fetch('/api/medicamentos').then(r => r.json());
  const contenedor = document.getElementById('medicamentosVenta');
  let idx = 0;

  function agregarCampo() {
    const div = document.createElement('div');
    div.className = 'row g-2 align-items-end mb-2';
    div.innerHTML = `
      <div class="col-md-6">
        <select class="form-select" name="medicamento_${idx}" required>
          <option value="">Seleccione medicamento</option>
          ${medicamentos.map(m => `<option value="${m._id}">${m.nombre}</option>`).join('')}
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

  document.getElementById('formVenta').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      this.classList.add('was-validated');
      return;
    }
    const datos = Object.fromEntries(new FormData(this));
    const res = await fetch('/api/ventas', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    });
    if (res.ok) {
      alert('Venta registrada correctamente');
      this.reset();
      contenedor.innerHTML = '';
      idx = 0;
      agregarCampo();
    }
  });
});
