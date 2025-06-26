import prisma from '../../prisma/client';
import bcrypt from 'bcrypt';

export const registrarUsuario = async (data: {
  nombre: string;
  email: string;
  password: string;
}) => {
  const hash = await bcrypt.hash(data.password, 10);
  return prisma.usuario.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      password: hash,
    },
  });
};

export const loginUsuario = async (email: string, password: string) => {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });
  if (!usuario || !usuario.password) return null;

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) return null;

  // No devuelvas la contraseña
  const { password: _, ...usuarioSinPassword } = usuario;
  return usuarioSinPassword;
};