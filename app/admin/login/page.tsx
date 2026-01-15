"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      setLoading(false);
      setError("Invalid token");
      return;
    }

    window.location.href = "/admin/bookings";
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm border rounded-2xl p-6">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter your admin token to access bookings.
        </p>

        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mt-5 w-full border rounded-xl px-4 py-3"
          placeholder="ADMIN_TOKEN"
        />

        {error && (
          <div className="mt-3 text-sm text-red-600">{error}</div>
        )}

        <button
          onClick={submit}
          disabled={loading || !token.trim()}
          className="mt-5 w-full rounded-xl px-4 py-3 bg-black text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </main>
  );
}
