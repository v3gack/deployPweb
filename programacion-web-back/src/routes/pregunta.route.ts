import { Router } from 'express';
import {
  crearPreguntaController,
  obtenerPreguntasController,
  obtenerPreguntaPorIdController,
  editarPreguntaController,
  eliminarPreguntaController,
} from '../controllers/pregunta.controller';
import { verificarSesion } from '../middlewares/verificarSesion';

const router = Router();

router.get('/obtener', verificarSesion, obtenerPreguntasController);
router.get('/obtener/:id', verificarSesion, obtenerPreguntaPorIdController);
router.post('/crear', verificarSesion, crearPreguntaController);
router.put('/editar/:id', verificarSesion, editarPreguntaController);
router.delete('/eliminar/:id', verificarSesion, eliminarPreguntaController);

export default router;