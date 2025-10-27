import { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import './App.css';

// --- SIMULATED API CALLS ---
// In a real app, these would be `fetch` calls to your API
const FAKE_API = {
  generateCode: (image) =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(`<div class="container">
  <h1>Hello World!</h1>
  <p>This is a placeholder for your sketch.</p>
</div>
<style>
  .container {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
  }
</style>`),
        1500,
      ),
    ),
  rewriteSelection: (selection, prompt) =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(`/* --- ${prompt} --- */
${selection.replace(/background: #fff;/g, 'background: #f0f0f0; /* Rewritten */')}
/* --- End Rewrite --- */`),
        1000,
      ),
    ),
  generateReadme: (code) =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(`# Project README
          
This README was auto-generated based on the following code:
\`\`\`html
${code.substring(0, 100)}...
\`\`\`
`),
        1000,
      ),
    ),
  translate: (text) =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve(`(Translated) ${text.replace(/Project README/g, 'Proyecto README')}`),
        1000,
      ),
    ),
};
// --- END SIMULATED API CALLS ---

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // File object
  const [previewUrl, setPreviewUrl] = useState(null); // Data URL for <img>
  const [generatedCode, setGeneratedCode] = useState('');
  const [readmeContent, setReadmeContent] = useState('');

  // --- State Reset ---
  const handleNewProject = () => {
    setUploadedImage(null);
    setPreviewUrl(null);
    setGeneratedCode('');
    setReadmeContent('');
    setIsLoading(false);
  };

  // --- Input Panel Logic ---
  const handleImageUpload = (file) => {
    if (file) {
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setPreviewUrl(null);
  };

  const handleGenerateCode = async () => {
    if (!uploadedImage) return;
    setIsLoading(true);
    const code = await FAKE_API.generateCode(uploadedImage);
    setGeneratedCode(code);
    setIsLoading(false);
  };

  // --- Output Panel Logic ---
  const handleRewrite = async (selection, prompt) => {
    if (!selection) return;
    setIsLoading(true); // You could use a more granular loading state
    const rewrittenCode = await FAKE_API.rewriteSelection(selection, prompt);
    // This is a simple replacement. A real app might use CodeMirror's
    // transaction API to replace the exact selection.
    setGeneratedCode(
      generatedCode.replace(selection.trim(), rewrittenCode.trim()),
    );
    setIsLoading(false);
  };

  const handleGenerateReadme = async () => {
    if (!generatedCode) return;
    setIsLoading(true);
    const readme = await FAKE_API.generateReadme(generatedCode);
    setReadmeContent(readme);
    setIsLoading(false);
  };

  const handleTranslate = async () => {
    if (!readmeContent) return;
    setIsLoading(true);
    const translatedText = await FAKE_API.translate(readmeContent);
    setReadmeContent(translatedText);
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      {isLoading && <div className="loading-overlay">Generating...</div>}
      <Header onNewProject={handleNewProject} />
      <main className="main-layout">
        <InputPanel
          previewUrl={previewUrl}
          onImageUpload={handleImageUpload}
          onClearImage={handleClearImage}
          onGenerateCode={handleGenerateCode}
          isCodeGenerated={!!generatedCode}
        />
        <OutputPanel
          code={generatedCode}
          readme={readmeContent}
          onCodeChange={setGeneratedCode}
          onRewrite={handleRewrite}
          onGenerateReadme={handleGenerateReadme}
          onTranslate={handleTranslate}
          hasCode={!!generatedCode}
        />
      </main>
    </div>
  );
}

export default App;