"use client";

import PromptForm from "@/components/PromptForm";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import "@blocksuite/presets/themes/affine.css";

const BlockSuiteEditor = dynamic(
  () => import("../components/BlockSuiteEditor"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [emailContent, setEmailContent] = useState("");
  const { data: session } = useSession();

  const handleContentChange = (newContent: string) => {
    console.log("Content changed:", newContent);
  };

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
            <BlockSuiteEditor
              content={emailContent}
              onChange={handleContentChange}
            />
          </div>
          <PromptForm onGenerate={setEmailContent} />
        </>
      )}
    </main>
  );
}
