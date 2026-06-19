import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { deanLogin } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function DeanLoginPage() {
  const [deanEmail, setdeanEmail] = useState("");
  const [deanPassword, setdeanPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, deanEmail, deanPassword);
      const firebaseToken = await credential.user.getIdToken();
      const { data } = await deanLogin(firebaseToken);
      login(data.user, data.token);
      navigate("/admin/dashboard");
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
      <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-200 to-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-700 text-center">
            CampusCart
          </h1>
          <p className="text-center text-slate-500 mt-2 mb-6">
            Dean/Admin Login
          </p>
          {error && (
            <p className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              className="border rounded-lg bg-slate-50 py-2 px-4 "
              placeholder="Enter your E-mail"
              value={deanEmail}
              onChange={(e) => setdeanEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="border rounded-lg bg-slate-50 py-2 px-4 "
              placeholder="Enter your password"
              value={deanPassword}
              onChange={(e) => setdeanPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeanLoginPage;
