export default function SesionesList({
  sesiones,
  onEdit,
  onDelete,
  showAssignInfo = true,
  showButtons = true,
  ejerciciosMap = {},
  usuariosMap = {}
}) {
  if (!sesiones || sesiones.length === 0) {
    return <p>No hay sesiones registradas.</p>;
  }

  return (
    <div>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {sesiones.map((s) => {
          const cliente = usuariosMap[s.clienteId]?.nombre || `ID ${s.clienteId}`;
          const entrenador =
            usuariosMap[s.entrenadorId]?.nombre || `ID ${s.entrenadorId}`;

          return (
            <li
              key={s.id}
              style={{
                marginBottom: 14,
                borderBottom: "1px solid #ddd",
                paddingBottom: 8
              }}
            >
              <strong>{s.titulo}</strong> <br />

              <small>
                Cliente: <b>{cliente}</b>{" "}
                — Entrenador: <b>{entrenador}</b>
              </small>

              {showAssignInfo &&
                s.ejercicios &&
                s.ejercicios.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <em>Ejercicios:</em>
                    <ul style={{ marginTop: 6 }}>
                      {s.ejercicios.map((ej) => {
                        const data = ejerciciosMap[ej.id];
                        return (
                          <li key={ej.id}>
                            <b>{data?.nombre || `Ejercicio ${ej.id}`}</b>
                            {data?.descripcion ? ` — ${data.descripcion}` : ""}
                            <br />
                            <small>Parte: {data?.parteCuerpo}</small>
                            <br />
                            <small>Elemento: {data?.elemento || "Ninguno"}</small>
                            <br />
                            <strong>{ej.series}×{ej.reps}</strong>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              {showButtons && (
                <div style={{ marginTop: 8 }}>
                  {onEdit && (
                    <button
                      onClick={() => onEdit(s)}
                      style={{ marginRight: 8 }}
                    >
                      Editar
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(s.id)}
                      style={{ marginRight: 8 }}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
