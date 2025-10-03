"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import PromptForm from "@/components/PromptForm";
import BlockSuiteWrapper from "@/components/BlockSuite/BlocksuiteWrapper";

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
            <BlockSuiteWrapper emailContent={emailContent} />
          </div>
          <PromptForm onGenerate={setEmailContent} />
        </>
      )}
    </main>
  );
}
