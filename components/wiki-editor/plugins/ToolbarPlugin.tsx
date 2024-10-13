/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createLineBreakNode,
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import {
  Bold,
  Italic,
  Redo,
  Underline,
  Undo,
  Code,
  RotateCw,
  RotateCcw,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const handleAddWikiSection = () => {
    editor.update(() => {
      // Example: Insert a title, hr, and description in the editor
      const selection = $getSelection();
      if (selection !== null) {
        const titleNode = $createTextNode("Title: ");
        const hrNode = $createLineBreakNode();
        const descriptionNode = $createTextNode("Description: ");

        selection.insertNodes([titleNode, hrNode, descriptionNode]);
      }
    });
  };

  return (
    <div
      className="toolbar w-full flex gap-2 py-2 px-4 bg-[#202020]"
      ref={toolbarRef}
    >
      <button onClick={handleAddWikiSection}>Add Wiki Section</button>
      <button
        disabled={!canUndo}
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced hover:bg-[#282828] p-2 rounded-sm cursor-pointer"
        aria-label="Undo"
      >
        <RotateCcw size={20} />
      </button>
      <button
        disabled={!canRedo}
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item hover:bg-[#282828] p-2 rounded-sm cursor-pointer"
        aria-label="Redo"
      >
        <RotateCw size={20} />
      </button>
      <Divider />
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={
          "toolbar-item spaced  p-2 rounded-sm hover:bg-[#282828] " +
          (isBold ? "bg-[#282828]" : "")
        }
        aria-label="Format Bold"
      >
        <Bold size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={
          "toolbar-item spaced  p-2 rounded-sm hover:bg-[#282828] " +
          (isItalic ? "bg-[#282828]" : "")
        }
        aria-label="Format Italics"
      >
        <Italic size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={
          "toolbar-item spaced p-2 rounded-sm hover:bg-[#282828] " +
          (isUnderline ? "bg-[#282828]" : "")
        }
        aria-label="Format Underline"
      >
        <Underline size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
        className={
          "toolbar-item spaced p-2 rounded-sm hover:bg-[#282828] " +
          (isCode ? "bg-[#282828]" : "")
        }
        aria-label="Format Code"
      >
        <Code size={20} />
      </button>
    </div>
  );
}
