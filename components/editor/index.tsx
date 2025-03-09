import React, { useState, useMemo, useEffect } from "react";
import { createEditor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import DOMPurify from "dompurify";

// Default initial value for Slate
const INITIAL_VALUE = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

// Create a sanitization plugin
const withSanitization = (editor) => {
  const { insertText, insertData } = editor;

  editor.insertText = (text) => {
    const sanitizedText = DOMPurify.sanitize(text, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
    insertText(sanitizedText);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text) {
      const sanitizedText = DOMPurify.sanitize(text, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      });
      editor.insertText(sanitizedText);
      return;
    }

    insertData(data);
  };

  return editor;
};

export function Editor({ editorState, updateEditorState, onSendClick }) {
  // Create a Slate editor with React integration and sanitization
  const editor = useMemo(() => withSanitization(withReact(createEditor())), []);
  const [isFocused, setIsFocused] = useState(false);
  const { toast } = useToast();

  // Parse editorState string into a valid Slate value
  const parseEditorState = () => {
    if (!editorState) return INITIAL_VALUE;

    try {
      const parsed = JSON.parse(editorState);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse editor state:", e);
    }

    return INITIAL_VALUE;
  };

  // Initialize with a guaranteed valid value
  const [value, setValue] = useState(INITIAL_VALUE);

  // Update Slate value when editorState prop changes
  useEffect(() => {
    setValue(parseEditorState());
  }, [editorState]);

  const handleChange = (newValue) => {
    setValue(newValue);

    // Sanitize the content before updating the editor state
    const sanitizedValue = newValue.map((block) => ({
      ...block,
      children: block.children.map((child) => ({
        ...child,
        text: DOMPurify.sanitize(child.text || "", {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
        }),
      })),
    }));

    updateEditorState(JSON.stringify(sanitizedValue));
  };

  const isEditorEmpty = () => {
    return (
      value
        .map((n) => Node.string(n))
        .join("")
        .trim().length === 0
    );
  };

  const handleSend = () => {
    if (isEditorEmpty()) {
      toast({
        title: "Empty comment",
        description: "Please write something before sending your comment.",
        variant: "destructive",
      });
      return;
    }

    // Call the parent's onSendClick function
    onSendClick();

    // Reset editor content
    setValue(INITIAL_VALUE);
    updateEditorState(JSON.stringify(INITIAL_VALUE));
  };

  // IMPORTANT: Don't rely on the value state being updated immediately
  // Instead, provide a fresh valid value for each render
  const currentValue = value || INITIAL_VALUE;

  // Check if the editor is empty for controlling the send button visibility
  const isEmpty = isEditorEmpty();

  return (
    <div className="w-full my-2 bg-white/10 rounded-md relative">
      <Slate
        editor={editor}
        initialValue={INITIAL_VALUE}
        value={currentValue}
        onChange={handleChange}
      >
        <Editable
          className={`p-2 transition-all duration-300 ease-in-out outline-none rounded-md ${
            isFocused ? "border border-white min-h-[5rem]" : "min-h-[2.7rem]"
          }`}
          placeholder="What do you think about this tier list?"
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (e.relatedTarget?.classList.contains("send-button")) return;
            setIsFocused(false);
          }}
        />
      </Slate>

      {isFocused && !isEmpty && (
        <Button
          className="absolute bottom-2 right-2 bg-white/15 text-black font-inter uppercase send-button"
          onClick={handleSend}
        >
          send
        </Button>
      )}
    </div>
  );
}
