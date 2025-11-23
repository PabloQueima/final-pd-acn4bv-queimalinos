export default function EjerciciosList({ ejercicios, onEdit, onDelete }) {
  if (!ejercicios || ejercicios.length === 0) {
    return <p>No hay ejercicios cargados.</p>;
  }

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {ejercicios.map((e) => (
        <li
          key={e.id}
          style={{
            padding: "10px 0",
            borderBottom: "1px solid #ddd"
          }}
        >
          <div style={{ display: "block" }}>
            <strong>{e.nombre}</strong>
          </div>
          <div style={{ display: "block" }}>
            <small>{e.descripcion}</small>
          </div>
          <div style={{ display: "block" }}>
            <small>Parte del cuerpo: {e.parteCuerpo}</small>
          </div>
          <div style={{ display: "block" }}>
            <small>Elemento: {e.elemento || "Ninguno"}</small>
          </div>

          <div style={{ marginTop: 5 }}>
            {onEdit && (
              <button onClick={() => onEdit(e)} style={{ marginRight: 10 }}>
                Editar
              </button>
            )}

            {onDelete && (
              <button onClick={() => onDelete(e.id)}>Eliminar</button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
