const API_URL = "http://localhost:3000/api";

// ---------------------------
// Helpers
// ---------------------------
async function request(url, options = {}) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(error.error || "Error en la solicitud");
  }

  return res.json().catch(() => null);
}

// ---------------------------
// Ejercicios
// ---------------------------
export async function getEjercicios(params = {}) {
  // Permite filtro/búsqueda desde el frontend
  const query = new URLSearchParams(params).toString();
  return request(`${API_URL}/ejercicios${query ? `?${query}` : ""}`);
}

export async function createEjercicio(data) {
  return request(`${API_URL}/ejercicios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function updateEjercicio(id, data) {
  return request(`${API_URL}/ejercicios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function deleteEjercicio(id) {
  return request(`${API_URL}/ejercicios/${id}`, {
    method: "DELETE"
  });
}

// ---------------------------
// Usuarios
// ---------------------------
export async function getUsuarios() {
  return request(`${API_URL}/usuarios`);
}

export async function createUsuario(data) {
  return request(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function updateUsuario(id, data) {
  return request(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function deleteUsuario(id) {
  return request(`${API_URL}/usuarios/${id}`, {
    method: "DELETE"
  });
}

// ---------------------------
// Sesiones
// ---------------------------
export async function getSesiones(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`${API_URL}/sesiones${query ? `?${query}` : ""}`);
}


export async function createSesion(data) {
  return request(`${API_URL}/sesiones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function updateSesion(id, data) {
  return request(`${API_URL}/sesiones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function deleteSesion(id) {
  return request(`${API_URL}/sesiones/${id}`, {
    method: "DELETE"
  });
}
