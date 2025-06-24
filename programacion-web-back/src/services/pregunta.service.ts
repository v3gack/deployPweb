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
