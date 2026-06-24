import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PendingPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-slate-50 px-4 text-center">
      <div className="animate-fade-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
          <svg
            className="h-8 w-8 text-accent-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="mt-5 text-3xl font-bold text-primary-800">Approval Pending</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Your registration request has been submitted successfully. Please wait
          until the dean approves your account.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-lg bg-primary-700 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default PendingPage;
