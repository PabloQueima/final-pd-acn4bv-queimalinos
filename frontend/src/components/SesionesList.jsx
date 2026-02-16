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

  function abrirImagen(url) {
    window.open(
      url,
      "_blank",
      "width=600,height=600,resizable=yes,scrollbars=yes"
    );
  }

  return (
    <div>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {sesiones.map((s) => {
          const cliente =
            usuariosMap[s.clienteUid]?.nombre || `UID ${s.clienteUid}`;

          const entrenador =
            usuariosMap[s.entrenadorUid]?.nombre || `UID ${s.entrenadorUid}`;

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
                          <li key={ej.id} style={{ marginBottom: 10 }}>
                            <div>
                              <b>{data?.nombre || `Ejercicio ${ej.id}`}</b>

                              {data?.imageUrl && (
                                <div style={{ marginTop: 2 }}>
                                  <button
                                    onClick={() => abrirImagen(data.imageUrl)}
                                    style={{
                                      background: "transparent",
                                      border: "none",
                                      color: "#0066cc",
                                      fontWeight: "bold",
                                      textDecoration: "underline",
                                      cursor: "pointer",
                                      padding: 0,
                                      fontSize: 14
                                    }}
                                  >
                                    Ver imagen
                                  </button>
                                </div>
                              )}
                            </div>

                            <div>
                              <small>Parte: {data?.parteCuerpo || "Ninguna"}</small>
                            </div>

                            <div>
                              <small>Elemento: {data?.elemento || "Ninguno"}</small>
                            </div>

                            <div>
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
