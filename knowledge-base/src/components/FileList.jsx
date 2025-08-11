// components/FileList.jsx
import React from 'react';

const FileList = ({ items, selectedItems, onItemSelect, onItemOpen, onContextMenu, isSearchMode }) => {
  const getFileIcon = (item) => {
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
    if (!size) return '-';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    
    return parseFloat((size / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileType = (item) => {
    if (item.type === 'folder') {
      const itemCount = item.children ? item.children.length : 0;
      return `Folder (${itemCount} items)`;
    }
    
    const extension = item.name.split('.').pop().toLowerCase();
    const typeMap = {
      // Images
      'jpg': 'JPEG Image', 'jpeg': 'JPEG Image', 'png': 'PNG Image', 
      'gif': 'GIF Image', 'bmp': 'Bitmap Image', 'svg': 'SVG Image',
      // Videos
      'mp4': 'MP4 Video', 'avi': 'AVI Video', 'mov': 'QuickTime Video',
      'mkv': 'Matroska Video', 'wmv': 'Windows Media Video', 'flv': 'Flash Video',
      // Audio
      'mp3': 'MP3 Audio', 'wav': 'WAV Audio', 'flac': 'FLAC Audio',
      'aac': 'AAC Audio', 'ogg': 'OGG Audio',
      // Documents
      'pdf': 'PDF Document', 'doc': 'Word Document', 'docx': 'Word Document',
      'txt': 'Text File', 'rtf': 'Rich Text File',
      // Spreadsheets
      'xls': 'Excel Spreadsheet', 'xlsx': 'Excel Spreadsheet', 'csv': 'CSV File',
      // Presentations
      'ppt': 'PowerPoint Presentation', 'pptx': 'PowerPoint Presentation',
      // Archives
      'zip': 'ZIP Archive', 'rar': 'RAR Archive', '7z': '7-Zip Archive',
      'tar': 'TAR Archive', 'gz': 'GZIP Archive',
      // Executables
      'exe': 'Application', 'msi': 'Installer Package', 'deb': 'Debian Package',
      'dmg': 'Disk Image',
      // Code files
      'js': 'JavaScript File', 'jsx': 'React Component', 'ts': 'TypeScript File',
      'tsx': 'TypeScript React', 'html': 'HTML Document', 'css': 'CSS Stylesheet',
      'py': 'Python Script', 'java': 'Java Source', 'cpp': 'C++ Source',
      'c': 'C Source', 'php': 'PHP Script'
    };
    
    return typeMap[extension] || `${extension.toUpperCase()} File`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  // Sort items: folders first, then files, both alphabetically
  const sortedItems = [...items].sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="file-list">
      <div className="file-list-header">
        <div className="header-name">Name</div>
        <div className="header-size">Size</div>
        <div className="header-type">Type</div>
        <div className="header-date">{isSearchMode ? 'Location' : 'Modified'}</div>
      </div>
      
      <div className="file-list-body">
        {sortedItems.map(item => (
          <div 
            key={item.id}
            className={`file-list-row ${selectedItems.includes(item.id) ? 'selected' : ''}`}
            onClick={() => onItemSelect(item.id)}
            onDoubleClick={() => onItemOpen(item)}
            onContextMenu={(e) => {
              e.stopPropagation();
              onContextMenu && onContextMenu(e, item);
            }}
            title={`${item.type === 'folder' ? 'Folder' : 'File'}: ${item.name}`}
          >
            <div className="row-name">
              <span className="row-icon">{getFileIcon(item)}</span>
              <span className="row-text">{item.name}</span>
              {selectedItems.includes(item.id) && (
                <span className="row-selected-indicator">✓</span>
              )}
            </div>
            <div className="row-size">
              {item.type === 'file' ? formatFileSize(item.size) : '-'}
            </div>
            <div className="row-type">
              {getFileType(item)}
            </div>
            <div className="row-date">
              {isSearchMode ? 
                (item.parentPath === '/' ? 'Root' : item.parentPath) : 
                formatDate(item.modifiedDate)
              }
            </div>
          </div>
        ))}
      </div>
      
      {sortedItems.length === 0 && (
        <div className="empty-list">
          <p>📂 No items to display</p>
        </div>
      )}
    </div>
  );
};

export default FileList;