export default function UsuariosList({ usuarios = [], onEdit, onDelete }) {
  if (!Array.isArray(usuarios) || usuarios.length === 0) {
    return <p>No hay usuarios.</p>;
  }

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {usuarios.map((u) => (
        <li
          key={u.id}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <strong>{u.nombre}</strong>
            <br />
            {u.email && <small>{u.email}</small>}
            <br />
            <small>Rol: {u.rol}</small>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {onEdit && <button onClick={() => onEdit(u)}>Editar</button>}
            {onDelete && <button onClick={() => onDelete(u.id)}>Eliminar</button>}
          </div>
        </li>
      ))}
    </ul>
  );
}
