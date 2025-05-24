require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const personajeRoutes = require('./routes/personajeRoutes');
const bandoRoutes = require('./routes/bandoRoute');
const claseRoutes = require('./routes/claseRoute');
const razaRoutes = require('./routes/razaRoute');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use('/api/personajes', personajeRoutes);
app.use('/api/bandos', bandoRoutes);
app.use('/api/clases', claseRoutes);
app.use('/api/razas', razaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
