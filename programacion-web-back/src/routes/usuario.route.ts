import { Router } from 'express';
import {
  registrarUsuarioController,
  loginUsuarioController,
  logoutUsuarioController,
  perfilUsuarioController
} from '../controllers/usuario.controller';
import { verificarSesion } from '../middlewares/verificarSesion';

const router = Router();

router.post('/registro', (req, res, next) => {
  Promise.resolve(registrarUsuarioController(req, res)).catch(next);
});
router.post('/logueo', (req, res, next) => {
  Promise.resolve(loginUsuarioController(req, res)).catch(next);
});
router.post('/logout', (req, res, next) => {
  Promise.resolve(logoutUsuarioController(req, res)).catch(next);
});
router.get('/perfil', verificarSesion, (req, res, next) => {
  Promise.resolve(perfilUsuarioController(req, res)).catch(next);
});

export default router;