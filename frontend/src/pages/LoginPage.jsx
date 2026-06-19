import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { studentLogin } from "../services/api";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await credential.user.getIdToken();
      const { data } = await studentLogin(firebaseToken);
      login(data.user, data.token);
      navigate(data.user.status === "verified" ? "/student" : "/pending");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-700 text-center">
            CampusCart
          </h1>
          <p className="text-center text-slate-500 mt-2 mb-6">
            Sign in to your account
          </p>
          {error && (
            <p className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">
              {error}
            </p>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your college E-mail ID "
                className="border rounded-lg px-4 py-2 bg-slate-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Enter your password "
                className="border rounded-lg px-4 py-2 bg-slate-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
            <p className="text-center mt-4">
              Don't have an account?
              <Link to="/register" className="text-blue-700 font-medium ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
