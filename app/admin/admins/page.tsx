"use client";

import { useEffect, useState } from "react";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/admin/admins");
    const data = await res.json();
    setAdmins(data.admins);
  }

  async function remove(id: string) {
    await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Admins</h1>

      {admins.map((a) => (
        <div
          key={a.id}
          className="flex justify-between items-center border p-3 rounded mb-2"
        >
          <span>{a.email}</span>
          <button
            onClick={() => remove(a.id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
