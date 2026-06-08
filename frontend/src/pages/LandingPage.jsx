import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-slate-100">
            <h1 className="text-6xl font-bold text-blue-700 mb-4">
                CampusCart
            </h1>

            <p className="text-slate-600 text-lg mb-8">
                Buy & sell within your campus
            </p>

            <div className="flex gap-4 mb-6">
                <Link
                    to="/login"
                    className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50"
                >
                    Register
                </Link>
            </div>

            <Link
                to="/admin/login"
                className="text-sm text-slate-500 hover:text-blue-700"
            >
                Dean Login →
            </Link>
        </div>
    );
}

export default LandingPage;