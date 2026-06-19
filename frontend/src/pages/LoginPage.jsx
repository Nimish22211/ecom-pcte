import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your college E-mail ID "
                className="border rounded-lg px-4 py-2 bg-slate-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Enter your password "
                className="border rounded-lg px-4 py-2 bg-slate-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
            >
              Login
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
