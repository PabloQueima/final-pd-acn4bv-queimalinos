// src/components/SesionesList.jsx
import React from "react";

export default function SesionesList({
  sesiones,
  onEdit,
  onDelete,
  showAssignInfo = true
}) {
  if (!sesiones || sesiones.length === 0) {
    return <p>No hay sesiones registradas.</p>;
  }

  return (
    <div>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {sesiones.map((s) => (
          <li
            key={s.id}
            style={{
              marginBottom: 14,
              borderBottom: "1px solid #ddd",
              paddingBottom: 8
            }}
          >
            <strong>{s.titulo}</strong> (ID: {s.id})<br />

            <small>
              Cliente: {s.clienteId || "sin asignar"} — Entrenador:{" "}
              {s.entrenadorId || "sin asignar"}
            </small>

            {showAssignInfo &&
              s.ejercicios &&
              s.ejercicios.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <em>Ejercicios:</em>
                  <ul style={{ marginTop: 6 }}>
                    {s.ejercicios.map((ej) => (
                      <li key={ej.id}>
                        Ejercicio {ej.id} — {ej.series}×{ej.reps}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
          </li>
        ))}
      </ul>
    </div>
  );
}
