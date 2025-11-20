export default class Usuario {
  constructor(id, nombre, rol, createdAt = null) {
    this.id = Number(id);
    this.nombre = String(nombre || "").trim();
    this.rol = String(rol || "cliente").toLowerCase();
    this.createdAt = createdAt || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      rol: this.rol,
      createdAt: this.createdAt
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;

    return new Usuario(
      obj.id,
      obj.nombre,
      obj.rol,
      obj.createdAt
    );
  }
}
