"use client";

import { useEffect, useRef } from "react";
import { AffineEditorContainer } from "@blocksuite/presets";
import { DocCollection, Schema } from "@blocksuite/store";
import { AffineSchemas } from "@blocksuite/blocks";

interface BlockSuiteEditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

function stripCodeBlock(content: string): string {
  // Remove ```html and ``` markers
  return content
    .replace(/^```html\n?/i, "")
    .replace(/\n?```$/, "")
    .trim();
}

interface BlockData {
  type: string;
  text: string;
  props?: any;
}

function parseHTMLToBlocks(html: string): BlockData[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: BlockData[] = [];

  const body = doc.body;

  const processNode = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      let text = "";

      const getTextContent = (el: Element): string => {
        let result = "";
        el.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            result += child.textContent || "";
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const childEl = child as Element;
            const childTag = childEl.tagName.toLowerCase();

            if (
              ["strong", "b", "em", "i", "u", "span", "a"].includes(childTag)
            ) {
              result += childEl.textContent || "";
            } else {
              result += getTextContent(childEl);
            }
          }
        });
        return result;
      };

      text = getTextContent(element).trim();

      if (!text) return;

      switch (tagName) {
        case "h1":
          blocks.push({
            type: "affine:paragraph",
            text,
            props: { type: "h1" },
          });
          break;
        case "h2":
          blocks.push({
            type: "affine:paragraph",
            text,
            props: { type: "h2" },
          });
          break;
        case "h3":
          blocks.push({
            type: "affine:paragraph",
            text,
            props: { type: "h3" },
          });
          break;
        case "h4":
          blocks.push({
            type: "affine:paragraph",
            text,
            props: { type: "h4" },
          });
          break;
        case "h5":
          blocks.push({
            type: "affine:paragraph",
            text,
            props: { type: "h5" },
          });
          break;
        case "h6":
          blocks.push({
            type: "affine:paragraph",
            text,
            props: { type: "h6" },
          });
          break;
        case "p":
          blocks.push({
            type: "affine:paragraph",
            text,
            props: { type: "text" },
          });
          break;
        case "li":
          blocks.push({ type: "affine:list", text, props: {} });
          break;
        case "blockquote":
          blocks.push({
            type: "affine:paragraph",
            text,
            props: { type: "quote" },
          });
          break;
        case "ul":
        case "ol":
          element.querySelectorAll(":scope > li").forEach((li) => {
            const liText = li.textContent?.trim();
            if (liText) {
              blocks.push({ type: "affine:list", text: liText, props: {} });
            }
          });
          break;
        case "br":
          break;
        default:
          if (["div", "section", "article", "body"].includes(tagName)) {
            Array.from(element.children).forEach((child) => processNode(child));
          }
      }
    }
  };

  if (body.children.length > 0) {
    Array.from(body.children).forEach((child) => processNode(child));
  } else {
    const text = body.textContent?.trim();
    if (text) {
      blocks.push({ type: "affine:paragraph", text, props: { type: "text" } });
    }
  }

  return blocks;
}

export default function BlockSuiteEditor({
  content = "",
  onChange,
}: BlockSuiteEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<AffineEditorContainer | null>(null);
  const docRef = useRef<any>(null);
  const noteBlockIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!editorRef.current || editorInstanceRef.current) return;

    const schema = new Schema().register(AffineSchemas);

    const collection = new DocCollection({ schema });
    collection.meta.initialize();

    const doc = collection.createDoc({ id: "doc:home" });
    docRef.current = doc;

    doc.load(() => {
      // Initialize the page with a root block
      const pageBlockId = doc.addBlock("affine:page", {});
      doc.addBlock("affine:surface", {}, pageBlockId);
      const noteBlockId = doc.addBlock("affine:note", {}, pageBlockId);
      noteBlockIdRef.current = noteBlockId;

      if (content) {
        doc.addBlock(
          "affine:paragraph",
          {
            text: new doc.Text(content),
          },
          noteBlockId
        );
      }
    });

    if (onChange) {
      doc.slots.blockUpdated.on(() => {
        try {
          const blocks = doc.getBlocksByFlavour("affine:paragraph");
          const textContent = blocks
            .map((block: any) => block.text?.toString() || "")
            .join("\n");
          onChange(textContent);
        } catch (error) {
          console.error("Error getting content:", error);
        }
      });
    }

    const editor = new AffineEditorContainer();
    editor.doc = doc;
    editor.mode = "page";

    editor.slots.docLinkClicked.on(({ docId }) => {
      console.log("Doc link clicked:", docId);
    });

    editorRef.current.appendChild(editor);
    editorInstanceRef.current = editor;

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.remove();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!docRef.current || !noteBlockIdRef.current || !content) return;

    try {
      const doc = docRef.current;
      const noteBlockId = noteBlockIdRef.current;

      const existingBlocks = doc.getBlocksByFlavour("affine:paragraph");
      existingBlocks.forEach((block: any) => {
        doc.deleteBlock(block);
      });

      let processedContent = content;

      if (content.includes("```html") || content.includes("```")) {
        processedContent = stripCodeBlock(content);
      }

      if (processedContent.includes("<") && processedContent.includes(">")) {
        const blockData = parseHTMLToBlocks(processedContent);

        blockData.forEach((block) => {
          doc.addBlock(
            block.type,
            {
              text: new doc.Text(block.text),
              ...block.props,
            },
            noteBlockId
          );
        });
      } else {
        const lines = processedContent
          .split("\n")
          .filter((line) => line.trim());

        lines.forEach((line) => {
          doc.addBlock(
            "affine:paragraph",
            {
              text: new doc.Text(line),
            },
            noteBlockId
          );
        });
      }
    } catch (error) {
      console.error("Error updating content:", error);
    }
  }, [content]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div ref={editorRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
