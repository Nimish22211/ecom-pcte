import { useState } from "react";

function DeanLoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [deanEmail, setdeanEmail] = useState("");
  const [deanPassword, setdeanPassword] = useState("");
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              className="border rounded-lg bg-slate-50 py-2 px-4 "
              placeholder="Enter your E-mail"
              value={deanEmail}
              onChange={(e) => setdeanEmail(e.target.value)}
            />
            <input
              type="password"
              className="border rounded-lg bg-slate-50 py-2 px-4 "
              placeholder="Enter your password"
              value={deanPassword}
              onChange={(e) => setdeanPassword(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeanLoginPage;
