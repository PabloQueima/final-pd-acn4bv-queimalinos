// models/Usuario.js
export default class Usuario {
  constructor(id, nombre, rol, password) {
    this.id = Number(id);
    this.nombre = String(nombre || "").trim();
    this.rol = rol?.toLowerCase() || "cliente";
    this.password = String(password || "").trim();
  }

  descripcion() {
    return `${this.nombre} (${this.rol})`;
  }

  esCliente() {
    return this.rol === "cliente";
  }

  esEntrenador() {
    return this.rol === "entrenador";
  }

  esAdmin() {
    return this.rol === "admin";
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      rol: this.rol,
      password: this.password
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;
    return new Usuario(obj.id, obj.nombre, obj.rol, obj.password);
  }
}
