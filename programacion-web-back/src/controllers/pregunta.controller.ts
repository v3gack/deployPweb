import { Request, Response } from 'express';
import { crearPregunta, obtenerPreguntas, editarPregunta, eliminarPregunta } from '../services/pregunta.service';

export const crearPreguntaController = async (req: Request, res: Response) => {
  try {
    const nuevaPregunta = await crearPregunta(req.body);
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la pregunta' });
  }
};

export const editarPreguntaController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const preguntaActualizada = await editarPregunta(id, req.body);
    res.json(preguntaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar la pregunta' });
  }
};

export const eliminarPreguntaController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const preguntaEliminada = await eliminarPregunta(id);
    res.json(preguntaEliminada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la pregunta' });
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