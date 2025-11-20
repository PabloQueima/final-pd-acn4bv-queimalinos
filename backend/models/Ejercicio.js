export default class Ejercicio {
  /**
   * @param {number} id
   * @param {string} nombre
   * @param {string} descripcion
   * @param {string} parteCuerpo
   * @param {string} elemento
   * @param {string} createdAt
   */
  constructor(id, nombre, descripcion = "", parteCuerpo = "", elemento = "", createdAt = null) {
    this.id = Number(id);
    this.nombre = String(nombre || "").trim();
    this.descripcion = String(descripcion || "").trim();
    this.parteCuerpo = String(parteCuerpo || "").toLowerCase();
    this.elemento = String(elemento || "").toLowerCase();
    this.createdAt = createdAt || new Date().toISOString();
  }

  /** Serializa a objeto plano */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      parteCuerpo: this.parteCuerpo,
      elemento: this.elemento,
      createdAt: this.createdAt
    };
  }

  /** Reconstruye desde JSON */
  static fromJSON(obj) {
    if (!obj) return null;

    return new Ejercicio(
      obj.id,
      obj.nombre,
      obj.descripcion,
      obj.parteCuerpo,
      obj.elemento,
      obj.createdAt
    );
  }
}
