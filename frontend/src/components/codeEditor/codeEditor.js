// CodeEditor.js
import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";

function CodeEditor({ code, onChange }) {
  const [editorCode, setEditorCode] = useState(code || `#include <iostream>\nusing namespace std;\nint main()\n{\n  cout << "Hello World";\n  return 0;\n}`);

  const handleEditorChange = (newValue, e) => {
    setEditorCode(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (code) {
      setEditorCode(code);
    }
  }, [code]);

  return (
    <div style={{ height: '400px' }}>
      <Editor
        language="cpp"
        theme="vs-dark"
        value={editorCode}
        onChange={handleEditorChange}
        options={{
          selectOnLineNumbers: true,
          folding: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;
