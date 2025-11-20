export default function UsuariosList({ usuarios, onEdit, onDelete }) {
  if (!usuarios || usuarios.length === 0) {
    return <p>No hay usuarios cargados.</p>;
  }

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id} style={{ marginBottom: 8 }}>
          {u.nombre} — {u.rol}

          <button style={{ marginLeft: 10 }} onClick={() => onEdit(u)}>
            Editar
          </button>

          <button style={{ marginLeft: 6 }} onClick={() => onDelete(u.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
