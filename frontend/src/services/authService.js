import axios from "axios";

export async function login(nombre, password) {
  try {
    const res = await axios.post("http://localhost:3000/api/login", { nombre, password });
    console.log("Login response:", res.data); // <- revisar aquí
    const user = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }

  const user = res.data;
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
