// reportes.js - Lógica para visualización y exportación de reportes

document.getElementById('btnReporteInventario').onclick = async () => {
  const datos = await fetch('/api/reportes/inventario').then(r => r.json());
  mostrarReporte('Inventario', datos);
};
document.getElementById('btnReporteVentas').onclick = async () => {
  const datos = await fetch('/api/reportes/ventas').then(r => r.json());
  mostrarReporte('Ventas', datos);
};
document.getElementById('btnReporteFinanciero').onclick = async () => {
  const datos = await fetch('/api/reportes/financiero').then(r => r.json());
  mostrarReporte('Financiero', datos);
};

function mostrarReporte(tipo, datos) {
  const panel = document.getElementById('panelReportes');
  panel.innerHTML = `<h4>${tipo}</h4><pre>${JSON.stringify(datos, null, 2)}</pre>`;
}
