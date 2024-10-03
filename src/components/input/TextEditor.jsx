"use client";

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export const TextEditor = React.forwardRef((props, ref) => {
  const editorRef = useRef(null);
  return (
    <Editor
      ref={editorRef}
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={props?.defaultValues || ""}
      apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
      init={{
        initialValue: props?.defaultValues || "",
        height: 300,
        plugins: ["lists"],
        formats: {
          p: { block: "p", remove: "all" },
        },
        content_style: "body { font-family:popins,sans-serif; font-size:14px }",
      }}
      onEditorChange={props.onChange}
    />
  );
});

TextEditor.displayName = "TextEditor";
