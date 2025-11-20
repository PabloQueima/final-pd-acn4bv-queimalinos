// models/Sesion.js

export default class Sesion {
  /**
   * @param {string|number} id
   * @param {string} titulo
   * @param {Array<{id:string, series:number, reps:number}>} ejerciciosAsignados
   * @param {string|number} clienteId
   * @param {string|number|null} entrenadorId
   */
  constructor(id, titulo, ejerciciosAsignados = [], clienteId, entrenadorId = null) {
    this.id = String(id);
    this.titulo = String(titulo || "").trim();
    this.ejerciciosAsignados = Array.isArray(ejerciciosAsignados) ? ejerciciosAsignados : [];
    this.clienteId = clienteId;
    this.entrenadorId = entrenadorId;
  }

  agregarEjercicio(ejercicioId, series = 3, reps = 10) {
    const existente = this.ejerciciosAsignados.find(e => e.id === ejercicioId);
    if (existente) {
      existente.series = series;
      existente.reps = reps;
    } else {
      this.ejerciciosAsignados.push({ id: ejercicioId, series, reps });
    }
  }

  eliminarEjercicio(ejercicioId) {
    this.ejerciciosAsignados = this.ejerciciosAsignados.filter(e => e.id !== ejercicioId);
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      clienteId: this.clienteId,
      entrenadorId: this.entrenadorId,
      ejerciciosAsignados: this.ejerciciosAsignados.map(e => ({
        id: e.id,
        series: e.series,
        reps: e.reps,
      })),
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;
    const { id, titulo, clienteId, entrenadorId, ejerciciosAsignados = [] } = obj;
    return new Sesion(id, titulo, ejerciciosAsignados, clienteId, entrenadorId);
  }
}
