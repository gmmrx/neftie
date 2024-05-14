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

function Placeholder() {
  const { t } = useTranslation();
  return (
    <div className="editor-placeholder absolute left-[10px] top-[9px] text-base">
      {t("translation:event_form.event_details")}
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
export function Editor({ editorState, updateEditorState }) {
  function onChange(state) {
    updateEditorState(JSON.stringify(state));
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container w-full border">
        <ToolbarPlugin />
        <div className="editor-inner relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input min-h-[5rem] p-2" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyOnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
