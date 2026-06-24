import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { getUnverifiedStudents, getAllStudents, approveStudent } from "../../services/api";

const StudentTablePage = () => {
  const [unverified, setUnverified] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = () => {
    setLoading(true);
    Promise.all([getUnverifiedStudents(), getAllStudents()])
      .then(([unverifiedRes, allRes]) => {
        setUnverified(unverifiedRes.data);
        setAllStudents(allRes.data);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load students"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveStudent(id);
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve student");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar type="dean" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900">Students</h1>

        {loading && (
          <div className="mt-6 flex items-center gap-3 text-slate-500">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"
              aria-hidden="true"
            />
            Loading...
          </div>
        )}
        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && (
          <>
            <div className="mt-6 mb-10">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">
                Pending Approval ({unverified.length})
              </h2>
              {unverified.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-slate-500">
                  No students awaiting approval.
                </p>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-sm text-slate-500">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-medium">Name</th>
                        <th scope="col" className="px-4 py-3 font-medium">Email</th>
                        <th scope="col" className="px-4 py-3 font-medium">Roll No.</th>
                        <th scope="col" className="px-4 py-3 font-medium">Registered</th>
                        <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {unverified.map((student) => (
                        <tr key={student._id} className="border-t border-slate-100 transition-colors hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">{student.name}</td>
                          <td className="px-4 py-3 text-slate-600">{student.email}</td>
                          <td className="px-4 py-3 text-slate-600">{student.rollNumber}</td>
                          <td className="px-4 py-3 text-slate-600">
                            {new Date(student.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleApprove(student._id)}
                              className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">
                All Students ({allStudents.length})
              </h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-sm text-slate-500">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">Name</th>
                      <th scope="col" className="px-4 py-3 font-medium">Email</th>
                      <th scope="col" className="px-4 py-3 font-medium">Roll No.</th>
                      <th scope="col" className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudents.map((student) => (
                      <tr key={student._id} className="border-t border-slate-100 transition-colors hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-900">{student.name}</td>
                        <td className="px-4 py-3 text-slate-600">{student.email}</td>
                        <td className="px-4 py-3 text-slate-600">{student.rollNumber}</td>
                        <td className="px-4 py-3">
                          <span
                            className={
                              student.status === "verified"
                                ? "rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700"
                                : "rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700"
                            }
                          >
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentTablePage;
