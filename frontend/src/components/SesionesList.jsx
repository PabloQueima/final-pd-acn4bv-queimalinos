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
    <>
      {sesiones.map((s) => {
        const cliente =
          usuariosMap[s.clienteUid]?.nombre || `UID ${s.clienteUid}`;

        const entrenador =
          usuariosMap[s.entrenadorUid]?.nombre || `UID ${s.entrenadorUid}`;

        return (
          <div key={s.id} className="sesion-card">
            {/* Header sesión */}
            <div>
              <strong>{s.titulo}</strong>

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
                <div>
                  <em>Ejercicios:</em>
                  <div className="ejercicios-grid">
                    {s.ejercicios.map((ej) => {
                      const data = ejerciciosMap[ej.id];

                      return (
                        <div key={ej.id} className="ejercicio-item">
                          <div>
                            <b>{data?.nombre || `Ejercicio ${ej.id}`}</b>
                          </div>

                          {data?.imageUrl && (
                            <button onClick={() => abrirImagen(data.imageUrl)}>
                              Ver imagen
                            </button>
                          )}

                          <div style={{ fontSize: 13 }}>
                            <div>
                              Parte: {data?.parteCuerpo || "Ninguna"}
                            </div>
                            <div>
                              Elemento: {data?.elemento || "Ninguno"}
                            </div>
                          </div>

                          <div style={{ marginTop: 6 }}>
                            <strong>
                              {ej.series}×{ej.reps}
                            </strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Botones */}
            {showButtons && (
              <div className="acciones">
                {onEdit && (
                  <button className="editar" onClick={() => onEdit(s)}>
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button className="eliminar" onClick={() => onDelete(s.id)}>
                    Eliminar
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
