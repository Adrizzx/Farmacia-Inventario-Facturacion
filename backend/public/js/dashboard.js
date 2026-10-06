// dashboard.js - Lógica para dashboard principal

document.addEventListener('DOMContentLoaded', async () => {
  // DEMO: Simulación de datos para dashboard
  document.getElementById('alertasVencimiento').textContent = '2 medicamentos por vencer en 30 días';
  document.getElementById('ventasDia').textContent = '$150.00';
  document.getElementById('inventarioTotal').textContent = '25 productos';

  // Gráfico ingresos vs costos (demo)
  const ctx1 = document.getElementById('graficoIngresos').getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04'],
      datasets: [
        { label: 'Ingresos', data: [120, 150, 100, 200], backgroundColor: '#198754' },
        { label: 'Costos', data: [80, 100, 70, 120], backgroundColor: '#dc3545' }
      ]
    }
  });

  // Gráfico medicamentos más vendidos (demo)
  const ctx2 = document.getElementById('graficoMasVendidos').getContext('2d');
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Omeprazol'],
      datasets: [{ data: [10, 7, 5, 3], backgroundColor: ['#0d6efd','#ffc107','#20c997','#fd7e14'] }]
    }
  });
});
