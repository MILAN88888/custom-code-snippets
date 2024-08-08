import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { editor as MonacoEditor } from 'monaco-editor';

interface CodeMirrorEditorProps extends EditorProps {
  onMount?: (editor: MonacoEditor.IStandaloneCodeEditor) => void;
}

export interface CodeMirrorEditorHandle {
  editor: MonacoEditor.IStandaloneCodeEditor | null;
}

const CodeMirrorEditor = forwardRef<CodeMirrorEditorHandle, CodeMirrorEditorProps>((props, ref) => {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

  useImperativeHandle(ref, () => ({
    editor: editorRef.current
  }));

  return (
    <Editor
      {...props}
      onMount={(editor) => {
        editorRef.current = editor;
        if (props.onMount) {
          props.onMount(editor);
        }
      }}
    />
  );
});

CodeMirrorEditor.displayName = 'CodeMirrorEditor';

export default CodeMirrorEditor;
