import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import preguntasRoutes from './routes/pregunta.route';
import usuarioRoutes from './routes/usuario.route';
import dotenv from 'dotenv';

import path from 'path';

dotenv.config(); // Para poder usar variables de entorno (como SECRET)

const app = express();
const prisma = new PrismaClient();

//dep
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto según tu frontend
  credentials: true // Necesario para que el navegador acepte cookies con sesión
}));

app.use(express.json());

// Configuración de la sesión
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('La variable de entorno SESSION_SECRET no está definida');
}
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Pon true solo si usas HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
  })
);

// Rutas
app.use('/api/pregunta', preguntasRoutes);
app.use('/api/usuario', usuarioRoutes);

// Inicio del servidor
// app.listen(3001, () => {
//   console.log('Servidor corriendo en http://localhost:3001');
// });
app.use(express.static(path.join(__dirname, '../../programacion-web/build')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../programacion-web/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto ${PORT}`);
});