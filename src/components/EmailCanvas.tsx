"use client";

interface EmailCanvasProps {
  content: string;
}

export default function EmailCanvas({ content }: EmailCanvasProps) {
  return (
    <div className="p-4 bg-white h-full rounded-lg shadow min-h-[200px]">
      {content ? (
        <p className="whitespace-pre-wrap">{content}</p>
      ) : (
        <p className="text-gray-400">Generated email will appear here...</p>
      )}
    </div>
  );
}
