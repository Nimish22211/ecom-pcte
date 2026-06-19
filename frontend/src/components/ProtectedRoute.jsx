import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to={role === "dean" ? "/admin/login" : "/login"} replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  if (role === "student" && user.status !== "verified") return <Navigate to="/pending" replace />;

  return children;
}

export default ProtectedRoute;
