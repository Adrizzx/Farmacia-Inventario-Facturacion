// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Servir archivos estáticos (como index.html)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas API (si las tienes definidas)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/medicamentos', require('./routes/medicamentos.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));
app.use('/api/reportes', require('./routes/reportes.routes'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farmacia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Error conectando a MongoDB:', err);
});
