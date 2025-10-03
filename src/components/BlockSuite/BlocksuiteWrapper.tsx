"use client";

import dynamic from "next/dynamic";

const BlockSuiteEditor = dynamic(() => import("./BlockSuiteEditor"), {
  ssr: false,
});

interface BlockSuiteWrapperProps {
  emailContent: string;
}

export default function BlockSuiteWrapper({
  emailContent,
}: BlockSuiteWrapperProps) {
  const handleContentChange = (newContent: string) => {
    console.log("Changes in block suite.. ", newContent);
  };

  return (
    <BlockSuiteEditor content={emailContent} onChange={handleContentChange} />
  );
}
