// dashboard.js - Lógica para dashboard principal

document.addEventListener('DOMContentLoaded', async () => {
  // Cargar alertas de medicamentos por vencer
  const vencimiento = await fetch('/api/medicamentos/alertas').then(r => r.json());
  document.getElementById('alertasVencimiento').textContent = vencimiento.mensaje || 'Sin alertas';

  // Cargar ventas del día
  const ventas = await fetch('/api/ventas/dia').then(r => r.json());
  document.getElementById('ventasDia').textContent = ventas.total ? `$${ventas.total.toFixed(2)}` : '$0.00';

  // Cargar inventario total
  const inventario = await fetch('/api/medicamentos/total').then(r => r.json());
  document.getElementById('inventarioTotal').textContent = `${inventario.total || 0} productos`;

  // Gráfico ingresos vs costos
  const ctx1 = document.getElementById('graficoIngresos').getContext('2d');
  const datosFin = await fetch('/api/reportes/financiero').then(r => r.json());
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: datosFin.fechas,
      datasets: [
        { label: 'Ingresos', data: datosFin.ingresos, backgroundColor: '#198754' },
        { label: 'Costos', data: datosFin.costos, backgroundColor: '#dc3545' }
      ]
    }
  });

  // Gráfico medicamentos más vendidos
  const ctx2 = document.getElementById('graficoMasVendidos').getContext('2d');
  const masVendidos = await fetch('/api/reportes/mas-vendidos').then(r => r.json());
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: masVendidos.nombres,
      datasets: [{ data: masVendidos.cantidades, backgroundColor: ['#0d6efd','#ffc107','#20c997','#fd7e14','#6f42c1'] }]
    }
  });
});
