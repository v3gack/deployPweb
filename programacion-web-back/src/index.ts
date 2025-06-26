import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import preguntasRoutes from './routes/pregunta.route';
import usuarioRoutes from './routes/usuario.route';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/api', preguntasRoutes);
app.use('/api/usuario', usuarioRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
