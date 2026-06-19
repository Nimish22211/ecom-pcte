import React from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PendingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 to-slate-100">
        <FaClock className="text-yellow-500 text-6xl mb-4" />
        <h1 className="text-4xl font-bold text-blue-700 text-center">
          Approval Pending
        </h1>
        <p className="text-slate-700 font-serif mt-2 text-center max-w-md">
          {" "}
          Your registration request has been submitted successfully. Please wait
          until the dean approves your account.
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {" "}
          Logout
        </button>
      </div>
    </>
  );
}
export default PendingPage;
