import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { getMyCollege, createCollege } from "../../services/api";

const DeanDashboardPage = () => {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    getMyCollege()
      .then(({ data }) => setCollege(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load college"))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateCollege = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { data } = await createCollege({ name, emailDomain, city });
      setCollege(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create college");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar type="dean" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900">Dean Dashboard</h1>

        {loading && (
          <div className="mt-6 flex items-center gap-3 text-slate-500">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"
              aria-hidden="true"
            />
            Loading...
          </div>
        )}

        {!loading && error && !college && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && college && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold text-slate-900">{college.name}</h2>
            <p className="mt-1 text-slate-500">{college.city}</p>
            <p className="mt-2 font-mono text-primary-700">{college.emailDomain}</p>
          </div>
        )}

        {!loading && !college && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="mb-1 text-xl font-semibold text-slate-900">
              Create your college profile
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              You can only create one college profile, and it cannot be changed afterward.
            </p>
            {error && (
              <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            <form className="flex flex-col gap-4" onSubmit={handleCreateCollege} noValidate>
              <div>
                <label htmlFor="college-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  College name
                </label>
                <input
                  id="college-name"
                  type="text"
                  placeholder="e.g. MIT College of Engineering"
                  className={inputClasses}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="college-domain" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email domain
                </label>
                <input
                  id="college-domain"
                  type="text"
                  placeholder="e.g. @mitcollege.edu.in"
                  className={inputClasses}
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="college-city" className="mb-1.5 block text-sm font-medium text-slate-700">
                  City
                </label>
                <input
                  id="college-city"
                  type="text"
                  placeholder="e.g. Pune"
                  className={inputClasses}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-lg bg-primary-700 py-2.5 font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating..." : "Create College"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeanDashboardPage;
