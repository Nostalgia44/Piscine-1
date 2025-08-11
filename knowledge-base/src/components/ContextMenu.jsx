import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ 
  isVisible, 
  position, 
  item, 
  onClose, 
  onRename, 
  onMove, 
  onCreateFolder, 
  onCopy,
  onCut,
  onPaste,
  clipboardItem 
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const menuItems = [];

  // Item-specific actions
  if (item) {
    menuItems.push(
      { id: 'rename', label: '✏️ Rename', action: () => onRename(item) },
      { id: 'copy', label: '📋 Copy', action: () => onCopy(item) },
      { id: 'cut', label: '✂️ Cut', action: () => onCut(item) },
      { id: 'separator1', type: 'separator' }
    );
  }

  // General actions
  if (clipboardItem) {
    menuItems.push(
      { id: 'paste', label: '📄 Paste', action: () => onPaste() }
    );
  }

  menuItems.push(
    { id: 'newFolder', label: '📁 New Folder', action: () => onCreateFolder() }
  );

  return (
    <div 
      ref={menuRef}
      className="context-menu"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {menuItems.map((menuItem, index) => {
        if (menuItem.type === 'separator') {
          return <div key={menuItem.id} className="context-menu-separator" />;
        }

        return (
          <div
            key={menuItem.id}
            className="context-menu-item"
            onClick={(e) => {
              e.stopPropagation();
              menuItem.action();
              onClose();
            }}
          >
            {menuItem.label}
          </div>
        );
      })}
    </div>
  );
};

export default ContextMenu;