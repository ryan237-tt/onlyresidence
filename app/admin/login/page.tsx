// app/admin/login/page.tsx
"use client";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // 🔴 CAS CRITIQUE : mot de passe pas encore créé
      if (res.status === 403 && data?.code === "PASSWORD_NOT_SET") {
        window.location.href = `/admin/set-password?email=${encodeURIComponent(email)}`;
        return;
      }

      if (!res.ok) {
        setError(data?.error ?? "Login failed");
        return;
      }

      // ✅ Login OK
      window.location.href = "/admin/bookings";

    } catch (e) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }



  return (
    <main className="min-h-screen bg-white p-6 flex items-center justify-center">
      <div className="w-full max-w-md border rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Admin login</h1>

        <div className="mt-6 space-y-3">
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
              {error}
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full rounded-xl bg-black text-white font-semibold px-4 py-3 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* A faire plus tard */}

          {/* <Link
            href="/admin/forgot-password"
            className="text-sm text-gray-500 underline"
          >
            Forgot password?
          </Link> */}

                      {email && (
              <Link
                href={`/admin/set-password?email=${encodeURIComponent(email)}`}
                className="text-sm text-gray-500 hover:underline"
              >
                Set password (first login)
              </Link>
            )}

          <Link
            href="/admin/settings/password"
            className="text-sm text-gray-500 hover:underline"
          >
            Change password
          </Link>


        </div>
      </div>
    </main>
  );
}
