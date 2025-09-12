import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/turista" replace />;
  }

  const tokenAdmin = localStorage.getItem("token_admin");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
