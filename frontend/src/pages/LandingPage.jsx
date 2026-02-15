import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "sans-serif", margin: 0 }}>
      {/* HERO */}
      <div
        style={{
          background: "url('/src/images/fondo.png') center/cover fixed",
          height: "33vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            padding: "1.1rem 1.6rem",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "340px"
          }}
        >
          <img
            src="/src/images/logo.png"
            alt="Logo"
            style={{ width: "85px", marginBottom: "0.5rem" }}
          />

          <h1
            style={{
              marginBottom: "0.7rem",
              color: "#0C3264",
              fontSize: "1.4rem"
            }}
          >
            Plataforma de Entrenamiento
          </h1>

          <p
            style={{
              marginBottom: "0.9rem",
              color: "#15114D",
              fontSize: "0.85rem"
            }}
          >
            Gestiona tus entrenamientos, clases y ejercicios de manera simple y eficiente.
          </p>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "0.45rem 0.9rem",
              backgroundColor: "#05A3CB",
              border: "none",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "6px"
            }}
          >
            Ingresar
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "0.45rem 0.9rem",
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

      {/* FEATURES */}
      <div
        style={{
          padding: "1.5rem 1.2rem",
          textAlign: "center",
          backgroundColor: "#f5f5f5"
        }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            color: "#0C3264",
            fontSize: "1.4rem"
          }}
        >
          ¿Qué puedes hacer?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.8rem",
            flexWrap: "wrap",
            maxWidth: "1100px",
            margin: "0 auto"
          }}
        >
          {[
            {
              img: "ejercicios.png",
              title: "Ejercicios",
              text: "Explora y gestiona todos los ejercicios disponibles para tus clases."
            },
            {
              img: "sesiones.png",
              title: "Sesiones",
              text: "Crea y organiza tus sesiones de entrenamiento de manera rápida."
            },
            {
              img: "usuarios.jpg",
              title: "Usuarios",
              text: "Administra clientes, entrenadores y todo tu equipo en un solo lugar."
            }
          ].map((item, i) => (
            <div key={i} style={{ maxWidth: "320px" }}>
              <img
                src={`/src/images/${item.img}`}
                alt={item.title}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "0.6rem"
                }}
              />
              <h3
                style={{
                  color: "#15114D",
                  marginBottom: "0.4rem",
                  fontSize: "1.05rem"
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#333" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA / FOOTER */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem 1rem",
          backgroundColor: "#0C3264",
          color: "white"
        }}
      >
        <h2 style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>
          Comienza hoy
        </h2>

        <p style={{ marginBottom: "0.6rem", fontSize: "0.85rem" }}>
          Regístrate y lleva tu entrenamiento al siguiente nivel.
        </p>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "0.45rem 0.9rem",
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
