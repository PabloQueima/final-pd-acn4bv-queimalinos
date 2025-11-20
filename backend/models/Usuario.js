// models/Usuario.js

export default class Usuario {
  /**
   * @param {string|number} id
   * @param {string} nombre
   * @param {"admin"|"entrenador"|"cliente"} rol
   */
  constructor(id, nombre, rol) {
    this.id = String(id);
    this.nombre = String(nombre || "").trim();
    this.rol = rol?.toLowerCase() || "cliente";
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

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      rol: this.rol
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;
    return new Usuario(obj.id, obj.nombre, obj.rol);
  }
}
