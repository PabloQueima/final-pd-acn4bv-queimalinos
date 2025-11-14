import { useEffect, useState } from "react";
import { getEjercicios, createEjercicio } from "./services/api";
import EjerciciosList from "./components/EjerciciosList";
import EjercicioForm from "./components/EjercicioForm";

export default function App() {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    loadEjercicios();
  }, []);

  async function loadEjercicios() {
    const data = await getEjercicios();
    setEjercicios(data);
  }

  async function agregarEjercicio(nuevo) {
    await createEjercicio(nuevo);
    await loadEjercicios();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Plataforma de Entrenamiento</h1>

      <EjercicioForm onSubmit={agregarEjercicio} />

      <EjerciciosList ejercicios={ejercicios} />
    </div>
  );
}
