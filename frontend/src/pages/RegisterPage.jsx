import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getColleges, studentRegister } from "../services/api";

const inputClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30";
const labelClasses = "mb-1.5 block text-sm font-medium text-slate-700";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-slate-50 px-4 py-10">
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
        <h1 className="text-center text-3xl font-bold text-primary-800">CampusCart</h1>
        <p className="mt-2 mb-6 text-center text-slate-500">Create your student account</p>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="reg-name" className={labelClasses}>
              Full name
            </label>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              placeholder="Jordan Smith"
              className={inputClasses}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reg-roll" className={labelClasses}>
              University roll number
            </label>
            <input
              id="reg-roll"
              type="text"
              placeholder="e.g. 21CS1042"
              className={inputClasses}
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reg-email" className={labelClasses}>
              College email
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu.in"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reg-password" className={labelClasses}>
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              className={inputClasses}
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
              className={inputClasses}
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
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-primary-700 py-2.5 font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
          <p className="mt-2 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary-700 hover:text-primary-800">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
