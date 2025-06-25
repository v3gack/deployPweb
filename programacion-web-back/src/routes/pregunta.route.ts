import { Router } from 'express';
import {
  crearPreguntaController,
  obtenerPreguntasController,
  obtenerPreguntaPorIdController,
  editarPreguntaController,
  eliminarPreguntaController,
} from '../controllers/pregunta.controller';

const router = Router();
router.get('/obtener/:id', obtenerPreguntaPorIdController);
router.get('/obtener', obtenerPreguntasController);


router.post('/crear', crearPreguntaController);
router.put('/editar/:id', editarPreguntaController);
router.delete('/eliminar/:id', eliminarPreguntaController);
export default router;