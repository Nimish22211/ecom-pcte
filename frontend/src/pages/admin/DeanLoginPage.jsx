import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { deanLogin } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const inputClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30";
const labelClasses = "mb-1.5 block text-sm font-medium text-slate-700";

function DeanLoginPage() {
  const [deanEmail, setDeanEmail] = useState("");
  const [deanPassword, setDeanPassword] = useState("");
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-slate-50 px-4">
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
        <h1 className="text-center text-3xl font-bold text-primary-800">CampusCart</h1>
        <p className="mt-2 mb-6 text-center text-slate-500">Dean / Admin login</p>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="dean-email" className={labelClasses}>
              Email
            </label>
            <input
              id="dean-email"
              type="email"
              autoComplete="email"
              placeholder="dean@college.edu.in"
              className={inputClasses}
              value={deanEmail}
              onChange={(e) => setDeanEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="dean-password" className={labelClasses}>
              Password
            </label>
            <input
              id="dean-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputClasses}
              value={deanPassword}
              onChange={(e) => setDeanPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-primary-700 py-2.5 font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeanLoginPage;
