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
      <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
        {sesiones.map((s) => {
          const cliente =
            usuariosMap[s.clienteUid]?.nombre || `UID ${s.clienteUid}`;

          const entrenador =
            usuariosMap[s.entrenadorUid]?.nombre || `UID ${s.entrenadorUid}`;

          return (
            <li
              key={s.id}
              style={{
                marginBottom: 16,
                borderBottom: "1px solid #ddd",
                paddingBottom: 12
              }}
            >
              {/* Header sesión */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6
                }}
              >
                <strong
                  style={{
                    fontSize: 16,
                    wordBreak: "break-word"
                  }}
                >
                  {s.titulo}
                </strong>

                <div style={{ fontSize: 14 }}>
                  <div>
                    Cliente: <b>{cliente}</b>
                  </div>
                  <div>
                    Entrenador: <b>{entrenador}</b>
                  </div>
                </div>
              </div>

              {/* Ejercicios */}
              {showAssignInfo &&
                s.ejercicios &&
                s.ejercicios.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <em>Ejercicios:</em>

                    <ul
                      style={{
                        marginTop: 8,
                        padding: 0,
                        listStyle: "none",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: 12
                      }}
                    >
                      {s.ejercicios.map((ej) => {
                        const data = ejerciciosMap[ej.id];

                        return (
                          <li
                            key={ej.id}
                            style={{
                              border: "1px solid #e0e0e0",
                              borderRadius: 6,
                              padding: 10,
                              background: "#fff"
                            }}
                          >
                            <div style={{ marginBottom: 4 }}>
                              <b>{data?.nombre || `Ejercicio ${ej.id}`}</b>
                            </div>

                            {data?.imageUrl && (
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
                                  fontSize: 14,
                                  marginBottom: 4
                                }}
                              >
                                Ver imagen
                              </button>
                            )}

                            <div style={{ fontSize: 13 }}>
                              <div>Parte: {data?.parteCuerpo || "Ninguna"}</div>
                              <div>Elemento: {data?.elemento || "Ninguno"}</div>
                            </div>

                            <div style={{ marginTop: 6 }}>
                              <strong>
                                {ej.series}×{ej.reps}
                              </strong>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              {/* Botones */}
              {showButtons && (
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8
                  }}
                >
                  {onEdit && (
                    <button onClick={() => onEdit(s)}>
                      Editar
                    </button>
                  )}

                  {onDelete && (
                    <button onClick={() => onDelete(s.id)}>
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
