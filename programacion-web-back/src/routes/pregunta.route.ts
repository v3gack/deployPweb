import { Router } from 'express';
import {
  crearPreguntaController,
  obtenerPreguntasController,
  editarPreguntaController,
  eliminarPreguntaController,
} from '../controllers/pregunta.controller';

const router = Router();

router.post('/crear', crearPreguntaController);
router.get('/obtener', obtenerPreguntasController);
router.put('/editar/:id', editarPreguntaController);
router.delete('/eliminar/:id', eliminarPreguntaController);

export default router;