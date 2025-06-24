import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import preguntasRoutes from './routes/pregunta.route';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/api', preguntasRoutes);

app.get('/usuarios', async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
