
import React from 'react';

const CodeEditor = ({ value, onChange }) => {
  return (
    <textarea
      className="code-editor"
      rows="20"
      cols="80"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
};

export default CodeEditor;
