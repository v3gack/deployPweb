import prisma from '../../prisma/client';
import { Pregunta, Dificultad, GradoEscolar } from '@prisma/client';

export const crearPregunta = async (data: {
  titulo: string;
  enunciado: string;
  grado: GradoEscolar;
  dificultad: Dificultad;
  respuestaImagenes: string[];
  respuestaSimbolos: string[];
  imagenesAdicionales: string[];
  autorId: number;
}) => {
  return prisma.pregunta.create({
    data,
  });
};

export const editarPregunta = async (
  id: number,
  data: {
    titulo?: string;
    enunciado?: string;
    grado?: GradoEscolar;
    dificultad?: Dificultad;
    respuestaImagenes?: string[];
    respuestaSimbolos?: string[];
    imagenesAdicionales?: string[];
    autorId?: number;
  }
): Promise<Pregunta | null> => {
  return prisma.pregunta.update({
    where: { id },
    data,
  });
};

export const eliminarPregunta = async (id: number): Promise<Pregunta | null> => {
  return prisma.pregunta.delete({
    where: { id },
  });
};

export const obtenerPreguntas = async (): Promise<Pregunta[]> => {
  return prisma.pregunta.findMany({
    include: {
      autor: true,
    },
    orderBy: {
      creadoEn: 'desc',
    },
  });
};

// Añade esta función al final del archivo pregunta.service.ts
export const obtenerPreguntaPorId = async (id: number): Promise<Pregunta | null> => {
  return prisma.pregunta.findUnique({
    where: { id },
    include: {
      autor: true, // Incluye la relación con el autor si es necesario
    },
  });
};
