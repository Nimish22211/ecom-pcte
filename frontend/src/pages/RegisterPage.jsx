import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function RegisterPage() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/pending");
  };

  return (
    <>
      <Navbar type ="guest"/>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-700 text-center">
            CampusCart
          </h1>
          <p className="text-center text-slate-500 mt-2 mb-6">
            Create your student account
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Enter your full name"
                className="border rounded-lg px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Enter university roll number"
                className="border rounded-lg px-4 py-2"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your college E-mail ID "
                className="border rounded-lg px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Enter your password"
                className="border rounded-lg px-4 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <select
              className="border rounded-lg px-4 py-2"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            >
              <option>Select College</option>
              <option>PCTE</option>
              <option>MIT</option>
            </select>
            <button
              type="submit"
              className="mt-2 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
            >
              Register
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
