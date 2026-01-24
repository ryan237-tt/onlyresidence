"use client";

import { useState } from "react";

export default function ResetPasswordPage({ searchParams }: any) {
  const token = searchParams.token;
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  async function submit() {
    await fetch("/api/admin/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    setDone(true);
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto mt-32 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Password updated
        </h2>
        <p>You can now log in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-32">
      <h1 className="text-2xl font-semibold mb-4">
        Reset password
      </h1>

      <input
        type="password"
        placeholder="New password"
        className="w-full border p-3 rounded mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-black text-white py-3 rounded"
      >
        Reset password
      </button>
    </div>
  );
}
