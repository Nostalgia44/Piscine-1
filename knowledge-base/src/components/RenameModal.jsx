import React, { useState, useEffect, useRef } from 'react';

const RenameModal = ({ isVisible, item, onClose, onConfirm }) => {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isVisible && item) {
      // Pre-select filename without extension for files
      if (item.type === 'file') {
        const nameWithoutExt = item.name.includes('.') 
          ? item.name.substring(0, item.name.lastIndexOf('.'))
          : item.name;
        setNewName(nameWithoutExt);
      } else {
        setNewName(item.name);
      }
      setError('');
      
      // Focus input after a small delay to ensure modal is rendered
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 100);
    }
  }, [isVisible, item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    if (newName.trim() === item.name) {
      onClose();
      return;
    }

    // Add extension back for files
    let finalName = newName.trim();
    if (item.type === 'file' && item.name.includes('.')) {
      const extension = item.name.substring(item.name.lastIndexOf('.'));
      if (!finalName.includes('.')) {
        finalName += extension;
      }
    }

    onConfirm(item, finalName);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isVisible || !item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Rename {item.type === 'folder' ? 'Folder' : 'File'}</h3>
          <button className="modal-close" onClick={onClose}>✖️</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="newName">New name:</label>
            <input
              ref={inputRef}
              id="newName"
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Enter new name..."
            />
            {item.type === 'file' && item.name.includes('.') && (
              <small className="form-hint">
                Extension will be preserved: {item.name.substring(item.name.lastIndexOf('.'))}
              </small>
            )}
            {error && <div className="form-error">{error}</div>}
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Rename
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenameModal;