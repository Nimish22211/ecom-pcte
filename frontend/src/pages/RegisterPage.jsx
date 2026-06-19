import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getColleges, studentRegister } from "../services/api";

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
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-700 text-center">
            CampusCart
          </h1>
          <p className="text-center text-slate-500 mt-2 mb-6">
            Create your student account
          </p>
          {error && (
            <p className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">
              {error}
            </p>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Enter your full name"
                className="border rounded-lg px-4 py-2 bg-slate-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Enter university roll number"
                className="border rounded-lg px-4 py-2 bg-slate-50"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>
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
                placeholder="Enter your password"
                className="border rounded-lg px-4 py-2 bg-slate-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <select
              className="border rounded-lg px-4 py-2 bg-slate-50"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              required
            >
              <option value="">Select College</option>
              {colleges.map((college) => (
                <option key={college._id} value={college._id}>
                  {college.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
            <p className="text-center mt-4">
              Already have an account?
              <Link to="/login" className="text-blue-700 font-medium ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
