import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { deanLogin } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthHeader from "../../components/AuthHeader";

const labelClasses = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.06em] text-ink-secondary";

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
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-4">
      <AuthHeader />
      <div className="w-full max-w-[420px] animate-fade-up rounded-[32px] border border-border bg-white p-10 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)]">
        <h1 className="text-center text-h1 font-bold tracking-[-0.02em] text-ink-primary">CampusCart</h1>
        <p className="mt-2 mb-6 text-center text-ink-secondary">Dean / Admin login</p>

        {error && (
          <p role="alert" className="mb-4 rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="dean-email" className={labelClasses}>
              Email
            </label>
            <Input
              id="dean-email"
              type="email"
              autoComplete="email"
              placeholder="dean@college.edu.in"
              value={deanEmail}
              onChange={(e) => setDeanEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="dean-password" className={labelClasses}>
              Password
            </label>
            <Input
              id="dean-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={deanPassword}
              onChange={(e) => setDeanPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="mt-2 h-11 w-full">
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default DeanLoginPage;
