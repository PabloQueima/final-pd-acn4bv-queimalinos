export default function UsuariosList({ usuarios, onEdit, onDelete }) {
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
            <small>Rol: {u.rol}</small>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => onEdit(u)}>Editar</button>
            <button onClick={() => onDelete(u.id)}>Eliminar</button>
          </div>
        </li>
      ))}

      {usuarios.length === 0 && <p>No hay usuarios.</p>}
    </ul>
  );
}
