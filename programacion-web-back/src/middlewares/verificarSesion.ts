import { Request, Response, NextFunction } from 'express';

export const verificarSesion = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.usuario) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }
  next();
};