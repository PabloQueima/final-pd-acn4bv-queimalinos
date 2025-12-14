export default class Sesion {
  constructor(
    id,
    titulo,
    ejercicios = [],
    clienteUid,
    entrenadorUid = null,
    createdAt = null,
    updatedAt = null
  ) {
    this.id = Number(id);
    this.titulo = String(titulo || "").trim();
    this.ejercicios = Array.isArray(ejercicios) ? ejercicios : [];
    this.clienteUid = String(clienteUid);
    this.entrenadorUid = entrenadorUid ? String(entrenadorUid) : null;
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
      clienteUid: this.clienteUid,
      entrenadorUid: this.entrenadorUid,
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
      Array.isArray(obj.ejercicios) ? obj.ejercicios : [],
      obj.clienteUid,
      obj.entrenadorUid,
      obj.createdAt,
      obj.updatedAt
    );
  }
}
