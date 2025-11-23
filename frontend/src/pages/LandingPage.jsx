export default function LandingPage() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Hero Section */}
      <div
        style={{
          background: "url('/src/images/fondo.png') center/cover fixed",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.9)",
            padding: "2rem 3rem",
            borderRadius: "12px",
            textAlign: "center",
            maxWidth: "400px"
          }}
        >
          <img
            src="/src/images/logo.png"
            alt="Logo"
            style={{ width: "120px", marginBottom: "1rem" }}
          />
          <h1 style={{ marginBottom: "1.5rem", color: "#0C3264" }}>
            Plataforma de Entrenamiento
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "#15114D" }}>
            Gestiona tus entrenamientos, clases y ejercicios de manera simple y eficiente.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#05A3CB",
              border: "none",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Ingresar
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "4rem 2rem", textAlign: "center", backgroundColor: "#f5f5f5" }}>
        <h2 style={{ marginBottom: "2rem", color: "#0C3264" }}>¿Qué puedes hacer?</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ maxWidth: "220px" }}>
            <img
              src="/src/images/ejercicios.png"
              alt="Ejercicios"
              style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
            />
            <h3 style={{ color: "#15114D", marginBottom: "0.5rem" }}>Ejercicios</h3>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>
              Explora y gestiona todos los ejercicios disponibles para tus clases.
            </p>
          </div>

          <div style={{ maxWidth: "220px" }}>
            <img
              src="/src/images/sesiones.png"
              alt="Sesiones"
              style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
            />
            <h3 style={{ color: "#15114D", marginBottom: "0.5rem" }}>Sesiones</h3>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>
              Crea y organiza tus sesiones de entrenamiento de manera rápida.
            </p>
          </div>

          <div style={{ maxWidth: "220px" }}>
            <img
              src="/src/images/usuarios.png"
              alt="Usuarios"
              style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
            />
            <h3 style={{ color: "#15114D", marginBottom: "0.5rem" }}>Usuarios</h3>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>
              Administra clientes, entrenadores y todo tu equipo en un solo lugar.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ textAlign: "center", padding: "3rem 1rem", backgroundColor: "#0C3264", color: "white" }}>
        <h2 style={{ marginBottom: "1rem" }}>Comienza hoy</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Regístrate y lleva tu entrenamiento al siguiente nivel.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#05A3CB",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
