const API_URL = "http://localhost:3000/api";

// HELPERS
function buildQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      q.append(k, v);
    }
  });
  return q.toString() ? `?${q.toString()}` : "";
}

// ----------------
// EJERCICIOS
// ----------------
export async function getEjercicios(params = {}) {
  const query = buildQuery(params);
  const res = await fetch(`${API_URL}/ejercicios${query}`);
  return res.json();
}

export async function createEjercicio(data) {
  const res = await fetch(`${API_URL}/ejercicios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEjercicio(id, data) {
  const res = await fetch(`${API_URL}/ejercicios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEjercicio(id) {
  await fetch(`${API_URL}/ejercicios/${id}`, { method: "DELETE" });
}

// ----------------
// SESIONES (CORREGIDO)
// ----------------
export async function getSesiones(params = {}) {

  // Cliente → usa ruta correcta
  if (params.clienteId) {
    const res = await fetch(`${API_URL}/sesiones/cliente/${params.clienteId}`);
    return res.json();
  }

  // Entrenador → usa ruta correcta
  if (params.entrenadorId) {
    const res = await fetch(`${API_URL}/sesiones/entrenador/${params.entrenadorId}`);
    return res.json();
  }

  // Admin → obtiene todas
  const res = await fetch(`${API_URL}/sesiones`);
  return res.json();
}

export async function createSesion(data) {
  const res = await fetch(`${API_URL}/sesiones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateSesion(id, data) {
  const res = await fetch(`${API_URL}/sesiones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteSesion(id) {
  await fetch(`${API_URL}/sesiones/${id}`, { method: "DELETE" });
}

// ----------------
// USUARIOS
// ----------------
export async function getUsuarios(params = {}) {
  const query = buildQuery(params);
  const res = await fetch(`${API_URL}/usuarios${query}`);
  return res.json();
}

export async function createUsuario(data) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUsuario(id, data) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUsuario(id) {
  await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
}
