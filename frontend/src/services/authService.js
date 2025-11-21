import axios from "axios";

export async function login(nombre, password) {
  const res = await axios.post("http://localhost:3000/api/login", {
    nombre,
    password
  });

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
