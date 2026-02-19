import { useState, useEffect } from "react";

export default function UsuarioForm({
  initialData = {},
  onSubmit,
  isEdit = false,
  onCancel
}) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("cliente");
  const [error, setError] = useState(null);

  useEffect(() => {
    setNombre(initialData?.nombre || "");
    setEmail(initialData?.email || "");
    setRol(initialData?.rol || "cliente");
    setPassword("");
  }, [initialData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const data = {
        nombre,
        email,
        rol
      };

      if (password.trim() !== "") {
        data.password = password;
      }

      await onSubmit(data);
      setPassword("");
    } catch (err) {
      setError(err.message || "Error enviando formulario");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>
        {isEdit ? "Editar Usuario" : "Crear Usuario"}
      </h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.grid}>
        <div style={styles.field}>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label>
            {isEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={!isEdit}
            minLength={6}
          />
        </div>

        <div style={styles.field}>
          <label>Rol</label>
          <select
            value={rol}
            onChange={e => setRol(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="entrenador">Entrenador</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
      </div>

      <div style={styles.actions}>
        <button type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            style={{ marginLeft: 10 }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: "#f4f6f8",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    maxWidth: 700
  },
  title: {
    marginBottom: 15
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 15
  },
  field: {
    display: "flex",
    flexDirection: "column"
  },
  actions: {
    marginTop: 20
  },
  error: {
    color: "red",
    marginBottom: 10
  }
};
