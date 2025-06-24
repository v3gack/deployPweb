import { Request, Response } from 'express';
import { crearPregunta, obtenerPreguntas } from '../services/pregunta.service';

export const crearPreguntaController = async (req: Request, res: Response) => {
  try {
    const nuevaPregunta = await crearPregunta(req.body);
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la pregunta' });
  }
};

export const obtenerPreguntasController = async (_req: Request, res: Response) => {
  try {
    const preguntas = await obtenerPreguntas();
    res.json(preguntas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las preguntas' });
  }
};