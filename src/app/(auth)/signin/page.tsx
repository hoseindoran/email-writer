"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
