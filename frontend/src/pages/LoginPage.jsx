import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { studentLogin } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthHeader from "../components/AuthHeader";

const labelClasses = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.06em] text-ink-secondary";

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
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-4">
      <AuthHeader />
      <div className="w-full max-w-[420px] animate-fade-up rounded-[32px] border border-border bg-white p-10 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)]">
        <h1 className="text-center text-h1 font-bold tracking-[-0.02em] text-ink-primary">CampusCart</h1>
        <p className="mt-2 mb-6 text-center text-ink-secondary">Sign in to your account</p>

        {error && (
          <p role="alert" className="mb-4 rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="login-email" className={labelClasses}>
              College email
            </label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="login-password" className={labelClasses}>
              Password
            </label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="mt-2 h-11 w-full">
            {loading ? "Signing in..." : "Login"}
          </Button>
          <p className="mt-2 text-center text-sm text-ink-secondary">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-ink-primary underline underline-offset-4">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
