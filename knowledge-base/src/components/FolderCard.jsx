// components/FolderCard.jsx
import React from 'react';

const FolderCard = ({ item, isSelected, onSelect, onOpen, onContextMenu }) => {
  const getFileIcon = () => {
    if (item.type === 'folder') return '📁';
    
    const extension = item.name.split('.').pop().toLowerCase();
    const iconMap = {
      // Images
      'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️', 'bmp': '🖼️', 'svg': '🖼️',
      // Videos
      'mp4': '🎥', 'avi': '🎥', 'mov': '🎥', 'mkv': '🎥', 'wmv': '🎥', 'flv': '🎥',
      // Audio
      'mp3': '🎵', 'wav': '🎵', 'flac': '🎵', 'aac': '🎵', 'ogg': '🎵',
      // Documents
      'pdf': '📄', 'doc': '📝', 'docx': '📝', 'txt': '📃', 'rtf': '📝',
      // Spreadsheets
      'xls': '📊', 'xlsx': '📊', 'csv': '📊',
      // Presentations
      'ppt': '📽️', 'pptx': '📽️',
      // Archives
      'zip': '🗜️', 'rar': '🗜️', '7z': '🗜️', 'tar': '🗜️', 'gz': '🗜️',
      // Executables
      'exe': '⚙️', 'msi': '⚙️', 'deb': '⚙️', 'dmg': '⚙️',
      // Code files
      'js': '💻', 'jsx': '💻', 'ts': '💻', 'tsx': '💻', 'html': '🌐', 'css': '🎨',
      'py': '🐍', 'java': '☕', 'cpp': '⚡', 'c': '⚡', 'php': '🔧'
    };
    
    return iconMap[extension] || '📄';
  };

  const formatFileSize = (size) => {
    if (!size) return '';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    
    return parseFloat((size / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div 
      className={`folder-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onContextMenu={(e) => {
        e.stopPropagation();
        onContextMenu && onContextMenu(e, item);
      }}
      title={`${item.type === 'folder' ? 'Folder' : 'File'}: ${item.name}`}
    >
      <div className="card-icon">
        {getFileIcon()}
      </div>
      <div className="card-content">
        <div className="card-name" title={item.name}>
          {item.name.length > 20 ? `${item.name.substring(0, 17)}...` : item.name}
        </div>
        {item.type === 'file' && item.size && (
          <div className="card-size">
            {formatFileSize(item.size)}
          </div>
        )}
        {item.type === 'folder' && item.children && (
          <div className="card-items-count">
            {item.children.length} item{item.children.length !== 1 ? 's' : ''}
          </div>
        )}
        {item.modifiedDate && (
          <div className="card-date">
            {formatDate(item.modifiedDate)}
          </div>
        )}
      </div>
      {isSelected && (
        <div className="selection-indicator">
          ✓
        </div>
      )}
    </div>
  );
};

export default FolderCard;