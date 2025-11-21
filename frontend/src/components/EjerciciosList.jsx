export default function EjerciciosList({ ejercicios, onEdit, onDelete }) {
  if (!ejercicios || ejercicios.length === 0) {
    return <p>No hay ejercicios cargados.</p>;
  }

  return (
    <ul>
      {ejercicios.map((e) => (
        <li key={e.id} style={{ marginBottom: 8 }}>
          {e.nombre} — {e.descripcion}

          <button style={{ marginLeft: 10 }} onClick={() => onEdit(e)}>
            Editar
          </button>

          <button style={{ marginLeft: 6 }} onClick={() => onDelete(e.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
