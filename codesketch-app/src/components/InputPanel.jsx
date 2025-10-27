import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

function InputPanel({
  previewUrl,
  onImageUpload,
  onClearImage,
  onGenerateCode,
  isCodeGenerated, // Used to disable "Generate"
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onImageUpload(acceptedFiles[0]);
    },
    [onImageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
    maxFiles: 1,
  });

  return (
    <section className="panel input-panel">
      {!previewUrl ? (
        // 1. Empty State
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
        >
          <input {...getInputProps()} />
          <FiUpload className="dropzone-icon" />
          <p>
            {isDragActive
              ? 'Drop the sketch here'
              : "Drag & drop your sketch or click to upload"}
          </p>
        </div>
      ) : (
        // 2. Loaded State
        <>
          <img
            src={previewUrl}
            alt="Uploaded sketch preview"
            className="image-preview"
          />
          <div className="input-actions">
            <button
              className="btn btn-primary"
              onClick={onGenerateCode}
              disabled={isCodeGenerated} // Disable if code already exists
            >
              Generate Code
            </button>
            <button className="btn btn-ghost" onClick={onClearImage}>
              <FiX /> Clear Image
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default InputPanel;