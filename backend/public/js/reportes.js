// reportes.js - Lógica para visualización y exportación de reportes

document.getElementById('btnReporteInventario').onclick = async () => {
  // Inventario real desde localStorage
  const datos = JSON.parse(localStorage.getItem('medicamentos') || '[]');
  mostrarReporte('Inventario', datos);
};
document.getElementById('btnReporteVentas').onclick = async () => {
  // Ventas reales desde localStorage
  const datos = JSON.parse(localStorage.getItem('ventas') || '[]');
  mostrarReporte('Ventas', datos);
};
document.getElementById('btnReporteFinanciero').onclick = async () => {
  // Reporte financiero simple desde ventas
  const ventas = JSON.parse(localStorage.getItem('ventas') || '[]');
  const fechas = [];
  const ingresos = [];
  const costos = [];
  const agrupado = {};
  ventas.forEach(v => {
    if (!agrupado[v.fecha]) agrupado[v.fecha] = { ingresos: 0, costos: 0 };
    agrupado[v.fecha].ingresos += 20; // demo: cada venta suma 20
    agrupado[v.fecha].costos += 10; // demo: cada venta suma 10 de costo
  });
  for (let d in agrupado) {
    fechas.push(d);
    ingresos.push(agrupado[d].ingresos);
    costos.push(agrupado[d].costos);
  }
  mostrarReporte('Financiero', { fechas, ingresos, costos });
};

function mostrarReporte(tipo, datos) {
  const panel = document.getElementById('panelReportes');
  let html = `<h4 class="mb-4">${tipo}</h4>`;
  if (tipo === 'Inventario') {
    html += `<div class="table-responsive"><table class="table table-striped table-hover align-middle">
      <thead class="table-primary"><tr><th>Nombre</th><th>Principio</th><th>Lab.</th><th>Código</th><th>Vencimiento</th><th>Lote</th><th>Categoría</th><th>Cant.</th><th>Precio Venta</th></tr></thead><tbody>`;
    datos.forEach(med => {
      html += `<tr><td>${med.nombre}</td><td>${med.principio||''}</td><td>${med.laboratorio||''}</td><td>${med.codigo_barras||''}</td><td>${med.vencimiento||''}</td><td>${med.lote||''}</td><td>${med.categoria||''}</td><td>${med.cantidad||''}</td><td>$${med.precio_venta||''}</td></tr>`;
    });
    html += '</tbody></table></div>';
  } else if (tipo === 'Ventas') {
    html += `<div class="table-responsive"><table class="table table-striped table-hover align-middle">
      <thead class="table-success"><tr><th>Cliente</th><th>Cédula</th><th>Fecha</th><th>Detalle</th></tr></thead><tbody>`;
    datos.forEach(v => {
      html += `<tr><td>${v.cliente_nombre}</td><td>${v.cliente_cedula}</td><td>${v.fecha}</td><td>`;
      if (v.detalle) {
        html += '<ul class="mb-0">';
        v.detalle.forEach(d => {
          html += `<li>${d.medicamento} x ${d.cantidad}</li>`;
        });
        html += '</ul>';
      }
      html += `</td></tr>`;
    });
    html += '</tbody></table></div>';
  } else if (tipo === 'Financiero') {
    html += `<canvas id="graficoFinanciero" height="120"></canvas>`;
  }
  panel.innerHTML = html;
  if (tipo === 'Financiero' && datos.fechas) {
    setTimeout(() => {
      new Chart(document.getElementById('graficoFinanciero').getContext('2d'), {
        type: 'bar',
        data: {
          labels: datos.fechas,
          datasets: [
            { label: 'Ingresos', data: datos.ingresos, backgroundColor: '#198754' },
            { label: 'Costos', data: datos.costos, backgroundColor: '#dc3545' }
          ]
        }
      });
    }, 100);
  }
}
