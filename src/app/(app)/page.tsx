"use client";

import { useState } from "react";
import PromptForm from "@/components/PromptForm";
import BlockSuiteWrapper from "@/components/BlockSuite/BlocksuiteWrapper";

export default function Home() {
  const [emailContent, setEmailContent] = useState("");

  return (
    <main className="h-full flex flex-col lg:w-2xl w-md mx-auto  p-2 md:p-4">
      <div className="flex-grow pb-4">
        <BlockSuiteWrapper emailContent={emailContent} />
      </div>
      <PromptForm onGenerate={setEmailContent} />
    </main>
  );
}
