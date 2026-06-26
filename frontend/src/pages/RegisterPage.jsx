import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getColleges, studentRegister } from "../services/api";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthHeader from "../components/AuthHeader";

const labelClasses = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.06em] text-ink-secondary";
const selectClasses =
  "h-11 w-full rounded-[20px] border border-border bg-white px-5 text-sm text-ink-primary outline-none shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 focus:border-ink-primary focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)]";

function RegisterPage() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getColleges()
      .then(({ data }) => setColleges(data))
      .catch(() => setError("Could not load colleges. Please refresh."));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!collegeId) return setError("Please select your college");
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseToken = await credential.user.getIdToken();
      await studentRegister({ firebaseToken, name, rollNumber, collegeId });
      navigate("/pending");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-4 py-10">
      <AuthHeader />
      <div className="w-full max-w-[420px] animate-fade-up rounded-[32px] border border-border bg-white p-10 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)]">
        <h1 className="text-center text-h1 font-bold tracking-[-0.02em] text-ink-primary">CampusCart</h1>
        <p className="mt-2 mb-6 text-center text-ink-secondary">Create your student account</p>

        {error && (
          <p role="alert" className="mb-4 rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="reg-name" className={labelClasses}>
              Full name
            </label>
            <Input
              id="reg-name"
              type="text"
              autoComplete="name"
              placeholder="Jordan Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reg-roll" className={labelClasses}>
              University roll number
            </label>
            <Input
              id="reg-roll"
              type="text"
              placeholder="e.g. 21CS1042"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reg-email" className={labelClasses}>
              College email
            </label>
            <Input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reg-password" className={labelClasses}>
              Password
            </label>
            <Input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="reg-college" className={labelClasses}>
              College
            </label>
            <select
              id="reg-college"
              className={selectClasses}
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              required
            >
              <option value="">Select your college</option>
              {colleges.map((college) => (
                <option key={college._id} value={college._id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={loading} className="mt-2 h-11 w-full">
            {loading ? "Creating account..." : "Register"}
          </Button>
          <p className="mt-2 text-center text-sm text-ink-secondary">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-ink-primary underline underline-offset-4">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
