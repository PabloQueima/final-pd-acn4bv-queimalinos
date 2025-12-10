export default function Footer() {
  return (
    <footer
      style={{
        background: "#0C3264",
        color: "white",
        padding: "15px",
        textAlign: "center",
        marginTop: "40px",
        fontSize: "0.9rem",
      }}
    >
      Plataforma de Entrenamiento — Proyecto Final PD — Pablo Queimaliños © {new Date().getFullYear()}
    </footer>
  );
}
