import { Request, Response } from 'express';
import {
  crearPregunta,
  obtenerPreguntasDelUsuario,
  editarPregunta,
  eliminarPregunta,
  obtenerPreguntaPorId
} from '../services/pregunta.service';

export const crearPreguntaController = async (req: Request, res: Response) => {
  try {
    const autorId = req.session.usuario!.id;

    // Quitamos autorId si viene en el body para evitar manipulación externa
    const { autorId: _omit, ...datosPregunta } = req.body;

    const nuevaPregunta = await crearPregunta(datosPregunta, autorId);
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la pregunta' });
  }
};

export const obtenerPreguntasController = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.session.usuario!.id;
    const preguntas = await obtenerPreguntasDelUsuario(usuarioId);
    res.json(preguntas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las preguntas' });
  }
};

export const editarPreguntaController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Quitamos autorId si viene en el body para evitar que se modifique
    const { autorId: _omit, ...datosEditar } = req.body;

    const preguntaActualizada = await editarPregunta(id, datosEditar);
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

export const obtenerPreguntaPorIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
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