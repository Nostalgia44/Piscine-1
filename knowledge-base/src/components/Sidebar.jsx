import React from 'react';

const Sidebar = ({ currentPath, onNavigate, stats }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>📂 Quick Access</h3>
        <ul className="nav-list">
          <li 
            className={currentPath === '/' ? 'active' : ''}
            onClick={() => onNavigate('/')}
          >
            🏠 Home
          </li>
          <li onClick={() => onNavigate('/Documents')}>
            📄 Documents
          </li>
          <li onClick={() => onNavigate('/Pictures')}>
            🖼️ Pictures
          </li>
          <li onClick={() => onNavigate('/Videos')}>
            🎥 Videos
          </li>
          <li onClick={() => onNavigate('/Music')}>
            🎵 Music
          </li>
          <li onClick={() => onNavigate('/Downloads')}>
            ⬇️ Downloads
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3>📊 Directory Info</h3>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Folders:</span>
            <span className="stat-value">{stats.folders}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Files:</span>
            <span className="stat-value">{stats.files}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Size:</span>
            <span className="stat-value">
              {stats.totalSize > 0 ? formatFileSize(stats.totalSize) : '0 B'}
            </span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>🔧 Actions</h3>
        <div className="action-buttons">
          <button className="action-button" onClick={() => alert('Create new folder')}>
            📁 New Folder
          </button>
          <button className="action-button" onClick={() => alert('Upload files')}>
            📤 Upload Files
          </button>
          <button className="action-button" onClick={() => alert('Refresh view')}>
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to format file sizes
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default Sidebar;