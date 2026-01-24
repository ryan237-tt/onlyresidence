"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from "react";

function SetPasswordContent() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email");

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit() {
    setError(null);

    const res = await fetch("/api/admin/password/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data?.error ?? "Failed");
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/admin/login"), 1500);
  }

  if (!email) {
    return (
      <div className="text-center mt-32 text-red-600">
        Missing admin email
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-32 p-6 border rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">
        Create admin password
      </h1>

      {done ? (
        <p className="text-green-600">
          Password created. Redirecting to login…
        </p>
      ) : (
        <>
          <input
            type="password"
            className="w-full border p-3 rounded mb-4"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="text-sm text-red-600 mb-3">
              {error}
            </div>
          )}

          <button
            onClick={submit}
            className="w-full bg-black text-white py-3 rounded"
          >
            Set password
          </button>
        </>
      )}
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordContent />
    </Suspense>
  );
}
