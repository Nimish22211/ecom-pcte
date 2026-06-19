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
    <>
      <Navbar type="dean" />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Students</h1>

        {loading && <p className="text-slate-500">Loading...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {!loading && (
          <>
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">
                Pending Approval ({unverified.length})
              </h2>
              {unverified.length === 0 ? (
                <p className="text-slate-500">No students awaiting approval.</p>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Roll No.</th>
                        <th className="px-4 py-3">Registered</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {unverified.map((student) => (
                        <tr key={student._id} className="border-t border-slate-100">
                          <td className="px-4 py-3">{student.name}</td>
                          <td className="px-4 py-3">{student.email}</td>
                          <td className="px-4 py-3">{student.rollNumber}</td>
                          <td className="px-4 py-3">
                            {new Date(student.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleApprove(student._id)}
                              className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700"
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
              <h2 className="text-xl font-semibold mb-4">
                All Students ({allStudents.length})
              </h2>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-sm">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Roll No.</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudents.map((student) => (
                      <tr key={student._id} className="border-t border-slate-100">
                        <td className="px-4 py-3">{student.name}</td>
                        <td className="px-4 py-3">{student.email}</td>
                        <td className="px-4 py-3">{student.rollNumber}</td>
                        <td className="px-4 py-3">
                          <span
                            className={
                              student.status === "verified"
                                ? "bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs font-semibold"
                                : "bg-amber-100 text-amber-700 rounded-full px-2 py-1 text-xs font-semibold"
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
    </>
  );
};

export default StudentTablePage;
