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

# ANTES DEBEN PREPARAR LO SIGUIENTE:
- Instalar pnpm y typeScript
- Crear el .env como en el .env.example
- Cambiar los datos de la URL en el .env por los de su base de datos(PostgreSQL)

# PASOS A SEGUIR PARA LA CONFIGURACION:  
- instalar dependencias => pnpm install 
- iniciar typescript => npx tsc --init
- iniciar prisma => npx prisma init

# CREACION DEL USUARIO PRISMA Y LA BASE DE DATOS
- pnpm prisma:generate
- pnpm prisma:migrate
Recomendacion: Reiniciar su editor de codigo para que los cambios sean establecidos.

# INICIAR EL SERVIDOR
- pnpm dev