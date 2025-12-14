import { getAuth } from "firebase/auth";

const API_URL = "http://localhost:3000/api";

async function authHeaders() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return {};

  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`
  };
}

function buildQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      q.append(k, v);
    }
  });
  return q.toString() ? `?${q.toString()}` : "";
}

async function fetchWithAuth(url, options = {}) {
  const headers = await authHeaders();
  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });
}

export async function getEjercicios(params = {}) {
  const query = buildQuery(params);
  const res = await fetchWithAuth(`${API_URL}/ejercicios${query}`);
  return res.json();
}

export async function createEjercicio(data) {
  const res = await fetchWithAuth(`${API_URL}/ejercicios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateEjercicio(id, data) {
  const res = await fetchWithAuth(`${API_URL}/ejercicios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteEjercicio(id) {
  await fetchWithAuth(`${API_URL}/ejercicios/${id}`, {
    method: "DELETE"
  });
}

export async function getSesiones(params = {}) {
  if (params.clienteId) {
    const res = await fetchWithAuth(`${API_URL}/sesiones/cliente/${params.clienteId}`);
    return res.json();
  }

  if (params.entrenadorId) {
    const res = await fetchWithAuth(`${API_URL}/sesiones/entrenador/${params.entrenadorId}`);
    return res.json();
  }

  const res = await fetchWithAuth(`${API_URL}/sesiones`);
  return res.json();
}

export async function createSesion(data) {
  const res = await fetchWithAuth(`${API_URL}/sesiones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateSesion(id, data) {
  const res = await fetchWithAuth(`${API_URL}/sesiones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteSesion(id) {
  await fetchWithAuth(`${API_URL}/sesiones/${id}`, {
    method: "DELETE"
  });
}

export async function getUsuarios(params = {}) {
  const query = buildQuery(params);
  const res = await fetchWithAuth(`${API_URL}/usuarios${query}`);
  return res.json();
}

export async function createUsuario(data) {
  const res = await fetchWithAuth(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateUsuario(id, data) {
  const res = await fetchWithAuth(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteUsuario(id) {
  await fetchWithAuth(`${API_URL}/usuarios/${id}`, {
    method: "DELETE"
  });
}
