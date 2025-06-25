import { Request, Response } from 'express';
import { crearPregunta, obtenerPreguntas, editarPregunta, eliminarPregunta,obtenerPreguntaPorId } from '../services/pregunta.service';

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

export const obtenerPreguntaPorIdController = async (
  req: Request<{ id: string }>, // Especifica que el parámetro es un string
  res: Response
): Promise<void> => { // Cambia el tipo de retorno a void
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID de pregunta no válido' });
      return;
    }

    const pregunta = await obtenerPreguntaPorId(id);
    
    if (!pregunta) {
      res.status(404).json({ error: 'Pregunta no encontrada' });
      return;
    }
    
    res.json(pregunta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la pregunta' });
  }
};