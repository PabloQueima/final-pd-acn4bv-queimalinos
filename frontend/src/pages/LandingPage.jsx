import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div
        style={{
          background: "url('/src/images/fondo.png') center/cover fixed",
          height: "50vh",
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
            onClick={() => navigate("/login")}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#05A3CB",
              border: "none",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            Ingresar
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#15114D",
              border: "none",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Registrarse
          </button>
        </div>
      </div>

      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          backgroundColor: "#f5f5f5"
        }}
      >
        <h2 style={{ marginBottom: "2rem", color: "#0C3264" }}>
          ¿Qué puedes hacer?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap"
          }}
        >
          <div style={{ maxWidth: "440px" }}>
            <img
              src="/src/images/ejercicios.png"
              alt="Ejercicios"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "1rem"
              }}
            />
            <h3 style={{ color: "#15114D" }}>Ejercicios</h3>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>
              Explora y gestiona todos los ejercicios disponibles para tus clases.
            </p>
          </div>

          <div style={{ maxWidth: "440px" }}>
            <img
              src="/src/images/sesiones.png"
              alt="Sesiones"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "1rem"
              }}
            />
            <h3 style={{ color: "#15114D" }}>Sesiones</h3>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>
              Crea y organiza tus sesiones de entrenamiento de manera rápida.
            </p>
          </div>

          <div style={{ maxWidth: "440px" }}>
            <img
              src="/src/images/usuarios.jpg"
              alt="Usuarios"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "1rem"
              }}
            />
            <h3 style={{ color: "#15114D" }}>Usuarios</h3>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>
              Administra clientes, entrenadores y todo tu equipo en un solo lugar.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "3rem 1rem",
          backgroundColor: "#0C3264",
          color: "white"
        }}
      >
        <h2>Comienza hoy</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Regístrate y lleva tu entrenamiento al siguiente nivel.
        </p>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#05A3CB",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
