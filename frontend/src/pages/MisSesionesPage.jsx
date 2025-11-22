import { useEffect, useState } from "react";
import { getSesiones } from "../services/api";
import SesionesList from "../components/SesionesList";
import { getCurrentUser } from "../services/authService";

export default function MisSesionesPage() {
  const user = getCurrentUser();
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    cargarMisSesiones();
  }, []);

  async function cargarMisSesiones() {
    setLoading(true);

    try {
      const data = await getSesiones({ clienteId: user.id });
      setSesiones(data || []);
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
      ) : (
        <SesionesList sesiones={sesiones} />
      )}
    </div>
  );
}
