"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor with SSR disabled
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

const MonacoEditorComponent = ({ 
    language, 
    theme,
    value,
    onChange
  }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditorChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const editorOptions = {
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    automaticLayout: true,
  };

  // Only render the editor on the client
  if (!mounted) return null;

  return (
    <div className="mx-[20px] h-full rounded-2xl overflow-scroll no-scrollbar">
      <MonacoEditor
        height="100%"
        width="100%"
        language={language}
        theme={theme}
        value={value}
        onChange={handleEditorChange}
        options={editorOptions}
      />
    </div>
  );
}

export default MonacoEditorComponent