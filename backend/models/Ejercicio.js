// models/Ejercicio.js

export default class Ejercicio {
  /**
   * @param {string|number} id 
   * @param {string} nombre 
   * @param {string} descripcion 
   * @param {string} parteCuerpo 
   * @param {string} elemento 
   */
  constructor(id, nombre, descripcion, parteCuerpo = "", elemento = "") {
    this.id = String(id); // <- corrección clave
    this.nombre = String(nombre || "").trim();
    this.descripcion = String(descripcion || "").trim();
    this.parteCuerpo = parteCuerpo?.toLowerCase() || "";
    this.elemento = elemento?.toLowerCase() || "";
  }

  resumen() {
    return `${this.nombre} (${this.parteCuerpo || "general"}) - ${
      this.elemento || "sin equipo"
    }`;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      parteCuerpo: this.parteCuerpo,
      elemento: this.elemento,
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;
    return new Ejercicio(
      obj.id,
      obj.nombre,
      obj.descripcion,
      obj.parteCuerpo,
      obj.elemento
    );
  }
}
