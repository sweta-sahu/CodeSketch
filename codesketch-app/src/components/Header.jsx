import { CgCodeSlash } from 'react-icons/cg';

function Header({ onNewProject }) {
  // PWA install logic would go here
  const showInstallButton = false;

  return (
    <header className="header">
      <h1 className="header-title">
        <CgCodeSlash style={{ marginRight: '0.5rem', verticalAlign: 'bottom' }} />
        CodeSketch
      </h1>
      <div className="header-actions">
        {showInstallButton && (
          <button className="btn btn-secondary">Install App</button>
        )}
        <button className="btn btn-ghost" onClick={onNewProject}>
          New Project
        </button>
      </div>
    </header>
  );
}

export default Header;