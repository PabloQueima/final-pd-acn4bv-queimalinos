README — Plataformas de Desarrollo (Parcial 2)
Alumno: Pablo Queimaliños - pablo.queimalinos@davinci.edu.ar
Comisión ACN2CV. 2do cuatrimestre 2025. Escuela Da Vinci.
Docente: Sergio Medina - sergiod.medina@davinci.edu.ar

Proyecto Plataforma de Entrenamiento

1. Descripción general
Este proyecto implementa un sistema completo para gestionar usuarios, ejercicios y sesiones de entrenamiento, incluyendo:
- Administración de usuarios (admin)
- Gestión de ejercicios (admin)
- Asignación de ejercicios a sesiones (entrenadores)
- Sesiones creadas por entrenadores para clientes
- Visualización de sesiones por parte del cliente

Sistema de login y roles
Backend en Express con persistencia en JSON
Frontend en React con vistas por rol
El objetivo es simular un entorno real de manejo de rutinas de entrenamiento con un backend REST y un frontend dinámico basado en roles.

2. Tecnologías utilizadas
Backend
Node.js + Express
Persistencia en archivos JSON
Middlewares propios
Validadores personalizados
Rutas RESTful
CORS + Morgan
Autenticación básica sin JWT

Frontend
React + React Router DOM
Fetch API
Componentes reutilizables y paneles por rol
CSS personalizado

3. Instalación
Backend
cd backend
npm install
npm start

El backend corre por defecto en:
http://localhost:3000

Frontend
cd frontend
npm install
npm run dev

El frontend corre en:
http://localhost:5173

4. Estructura del backend y frontend
backend/
 ├── controllers/
 ├── data/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── utils/
 └── index.js

 frontend/src/
 ├── components/
 ├── images/
 ├── pages/
 ├── services/
 ├── styles/
 ├── main.jsx
 └── App.jsx

5. Endpoints principales
Autenticación
POST /api/login

Usuarios
GET    /api/usuarios
POST   /api/usuarios
PUT    /api/usuarios/:id
DELETE /api/usuarios/:id

Ejercicios
GET    /api/ejercicios
POST   /api/ejercicios
PUT    /api/ejercicios/:id
DELETE /api/ejercicios/:id
GET    /api/ejercicios/buscar

Sesiones
GET    /api/sesiones
POST   /api/sesiones
PUT    /api/sesiones/:id
DELETE /api/sesiones/:id
GET    /api/sesiones/cliente/:id
GET    /api/sesiones/entrenador/:id
POST   /api/sesiones/:id/ejercicios
DELETE /api/sesiones/:id/ejercicios/:ejercicioId

6. Roles y permisos
Admin
Gestiona usuarios (crear, editar, eliminar)
Gestiona ejercicios (crear, editar, eliminar)
Ve un totalizador de usuarios, sesiones y ejercicios

Entrenador
Gestiona Sesiones de entrenamiento
Crea y edita sesiones para sus clientes
Puede asignar cualquier ejercicio a una sesión

Cliente
Ve el detalle de las sesiones que le fueron asignadas
No puede modificar nada

7. Funcionalidad del sistema
7.1 Login
Verifica usuario por nombre y password.
Devuelve id, nombre, rol.
Se guarda en localStorage.

7.2 Navegación según rol
Cada rol ve un panel distinto:
/admin
/entrenador
/cliente

7.3 Gestión de usuarios
Crear usuarios con rol y password.
Editar nombre/rol/password.
Eliminar usuarios.
Listado con paginado y búsqueda.

7.4 Gestión de ejercicios
Crear ejercicios con nombre, parte del cuerpo, elemento y descripción.
Editar y eliminar.
Listado con paginado y búsqueda.

7.5 Gestión de sesiones
Crear sesión con:
título
cliente
entrenador (opcional)
lista de ejercicios
Editar o eliminar sesiones
Ver sesiones del cliente logueado

8. Persistencia
Los datos se guardan en:
backend/data/usuarios.json
backend/data/ejercicios.json
backend/data/sesiones.json

El archivo fileService.js garantiza que existan y maneja lectura/escritura segura.

9. Validaciones backend
Incluye middlewares:
validateUsuario
validateEjercicio
validateSesion

10. Ejecutar el proyecto
Iniciar backend:
cd backend
npm start

Iniciar frontend:
cd frontend
npm run dev

Acceder al navegador:
http://localhost:5173