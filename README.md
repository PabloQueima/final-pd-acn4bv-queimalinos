README — Plataformas de Desarrollo (Final)
Alumno: Pablo Queimaliños — pablo.queimalinos@davinci.edu.ar

Comisión: ACN2CV — 2º cuatrimestre 2025 — Escuela Da Vinci
Docente: Sergio Medina — sergiod.medina@davinci.edu.ar
Proyecto: Plataforma de Entrenamiento

1. Descripción general
El proyecto implementa una plataforma completa para gestionar:
Usuarios (admin)
Ejercicios (admin)
Sesiones de entrenamiento (entrenador)
Asignación de ejercicios a sesiones
Visualización de sesiones asignadas (cliente)
Autenticación con login + JWT
Validaciones en backend
Paneles dinámicos según rol

Arquitectura:
Backend Express con persistencia en Firestore
Frontend React desacoplado, con dashboards por rol
Roles soportados: admin, entrenador, cliente
El objetivo es simular un entorno real con un backend REST moderno y un frontend independiente.

2. Tecnologías utilizadas
Backend
Node.js + Express
Firebase Admin SDK (Firestore)
bcrypt (hashing de contraseñas)
JSON Web Tokens (JWT)
Middlewares custom
Validadores basados en Firestore
Rutas RESTful
CORS + Morgan
Arquitectura por capas

Frontend
React
React Router DOM
Fetch API / Axios
Paneles por rol
Componentes reutilizables
CSS personalizado

3. Instalación
Backend
cd backend
npm install
npm start

El backend inicia en:
http://localhost:3000

Frontend
cd frontend
npm install
npm run dev

El frontend inicia en:
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

Usuarios
GET /api/usuarios
GET /api/usuarios/:id
POST /api/usuarios
PUT /api/usuarios/:id
DELETE /api/usuarios/:id

Ejercicios
GET /api/ejercicios
GET /api/ejercicios/:id
POST /api/ejercicios
PUT /api/ejercicios/:id
DELETE /api/ejercicios/:id
GET /api/ejercicios/buscar

Sesiones
GET /api/sesiones
GET /api/sesiones/:id
POST /api/sesiones
PUT /api/sesiones/:id
DELETE /api/sesiones/:id

Filtros:
GET /api/sesiones/cliente/:id
GET /api/sesiones/entrenador/:id

Ejercicios dentro de la sesión:
POST /api/sesiones/:id/ejercicios
DELETE /api/sesiones/:id/ejercicios/:ejercicioId

6. Roles y permisos
Admin
Gestiona usuarios (crear, editar, eliminar)
Gestiona ejercicios
Ve totalizadores

Entrenador
Crea, edita y elimina sesiones
Asigna ejercicios
Acceso a todos los clientes

Cliente
Visualiza sesiones asignadas
No puede modificar datos

7. Funcionalidad del sistema
7.1 Autenticación con Firestore + bcrypt + JWT
Búsqueda de usuario por nombre en Firestore
Comparación con contraseña hasheada
Generación de token JWT
Frontend almacena token + user en localStorage
Rutas protegidas en backend mediante middleware

7.2 Navegación según rol
Dashboards independientes:
/admin
/entrenador
/cliente

7.3 Gestión de usuarios
Crear usuarios con rol
Contraseñas hasheadas al guardar
Edición y eliminación
Validación desde backend
Listado filtrado por rol

7.4 Gestión de ejercicios
Crear, editar, eliminar
Validación de campos
Filtros y búsqueda

7.5 Gestión de sesiones
Crear sesiones con estructura completa:
título
cliente
entrenador
ejercicios
Edición total
Agregar o quitar ejercicios
Listado por cliente o entrenador

8. Persistencia en Firestore
Todas las colecciones se manejan desde Firebase Admin:
usuarios
ejercicios
sesiones
Los antiguos .json ya no se usan.
fileService.js fue adaptado para Firestore.

9. Validaciones backend
validateUsuario
nombre obligatorio
password obligatorio
rol válido: admin / entrenador / cliente

validateEjercicio
nombre obligatorio
descripción opcional
parteCuerpo y elemento como strings
validación segura

validateSesion (actualizado)
título obligatorio
clienteId válido en Firestore
entrenadorId válido
ejercicios existentes en Firestore
series y reps como número

10. Ejecutar el proyecto
Backend
cd backend
npm start

Frontend
cd frontend
npm run dev

Acceso general:
http://localhost:5173