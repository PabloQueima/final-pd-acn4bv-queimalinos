export default class Usuario {
  constructor(uid, nombre, email, rol = "cliente", createdAt = null) {
    this.uid = String(uid);
    this.nombre = String(nombre || "").trim();
    this.email = String(email || "").trim();
    this.rol = rol.toLowerCase();
    this.createdAt = createdAt || new Date().toISOString();
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
      uid: this.uid,
      nombre: this.nombre,
      email: this.email,
      rol: this.rol,
      createdAt: this.createdAt
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;
    return new Usuario(
      obj.uid,
      obj.nombre,
      obj.email,
      obj.rol,
      obj.createdAt
    );
  }
}
