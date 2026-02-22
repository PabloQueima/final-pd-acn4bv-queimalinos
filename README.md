README — Plataformas de Desarrollo (Final)

Alumno: Pablo Queimaliños — pablo.queimalinos@davinci.edu.ar  
Comisión: ACN2CV — 2º cuatrimestre 2025 — Escuela Da Vinci  
Docente: Sergio Medina — sergiod.medina@davinci.edu.ar  
Proyecto: Plataforma de Entrenamiento
17/02/2026  

---

1. Descripción general

El proyecto implementa una plataforma completa para gestionar:

- Usuarios (rol admin)
- Ejercicios (rol admin)
- Sesiones de entrenamiento (rol entrenador)
- Asignación de ejercicios a sesiones
- Visualización de sesiones asignadas (rol cliente)
- Registro de nuevos usuarios (rol automático cliente)
- Autenticación con Firebase Authentication
- Validaciones en backend
- Paneles dinámicos según rol
- Persistencia manual de usuario en localStorage

Arquitectura general
- Backend Express con persistencia en Firestore
- Frontend React desacoplado con dashboards según rol
- Las validaciones se ejecutan en middleware antes de llegar al controller
- Se validan relaciones contra Firestore (existencia de cliente, entrenador, ejercicios)
- Se devuelven códigos HTTP correctos (400, 401, 404, 500)
- Roles: admin, entrenador, cliente

---

2. Tecnologías utilizadas

Backend
- Node.js + Express
- Autenticación con Firebase Authentication
- Verificación de ID Token mediante Firebase Admin SDK
- Rutas protegidas con middleware authMiddleware
- Rutas RESTful
- CORS + Morgan
- Arquitectura por capas (controllers, routes, middleware, models, utils)

Frontend
- React
- React Router DOM
- Firebase Authentication
- Context API (AppContext)
- Custom Hook global (useAuth)
- Sincronización con onAuthStateChanged
- Manejo global de loading
- Sistema de notificaciones dinámicas
- Rutas protegidas por rol
- CSS propio
- Dashboards diferenciados por rol

---

3. Instalación

Backend
- cd backend
- npm install
- npm start

Backend disponible en:
http://localhost:3000

Frontend
- cd frontend
- npm install
- npm run dev

Frontend disponible en:
http://localhost:5173

---
4. Estructura del proyecto:
   
Backend
- backend/
  - controllers/
  - middleware/
  - models/
  - routes/
  - utils/
  - firebase.js
  - index.js


Frontend
- frontend/src/
  - components/
  - context/
  - images/
  - pages/
  - services/
  - styles/
  - main.jsx
  - App.jsx

---
5. Endpoints principales
Usuarios
- GET /api/usuarios
- GET /api/usuarios/:uid
- POST /api/usuarios
- PUT /api/usuarios/:uid
- DELETE /api/usuarios/:uid

Ejercicios
- GET /api/ejercicios
- GET /api/ejercicios/:id
- POST /api/ejercicios
- PUT /api/ejercicios/:id
- DELETE /api/ejercicios/:id
- GET /api/ejercicios/buscar

Sesiones
- GET /api/sesiones
- GET /api/sesiones/:id
- POST /api/sesiones
- PUT /api/sesiones/:id
- DELETE /api/sesiones/:id

Filtros por rol
- GET /api/sesiones/cliente/:uid
- GET /api/sesiones/entrenador/:uid

Ejercicios dentro de la sesión
- POST /api/sesiones/:id/ejercicios
- DELETE /api/sesiones/:id/ejercicios/:ejercicioId

---

6. Roles y permisos
Admin
- CRUD de usuarios
- CRUD de ejercicios
- Ve estadisticas globales

Entrenador
- Crea, edita y elimina sesiones propias
- Asigna ejercicios a clientes
- Puede crear y gestionar sesiones asociadas a clientes.

Cliente
- Ve únicamente sus sesiones asignadas
- No puede editar información

---
7. Funcionalidad del sistema
- 7.1 Autenticación
- Autenticación gestionada mediante Firebase Authentication.
- El frontend realiza login y registro utilizando los métodos oficiales de Firebase.
- El backend valida cada request protegida mediante verifyIdToken del Firebase Admin SDK.
- Las rutas sensibles están protegidas con authMiddleware.

- 7.2 Navegación según rol
   Dashboards separados:
- /admin
- /entrenador
- /cliente

   7.3 Gestión de usuarios:
- Creación con nombre, email, rol y contraseña
- La gestión y encriptación de contraseñas es manejada por Firebase Authentication.
- Edición y eliminación
- Validaciones del backend

   7.4 Gestión de ejercicios:
- Crear / editar / eliminar
- Campo adicional imageUrl
- Filtros y búsquedas
- Validación completa de campos

   7.5 Gestión de sesiones:
- Crear sesiones con:
- título
- cliente
- entrenador

- ejercicios detallados (series / reps)
- Editar y eliminar sesiones
- Asignar y quitar ejercicios
- Listados por cliente o entrenador
- Mensaje especial cuando el cliente no tiene sesiones:
“Para obtener tus sesiones de entrenamiento ponete en contacto con un entrenador.”

---

8. Persistencia en Firestore
Colecciones utilizadas:
- usuarios
- ejercicios
- sesiones

---

9. Validaciones backend
- validateUsuario
- nombre obligatorio
- email obligatorio y válido
- password obligatorio (al crear)
- rol válido: admin / entrenador / cliente

validateEjercicio
- nombre obligatorio
- imageUrl opcional (string)
- parteCuerpo y elemento como strings válidos

validateSesion
- título obligatorio
- clienteUid existente en Firestore
- entrenadorUid existente
- ejercicios válidos
- series / reps numéricos

---

10. Ejecutar el proyecto
Backend
cd backend
npm start

Frontend
cd frontend
npm run dev

Abrir en navegador:
http://localhost:5173
