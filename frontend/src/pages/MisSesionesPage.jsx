import { useEffect, useState } from "react";
import { getSesiones, getEjercicios, getUsuarios } from "../services/api";
import SesionesList from "../components/SesionesList";
import { getCurrentUser } from "../services/authService";

export default function MisSesionesPage() {
  const user = getCurrentUser();

  const [sesiones, setSesiones] = useState([]);
  const [ejerciciosMap, setEjerciciosMap] = useState({});
  const [usuariosMap, setUsuariosMap] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    cargarDatos();
  }, []);

  async function cargarDatos() {
    setLoading(true);

    try {
      const [sesionesData, ejerciciosData, usuariosData] = await Promise.all([
        getSesiones({ clienteUid: user.uid }),
        getEjercicios(),
        getUsuarios()
      ]);

      const ejMap = {};
      ejerciciosData.forEach((e) => {
        ejMap[e.id] = e;
      });

      const usMap = {};
      usuariosData.forEach((u) => {
        usMap[u.uid] = u;
      });

      setEjerciciosMap(ejMap);
      setUsuariosMap(usMap);
      setSesiones(sesionesData || []);
    } catch (err) {
      console.error("Error cargando sesiones:", err);
      setSesiones([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Mis Sesiones</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : sesiones.length === 0 ? (
        <p style={{ marginTop: 20, fontSize: 16, color: "#333" }}>
          Para obtener tus sesiones de entrenamiento ponete en contacto con un entrenador.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            paddingTop: 10
          }}
        >
          {sesiones.map((s) => (
            <div
              key={s.id}
              style={{
                padding: 15,
                border: "1px solid #ccc",
                borderRadius: 8,
                background: "#fafafa",
                display: "flex",
                flexDirection: "column",
                gap: 8
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: 16 }}>
                {s.titulo}
              </div>

              <SesionesList
                sesiones={[s]}
                usuariosMap={usuariosMap}
                ejerciciosMap={ejerciciosMap}
                showAssignInfo={true}
                showButtons={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
