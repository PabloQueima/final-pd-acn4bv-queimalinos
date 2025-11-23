export default function EjerciciosList({ ejercicios, onEdit, onDelete }) {
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {ejercicios.map((e) => (
        <li
          key={e.id}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <strong>{e.nombre}</strong>
            <br />
            <small>{e.parteCuerpo}</small>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => onEdit(e)}>Editar</button>
            <button onClick={() => onDelete(e.id)}>Eliminar</button>
          </div>
        </li>
      ))}

      {ejercicios.length === 0 && <p>No hay ejercicios.</p>}
    </ul>
  );
}
