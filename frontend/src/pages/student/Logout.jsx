import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout().then(() => navigate("/"));
  }, []);

  return <div className="p-8 text-center text-slate-500">Logging out...</div>;
};

export default Logout;
