import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-xl font-semibold text-primary-700">
            {user?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{user?.name || "Student"}</h1>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Roll number</dt>
            <dd className="mt-1 font-medium text-slate-900">{user?.rollNumber || "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Status</dt>
            <dd className="mt-1">
              <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                {user?.status || "verified"}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
