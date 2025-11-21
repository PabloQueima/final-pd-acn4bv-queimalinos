import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

export default function PrivateRoute({ children, roles }) {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
