import { Router } from 'express';
import {
  crearPreguntaController,
  obtenerPreguntasController,
} from '../controllers/pregunta.controller';

const router = Router();

router.post('/crear', crearPreguntaController);
router.get('/obtener', obtenerPreguntasController);

export default router;