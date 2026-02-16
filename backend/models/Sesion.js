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
    this.id = id;
    this.titulo = String(titulo || "").trim();
    this.ejercicios = Array.isArray(ejercicios) ? ejercicios : [];
    this.clienteUid = String(clienteUid);
    this.entrenadorUid = entrenadorUid ? String(entrenadorUid) : null;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || null;
  }

  toJSON() {
    return {
      titulo: this.titulo,
      clienteUid: this.clienteUid,
      entrenadorUid: this.entrenadorUid,
      ejercicios: this.ejercicios,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new Sesion(
      doc.id,
      data.titulo,
      data.ejercicios || [],
      data.clienteUid,
      data.entrenadorUid,
      data.createdAt,
      data.updatedAt
    );
  }
}
