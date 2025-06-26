import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import preguntasRoutes from './routes/pregunta.route';
import usuarioRoutes from './routes/usuario.route';
import dotenv from 'dotenv';

dotenv.config(); // Para poder usar variables de entorno (como SECRET)

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto según tu frontend
  credentials: true // Necesario para que el navegador acepte cookies con sesión
}));

app.use(express.json());

// Configuración de la sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || '123567904823072003RiN',
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
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});