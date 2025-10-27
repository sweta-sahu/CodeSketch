import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {
  FiCode,
  FiFileText,
  FiCopy,
  FiCheck,
  FiDownload,
  FiGlobe,
} from 'react-icons/fi';

// --- Custom Hooks ---
// 1. Copy to Clipboard Hook
const useClipboard = (timeout = 2000) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeout);
    });
  };

  return { hasCopied, copy };
};

// --- Main Component ---
function OutputPanel({
  code,
  readme,
  onCodeChange,
  onRewrite,
  onGenerateReadme,
  onTranslate,
  hasCode,
}) {
  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'readme'
  const [selection, setSelection] = useState('');
  const { hasCopied: hasCopiedCode, copy: copyCode } = useClipboard();
  const { hasCopied: hasCopiedReadme, copy: copyReadme } = useClipboard();

  const handleSelection = (update) => {
    if (update.selectionSet) {
      const selectedText = update.state.doc
        .sliceString(
          update.state.selection.main.from,
          update.state.selection.main.to,
        )
        .trim();
      setSelection(selectedText);
    }
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'index.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="panel output-panel">
      {/* 1. Tab Navigation */}
      <nav className="tabs-nav">
        <button
          className={`tab-button ${activeTab === 'code' ? 'tab-button-active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <FiCode /> Code
        </button>
        <button
          className={`tab-button ${activeTab === 'readme' ? 'tab-button-active' : ''}`}
          onClick={() => setActiveTab('readme')}
        >
          <FiFileText /> README
        </button>
      </nav>

      {/* 2. Tab Content: Code */}
      {activeTab === 'code' && (
        <div className="tab-content">
          <div className="toolbar">
            <div className="toolbar-group">
              <button
                className="btn btn-ghost"
                disabled={!selection}
                onClick={() => onRewrite(selection, 'Make Tailwind')}
              >
                Make Tailwind
              </button>
              <button
                className="btn btn-ghost"
                disabled={!selection}
                onClick={() => onRewrite(selection, 'Add Comments')}
              >
                Add Comments
              </button>
              <button
                className="btn btn-ghost"
                disabled={!selection}
                onClick={() => onRewrite(selection, 'Make Accessible')}
              >
                Make Accessible
              </button>
            </div>
            <div className="toolbar-group" style={{ marginLeft: 'auto' }}>
              <button
                className="btn btn-ghost"
                onClick={() => copyCode(code)}
                disabled={!hasCode}
              >
                {hasCopiedCode ? <FiCheck /> : <FiCopy />}
                {hasCopiedCode ? 'Copied!' : 'Copy Code'}
              </button>
              <button
                className="btn btn-ghost"
                onClick={downloadCode}
                disabled={!hasCode}
              >
                <FiDownload /> Download
              </button>
            </div>
          </div>
          <div className="code-editor-wrapper">
            {!hasCode ? (
              <div className="empty-state">
                Your generated code will appear here.
              </div>
            ) : (
              <CodeMirror
                value={code}
                height="100%"
                extensions={[javascript({ jsx: true })]}
                onChange={onCodeChange}
                onUpdate={handleSelection}
                theme="dark" // Or use a custom theme
              />
            )}
          </div>
        </div>
      )}

      {/* 3. Tab Content: README */}
      {activeTab === 'readme' && (
        <div className="tab-content">
          <div className="toolbar">
            <button
              className="btn btn-primary"
              onClick={onGenerateReadme}
              disabled={!hasCode || !!readme} // Disable if no code OR if readme exists
            >
              Generate README
            </button>
            <button
              className="btn btn-secondary"
              onClick={onTranslate}
              disabled={!readme} // Disable until README content exists
            >
              <FiGlobe /> Translate
            </button>
            <button
              className="btn btn-ghost"
              style={{ marginLeft: 'auto' }}
              onClick={() => copyReadme(readme)}
              disabled={!readme}
            >
              {hasCopiedReadme ? <FiCheck /> : <FiCopy />}
              {hasCopiedReadme ? 'Copied!' : 'Copy Markdown'}
            </button>
          </div>

          {!readme ? (
            <div className="empty-state">
              Click 'Generate README' to create documentation for your code.
            </div>
          ) : (
            <pre className="readme-content">{readme}</pre>
          )}
        </div>
      )}
    </section>
  );
}

export default OutputPanel;