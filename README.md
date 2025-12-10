README — Plataformas de Desarrollo (Final)
Alumno: Pablo Queimaliños — pablo.queimalinos@davinci.edu.ar
Comisión: ACN2CV — 2º cuatrimestre 2025 — Escuela Da Vinci
Docente: Sergio Medina — sergiod.medina@davinci.edu.ar
Proyecto: Plataforma de Entrenamiento

1. Descripción general
El proyecto implementa una plataforma completa para gestionar:
Usuarios (rol admin)
Ejercicios (rol admin)
Sesiones de entrenamiento (rol entrenador)
Asignación de ejercicios a sesiones
Visualización de sesiones asignadas (rol cliente)
Registro de nuevos usuarios (rol automático cliente)
Autenticación con JWT
Validaciones en backend
Paneles dinámicos según rol
Arquitectura general
Backend Express con persistencia en Firestore
Frontend React desacoplado con dashboards según rol
Roles: admin, entrenador, cliente
El objetivo es simular un entorno real de trabajo con un backend REST moderno y un frontend separado.

2. Tecnologías utilizadas
Backend
Node.js + Express
Firebase Admin SDK (Firestore)
bcrypt (hashing de contraseñas)
JSON Web Tokens (JWT)
Middlewares custom
Validadores contra Firestore
Rutas RESTful
CORS + Morgan
Arquitectura por capas (controllers, routes, middleware, models, utils)

Frontend
React
React Router DOM
Fetch API / Axios
Componentes reutilizables
CSS propio
Dashboards por rol
Manejo de token con localStorage

3. Instalación
Backend
cd backend
npm install
npm start

Backend disponible en:
http://localhost:3000

Frontend
cd frontend
npm install
npm run dev

Frontend disponible en:
http://localhost:5173

4. Estructura del proyecto
Backend
backend/
  controllers/
  middleware/
  models/
  routes/
  utils/
  firebase.js
  index.js

Frontend
frontend/src/
  components/
  images/
  pages/
  services/
  styles/
  main.jsx
  App.jsx

5. Endpoints principales
Autenticación
POST /api/login
POST /api/register

Usuarios
GET    /api/usuarios
GET    /api/usuarios/:id
POST   /api/usuarios
PUT    /api/usuarios/:id
DELETE /api/usuarios/:id

Ejercicios
GET    /api/ejercicios
GET    /api/ejercicios/:id
POST   /api/ejercicios
PUT    /api/ejercicios/:id
DELETE /api/ejercicios/:id
GET    /api/ejercicios/buscar

Sesiones
GET    /api/sesiones
GET    /api/sesiones/:id
POST   /api/sesiones
PUT    /api/sesiones/:id
DELETE /api/sesiones/:id

Filtros por rol
GET /api/sesiones/cliente/:id
GET /api/sesiones/entrenador/:id

Ejercicios dentro de la sesión
POST   /api/sesiones/:id/ejercicios
DELETE /api/sesiones/:id/ejercicios/:ejercicioId

6. Roles y permisos
Admin
CRUD de usuarios
CRUD de ejercicios
Ve totalizadores globales

Entrenador
Crea, edita y elimina sesiones
Asigna ejercicios
Trabaja con cualquier cliente

Cliente
Ve únicamente sus sesiones asignadas
No puede editar nada

7. Funcionalidad del sistema
7.1 Autenticación (Firestore + bcrypt + JWT)
Búsqueda de usuario por nombre en Firestore
Contraseña validada con hash bcrypt
Generación de token JWT de 4 horas
Token + user guardados en localStorage
Rutas protegidas mediante middleware en el backend

7.2 Navegación según rol
Dashboards separados:
/admin
/entrenador
/cliente

7.3 Gestión de usuarios
Creación con rol asignado
Password encriptado
Edición y eliminación
Validaciones del backend

7.4 Gestión de ejercicios
Crear / editar / eliminar
Filtros y búsquedas
Validación completa de campos

7.5 Gestión de sesiones
Crear sesiones con:
título
cliente
entrenador
ejercicios detallados
Editar y eliminar sesiones
Asignar/quitar ejercicios
Listados por cliente o entrenador

Mensaje especial cuando el cliente no tiene sesiones:
“Para obtener tus sesiones de entrenamiento ponete en contacto con un entrenador.”

8. Persistencia en Firestore
Colecciones utilizadas:
usuarios
ejercicios
sesiones

Los antiguos archivos .json fueron reemplazados.
fileService.js fue adaptado para Firestore.

9. Validaciones backend
validateUsuario
nombre obligatorio
password obligatorio
rol válido: admin / entrenador / cliente

validateEjercicio
nombre obligatorio
parteCuerpo y elemento como strings válidos

validateSesion
título obligatorio
clienteId existente en Firestore
entrenadorId existente
ejercicios válidos
series/reps numéricos

10. Ejecutar el proyecto
Backend
cd backend
npm start

Frontend
cd frontend
npm run dev

Abrir en navegador:
http://localhost:5173