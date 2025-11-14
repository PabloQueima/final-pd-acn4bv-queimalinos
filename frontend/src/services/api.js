const API_URL = "http://localhost:3000/api";

export async function getEjercicios() {
  const res = await fetch(`${API_URL}/ejercicios`);
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
