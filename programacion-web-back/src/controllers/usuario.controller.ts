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
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};