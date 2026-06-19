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

  return (
    <>
      <Navbar type="dean" />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Dean Dashboard</h1>

        {loading && <p className="text-slate-500">Loading...</p>}

        {!loading && error && !college && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        {!loading && college && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{college.name}</h2>
            <p className="text-slate-500 mt-1">{college.city}</p>
            <p className="text-blue-700 font-mono mt-2">{college.emailDomain}</p>
          </div>
        )}

        {!loading && !college && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Create your college profile</h2>
            <p className="text-slate-500 mb-4">
              You can only create one college profile, and it cannot be changed afterward.
            </p>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form className="flex flex-col gap-4" onSubmit={handleCreateCollege}>
              <input
                type="text"
                placeholder="College name"
                className="border rounded-lg px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Email domain (e.g. @mitcollege.edu.in)"
                className="border rounded-lg px-4 py-2"
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="City"
                className="border rounded-lg px-4 py-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 disabled:opacity-60"
              >
                {submitting ? "Creating..." : "Create College"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default DeanDashboardPage;
