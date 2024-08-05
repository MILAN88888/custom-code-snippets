import React from "react";
import Editor from "@monaco-editor/react";

const CodeMirrorEditor: React.FC = () => {
  const code = "<?php \n";
  return <Editor height="500px" theme="vs-dark" language="php" value={code} />;
};

export default CodeMirrorEditor;
