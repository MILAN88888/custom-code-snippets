import React from "react";
import Editor, { EditorProps } from "@monaco-editor/react";

interface CodeMirrorEditorProps extends EditorProps {}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = (props) => {
  return <Editor {...props} />;
};

export default CodeMirrorEditor;
