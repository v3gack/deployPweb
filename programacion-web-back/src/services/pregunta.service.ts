import prisma from '../../prisma/client';
import { Pregunta, Dificultad, GradoEscolar } from '@prisma/client';


// Tipo para creación SIN autorId (lo añadimos manualmente)
type CrearPreguntaInput = {
  titulo: string;
  enunciado: string;
  grado: GradoEscolar;
  dificultad: Dificultad;
  respuestaImagenes: string[];
  respuestaSimbolos: string[];
  imagenesAdicionales: string[];
};

// El servicio crea la pregunta recibiendo los datos sin autorId + el autorId por separado
export const crearPregunta = async (
  data: CrearPreguntaInput,
  autorId: number
): Promise<Pregunta> => {
  return prisma.pregunta.create({
    data: {
      ...data,
      autorId,
    },
  });
};

// Tipo para editar pregunta SIN autorId
type EditarPreguntaInput = Partial<Omit<CrearPreguntaInput, 'autorId'>>;

export const editarPregunta = async (
  id: number,
  data: EditarPreguntaInput
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

// Solo devuelve preguntas del usuario autenticado
export const obtenerPreguntasDelUsuario = async (
  autorId: number
): Promise<Pregunta[]> => {
  return prisma.pregunta.findMany({
    where: { autorId },
    orderBy: {
      creadoEn: 'desc',
    },
  });
};

// Ya no se usa directamente en el controlador
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

export const obtenerPreguntaPorId = async (id: number): Promise<Pregunta | null> => {
  return prisma.pregunta.findUnique({
    where: { id },
    include: {
      autor: true,
    },
  });
};