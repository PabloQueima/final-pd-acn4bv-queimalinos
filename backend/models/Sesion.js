export default class Sesion {
  /**
   * @param {number} id
   * @param {string} titulo
   * @param {Array<{id:number, series:number, reps:number}>} ejercicios
   * @param {number} clienteId
   * @param {number|null} entrenadorId
   * @param {string} createdAt
   * @param {string|null} updatedAt
   */
  constructor(
    id,
    titulo,
    ejercicios = [],
    clienteId,
    entrenadorId = null,
    createdAt = null,
    updatedAt = null
  ) {
    this.id = Number(id);
    this.titulo = String(titulo || "").trim();
    this.ejercicios = Array.isArray(ejercicios) ? ejercicios : [];
    this.clienteId = Number(clienteId);
    this.entrenadorId = entrenadorId !== null ? Number(entrenadorId) : null;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || null;
  }

  agregarEjercicio(id, series = 3, reps = 10) {
    const existente = this.ejercicios.find(e => e.id === id);

    if (existente) {
      existente.series = series;
      existente.reps = reps;
    } else {
      this.ejercicios.push({ id, series, reps });
    }

    this.updatedAt = new Date().toISOString();
  }

  eliminarEjercicio(id) {
    this.ejercicios = this.ejercicios.filter(e => e.id !== id);
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      clienteId: this.clienteId,
      entrenadorId: this.entrenadorId,
      ejercicios: this.ejercicios,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;

    return new Sesion(
      obj.id,
      obj.titulo,
      obj.ejercicios,
      obj.clienteId,
      obj.entrenadorId,
      obj.createdAt,
      obj.updatedAt
    );
  }
}
