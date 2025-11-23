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
              <strong>{s.titulo}</strong>

              <div style={{ marginTop: 4 }}>
                <span style={{ display: "block" }}>
                  Cliente: <b>{cliente}</b>
                </span>
                <span style={{ display: "block" }}>
                  Entrenador: <b>{entrenador}</b>
                </span>
              </div>


              {showAssignInfo &&
                s.ejercicios &&
                s.ejercicios.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <em>Ejercicios:</em>
                    <ul style={{ marginTop: 6, paddingLeft: 16 }}>
                      {s.ejercicios.map((ej) => {
                        const data = ejerciciosMap[ej.id];
                        return (
                          <li key={ej.id}>
                            <div style={{ display: "inline-block", minWidth: "max-content", marginRight: 8 }}>
                              <b>{data?.nombre || `Ejercicio ${ej.id}`}</b>
                              {data?.descripcion ? ` — ${data.descripcion}` : ""}
                            </div>
                            <div style={{ display: "inline-block", minWidth: "max-content", marginRight: 8 }}>
                              <small>Parte: {data?.parteCuerpo}</small>
                            </div>
                            <div style={{ display: "inline-block", minWidth: "max-content", marginRight: 8 }}>
                              <small>Elemento: {data?.elemento || "Ninguno"}</small>
                            </div>
                            <div style={{ display: "inline-block", minWidth: "max-content" }}>
                              <strong>{ej.series}×{ej.reps}</strong>
                            </div>
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
