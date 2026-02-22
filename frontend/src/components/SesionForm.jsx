import { useEffect, useState } from "react";
import { getUsuarios, getEjercicios } from "../services/api";
import EjercicioSelector from "./EjercicioSelector";
import { useApp } from "../context/AppContext";

export default function SesionForm({
  onSubmit,
  onCancel,
  initialData = null,
  currentRol,
  currentUid
}) {
  const { showNotification, setGlobalLoading } = useApp();

  const [titulo, setTitulo] = useState("");
  const [clienteUid, setClienteUid] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [todosEjercicios, setTodosEjercicios] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    cargarUsuarios();
    cargarEjerciciosBase();
  }, []);

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || "");
      setClienteUid(initialData.clienteUid || "");
      setEjercicios(initialData.ejercicios || []);
    } else {
      limpiarFormulario();
    }
  }, [initialData]);

  async function cargarUsuarios() {
    const data = await getUsuarios();
    setUsuarios(data || []);
  }

  async function cargarEjerciciosBase() {
    const data = await getEjercicios();
    setTodosEjercicios(data || []);
  }

  const clientes = usuarios.filter((u) => u.rol === "cliente");

  function validate() {
    const newErrors = {};

    if (!titulo.trim()) {
      newErrors.titulo = "El título es obligatorio.";
    }

    if (!clienteUid) {
      newErrors.clienteUid = "Debe seleccionar un cliente.";
    }

    if (ejercicios.length === 0) {
      newErrors.ejercicios = "Debe agregar al menos un ejercicio.";
    }

    ejercicios.forEach((e, index) => {
      if (!e.series || e.series <= 0) {
        newErrors[`series-${index}`] = "Series inválidas.";
      }
      if (!e.reps || e.reps <= 0) {
        newErrors[`reps-${index}`] = "Repeticiones inválidas.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleAddEjercicio(item) {
    const exists = ejercicios.find((e) => e.id === item.id);
    if (exists) {
      setEjercicios(ejercicios.map((e) => (e.id === item.id ? item : e)));
    } else {
      setEjercicios([...ejercicios, item]);
    }
  }

  function removeEjercicio(id) {
    setEjercicios(ejercicios.filter((e) => e.id !== id));
  }

  function limpiarFormulario() {
    setTitulo("");
    setClienteUid("");
    setEjercicios([]);
    setErrors({});
  }

  function handleCancel() {
    limpiarFormulario();
    if (onCancel) onCancel();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.nativeEvent.submitter?.name !== "submit-btn") return;

    if (!validate()) {
      showNotification("error", "Hay errores en el formulario.");
      return;
    }

    const payload = {
      id: initialData?.id || null,
      titulo: titulo.trim(),
      clienteUid,
      entrenadorUid: currentRol === "entrenador" ? currentUid : null,
      ejercicios
    };

    try {
      setGlobalLoading(true);
      await onSubmit(payload);

      showNotification(
        "success",
        initialData ? "Sesión actualizada correctamente." : "Sesión creada correctamente."
      );

      limpiarFormulario();
    } catch (err) {
      showNotification("error", err.message || "Error al guardar sesión.");
    } finally {
      setGlobalLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      style={{
        marginBottom: 20,
        padding: 15,
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <h3>{initialData ? "Editar Sesión" : "Nueva Sesión"}</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <input
            placeholder="Título de la sesión"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{
              padding: 6,
              width: "250px",
              borderColor: errors.titulo ? "red" : "#ccc"
            }}
          />
          {errors.titulo && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.titulo}</div>
          )}
        </div>

        <div>
          <select
            value={clienteUid}
            onChange={(e) => setClienteUid(e.target.value)}
            style={{
              padding: 6,
              width: "250px",
              borderColor: errors.clienteUid ? "red" : "#ccc"
            }}
          >
            <option value="">Seleccionar Cliente</option>
            {clientes.map((u) => (
              <option key={u.uid} value={u.uid}>
                {u.nombre}
              </option>
            ))}
          </select>
          {errors.clienteUid && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.clienteUid}</div>
          )}
        </div>
      </div>

      <EjercicioSelector onAdd={handleAddEjercicio} />

      <div>
        <h4>Ejercicios en la sesión</h4>

        {errors.ejercicios && (
          <div style={{ color: "red", fontSize: 12 }}>
            {errors.ejercicios}
          </div>
        )}

        {ejercicios.length === 0 && <p>No hay ejercicios agregados.</p>}

        <ul style={{ paddingLeft: 15 }}>
          {ejercicios.map((e, index) => {
            const ejData = todosEjercicios.find((x) => x.id === e.id);
            return (
              <li key={e.id} style={{ marginBottom: 8 }}>
                <strong>{ejData?.nombre || `Ejercicio ${e.id}`}</strong>
                <div>
                  <small>
                    Series × Reps: {e.series}×{e.reps}
                  </small>
                </div>

                {(errors[`series-${index}`] || errors[`reps-${index}`]) && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {errors[`series-${index}`] || errors[`reps-${index}`]}
                  </div>
                )}

                <button
                  style={{ marginTop: 4 }}
                  onClick={() => removeEjercicio(e.id)}
                  type="button"
                >
                  Quitar
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 10
        }}
      >
        {initialData && (
          <button
            type="button"
            onClick={handleCancel}
            style={{ padding: "8px 16px", fontSize: 16 }}
          >
            Cancelar edición
          </button>
        )}

        <button
          type="submit"
          name="submit-btn"
          style={{ padding: "8px 16px", fontSize: 16 }}
        >
          {initialData ? "Guardar Cambios" : "Crear Sesión"}
        </button>
      </div>
    </form>
  );
}
