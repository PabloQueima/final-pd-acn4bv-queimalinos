// src/pages/MisSesionesPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSesiones } from "../services/api";
import SesionesList from "../components/SesionesList";

export default function MisSesionesPage() {
  const [searchParams] = useSearchParams();
  const [clienteId, setClienteId] = useState(null);
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1) buscar query param ?clienteId=
    const qId = searchParams.get("clienteId");
    if (qId) {
      setClienteId(Number(qId));
      return;
    }

    // 2) intentar localStorage
    const stored = localStorage.getItem("currentUserId");
    if (stored) {
      setClienteId(Number(stored));
      return;
    }

    // 3) pedir por prompt para pruebas
    const promptId = prompt("Ingrese su clienteId para ver sus sesiones (ej: 101):");
    if (promptId) {
      setClienteId(Number(promptId));
      localStorage.setItem("currentUserId", String(promptId));
    }
  }, [searchParams]);

  useEffect(() => {
    if (clienteId === null || clienteId === undefined) return;
    cargarMisSesiones(clienteId);
  }, [clienteId]);

  async function cargarMisSesiones(id) {
    setLoading(true);
    try {
      const data = await getSesiones();
      const mine = (data || []).filter(s => Number(s.clienteId) === Number(id));
      setSesiones(mine);
    } catch (err) {
      console.error("Error cargando sesiones:", err);
      setSesiones([]);
    } finally {
      setLoading(false);
    }
  }

  if (!clienteId) {
    return <p>Cliente no identificado. Proveer `?clienteId=...` o guardar `currentUserId` en localStorage.</p>;
  }

  return (
    <div>
      <h2>Mis Sesiones (Cliente {clienteId})</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <SesionesList sesiones={sesiones} showAssignInfo={true} />
      )}
    </div>
  );
}
