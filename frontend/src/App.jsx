import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import UsuariosPage from "./pages/UsuariosPage";
import EjerciciosPage from "./pages/EjerciciosPage";
import SesionesPage from "./pages/SesionesPage";
import MisSesionesPage from "./pages/MisSesionesPage";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div>
      <NavBar />

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <UsuariosPage />
            </PrivateRoute>
          }
        />

        {/* ENTRENADOR */}
        <Route
          path="/entrenador"
          element={
            <PrivateRoute roles={["entrenador"]}>
              <SesionesPage />
            </PrivateRoute>
          }
        />

        {/* CLIENTE */}
        <Route
          path="/cliente"
          element={
            <PrivateRoute roles={["cliente"]}>
              <MisSesionesPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
