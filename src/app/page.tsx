"use client";

import PromptForm from "@/components/PromptForm";
import EmailCanvas from "@/components/EmailCanvas";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const [emailContent, setEmailContent] = useState("");
  const { data: session } = useSession();

  return (
    <main className="h-full flex flex-col w-xl">
      {!session ? (
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sign in with GitHub
        </button>
      ) : (
        <>
          <div className="flex-grow py-4">
            <EmailCanvas content={emailContent} />
          </div>
          <PromptForm onGenerate={setEmailContent} />
        </>
      )}
    </main>
  );
}
