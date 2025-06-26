/* === controllers/usuario.controller.ts === */
import { Request, Response } from 'express';
import { registrarUsuario, loginUsuario } from '../services/usuario.service';

export const registrarUsuarioController = async (req: Request, res: Response) => {
  try {
    const usuario = await registrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

export const loginUsuarioController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const usuario = await loginUsuario(email, password);

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    };

    res.json({ mensaje: 'Login exitoso', usuario: req.session.usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const logoutUsuarioController = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Error al cerrar sesión' });
    res.clearCookie('connect.sid');
    res.json({ mensaje: 'Sesión cerrada' });
  });
};

export const perfilUsuarioController = (req: Request, res: Response) => {
  res.json({ usuario: req.session.usuario });
};