# Programacion-Web
Proyecto para la materia de Programacion Web UMSS
# Tecnologias 
 React
 PostgreSQL
# Instalación y ejecución
 Repositorio:
 https://github.com/v3gack/Programacion-Web.git
 Dependencias:

 - npm install

 - npm install react-router-dom --Rutas

 - npm install react-dnd react-dnd-html5-backend 

Comando para Inicar:
 - npm start

# PASOS PARA INICIALIZAR EL BACK

# Antes deben preparar lo siguiente:
- Instalar pnpm y typeScript
- Crear el .env como en el .env.example
- Cambiar los datos de la URL en el .env por los de su base de datos(PostgreSQL)

# Comandos a ejecutar:  
- instalar dependencias => pnpm install 
- iniciar typescript => npx tsc --init
- iniciar prisma => npx prisma init

# Creacion del cliente y la base de datos con Prisma
- pnpm prisma:generate
- pnpm prisma:migrate
Recomendacion: Reiniciar su editor de codigo para que los cambios sean establecidos.

# Iniciar el Servidor
- pnpm dev