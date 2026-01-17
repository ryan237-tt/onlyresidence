// app/admin/users/page.tsx
"use client";

import { useEffect, useState } from "react";

type AdminUser = {
  id: string;
  email: string;
  is_super: boolean;
  created_at: string;
};

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setMsg(null);
    setErr(null);

    const res = await fetch("/api/admin/users", { cache: "no-store" });
    const data = await res.json();

    if (!res.ok) {
      setErr(data?.error ?? "Unauthorized");
      setLoading(false);
      return;
    }

    setAdmins(data.admins ?? []);
    setLoading(false);
  }

  async function addAdmin() {
    setMsg(null);
    setErr(null);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErr(data?.error ?? "Failed");
      return;
    }

    setEmail("");
    setPassword("");
    setMsg("Admin created ✅");
    await load();
  }

  async function deleteAdmin(id: string) {
    setMsg(null);
    setErr(null);

    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      setErr(data?.error ?? "Failed");
      return;
    }

    setMsg("Admin deleted ✅");
    await load();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admins</h1>
          <button onClick={logout} className="px-4 py-2 rounded-xl bg-gray-100">
            Logout
          </button>
        </div>

        <div className="border rounded-2xl p-5">
          <h2 className="font-semibold">Create new admin</h2>
          <p className="text-sm text-gray-600 mt-1">
            Only super-admin can access this page.
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Password (min 10)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={addAdmin}
            className="mt-4 px-5 py-3 rounded-xl bg-black text-white font-semibold"
          >
            Add admin
          </button>

          {msg && <div className="mt-3 text-sm text-green-700">{msg}</div>}
          {err && <div className="mt-3 text-sm text-red-700">{err}</div>}
        </div>

        <div className="border rounded-2xl overflow-hidden">
          <div className="p-4 bg-gray-50 font-semibold">Admin list</div>

          {loading ? (
            <div className="p-6 text-sm text-gray-600">Loading...</div>
          ) : (
            <ul className="divide-y">
              {admins.map((a) => (
                <li key={a.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.email}</div>
                    <div className="text-xs text-gray-500">
                      {a.is_super ? "SUPER ADMIN" : "ADMIN"}
                    </div>
                  </div>

                  {!a.is_super && (
                    <button
                      onClick={() => deleteAdmin(a.id)}
                      className="px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}

              {admins.length === 0 && (
                <li className="p-6 text-sm text-gray-600">No admins.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
