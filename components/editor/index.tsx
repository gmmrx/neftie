import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import ExampleTheme from "./theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function Placeholder() {
  const { t } = useTranslation();
  return (
    <div className="editor-placeholder absolute left-[10px] top-[9px] text-base text-[#666] italic">
      What do you think about this tier list? Share your thoughts and
      opinions...
    </div>
  );
}

const editorConfig = {
  namespace: "Editor",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};
function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}
export function Editor({
  editorState,
  updateEditorState,
  onSendClick,
}: {
  editorState: string;
  updateEditorState: (state: string) => void;
  onSendClick: () => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  function onChange(state) {
    updateEditorState(JSON.stringify(state));
  }

  const handleBlur = (e) => {
    // Check if the related target (what's being clicked) is the send button
    if (e.relatedTarget?.classList.contains("send-button")) {
      return; // Don't blur if clicking the send button
    }
    setIsFocused(false);
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container w-full my-2 bg-white/10 rounded-md">
        <div className="editor-inner relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`editor-input p-2 transition-all duration-300 ease-in-out outline-none rounded-md ${
                  isFocused
                    ? "border border-white min-h-[5rem]"
                    : "min-h-[2.7rem]"
                }`}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
              />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyOnChangePlugin onChange={onChange} />
          {isFocused && (
            <Button
              className="absolute bottom-2 right-2 bg-white/15 text-black font-inter uppercase send-button"
              onClick={onSendClick}
            >
              send
            </Button>
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}
