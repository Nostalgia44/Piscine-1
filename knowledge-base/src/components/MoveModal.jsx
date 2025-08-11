import React, { useState, useEffect } from 'react';

const MoveModal = ({ isVisible, items, allFolders, onClose, onConfirm, currentPath }) => {
  const [selectedPath, setSelectedPath] = useState('/');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['/']));

  useEffect(() => {
    if (isVisible) {
      setSelectedPath(currentPath || '/');
    }
  }, [isVisible, currentPath]);

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFolderTree = (folders, currentPath = '', level = 0) => {
    return folders.map(folder => {
      if (folder.type !== 'folder') return null;
      
      const folderPath = currentPath ? `${currentPath}/${folder.name}` : `/${folder.name}`;
      const isExpanded = expandedFolders.has(folderPath);
      const isSelected = selectedPath === folderPath;
      const hasChildren = folder.children && folder.children.some(child => child.type === 'folder');
      
      // Don't allow moving item into itself or its children
      const isMovingIntoSelf = items.some(item => 
        folderPath.startsWith(currentPath ? `${currentPath}/${item.name}` : `/${item.name}`)
      );

      return (
        <div key={folderPath} className="folder-tree-item">
          <div 
            className={`folder-tree-node ${isSelected ? 'selected' : ''} ${isMovingIntoSelf ? 'disabled' : ''}`}
            style={{ paddingLeft: `${level * 20 + 10}px` }}
            onClick={() => !isMovingIntoSelf && setSelectedPath(folderPath)}
          >
            <span 
              className="folder-tree-toggle"
              onClick={(e) => {
                e.stopPropagation();
                if (hasChildren) toggleFolder(folderPath);
              }}
            >
              {hasChildren ? (isExpanded ? '📂' : '📁') : '📄'}
            </span>
            <span className="folder-tree-name">
              {folder.name || 'Root'}
            </span>
          </div>
          
          {hasChildren && isExpanded && folder.children && (
            <div className="folder-tree-children">
              {renderFolderTree(
                folder.children.filter(child => child.type === 'folder'), 
                folderPath, 
                level + 1
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const handleSubmit = () => {
    if (selectedPath === currentPath) {
      onClose();
      return;
    }
    onConfirm(items, selectedPath);
    onClose();
  };

  if (!isVisible || !items || items.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Move {items.length} item{items.length > 1 ? 's' : ''}</h3>
          <button className="modal-close" onClick={onClose}>✖️</button>
        </div>
        
        <div className="modal-body">
          <div className="move-info">
            <p>Moving:</p>
            <ul className="items-list">
              {items.map(item => (
                <li key={item.id}>
                  {item.type === 'folder' ? '📁' : '📄'} {item.name}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="destination-selection">
            <p>Select destination folder:</p>
            <div className="folder-tree">
              <div 
                className={`folder-tree-node ${selectedPath === '/' ? 'selected' : ''}`}
                onClick={() => setSelectedPath('/')}
              >
                <span className="folder-tree-toggle">🏠</span>
                <span className="folder-tree-name">Root</span>
              </div>
              {renderFolderTree(allFolders)}
            </div>
          </div>
          
          <div className="selected-path">
            <strong>Destination:</strong> {selectedPath === '/' ? 'Root' : selectedPath}
          </div>
        </div>
        
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedPath === currentPath}
          >
            Move Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveModal;