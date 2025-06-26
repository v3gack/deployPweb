import { Router } from 'express';
import { registrarUsuarioController, loginUsuarioController } from '../controllers/usuario.controller';

const router = Router();

router.post('/registro', (req, res, next) => {
  Promise.resolve(registrarUsuarioController(req, res)).catch(next);
});
router.post('/logueo', (req, res, next) => {
  Promise.resolve(loginUsuarioController(req, res)).catch(next);
});

export default router;