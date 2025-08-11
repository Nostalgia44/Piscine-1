import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FolderCard from './components/FolderCard';
import FileList from './components/FileList';
import SearchBar from './components/SearchBar';
import ContextMenu from './components/ContextMenu';
import RenameModal from './components/RenameModal';
import MoveModal from './components/MoveModal';
import { files, folders } from './data/mockData';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [currentItems, setCurrentItems] = useState([]);
  const [pathHistory, setPathHistory] = useState(['/']);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // File management states
  const [fileSystemData, setFileSystemData] = useState({ 
    folders: [...folders], 
    files: [...files] 
  });
  const [contextMenu, setContextMenu] = useState({ 
    isVisible: false, 
    position: { x: 0, y: 0 }, 
    item: null 
  });
  const [renameModal, setRenameModal] = useState({ 
    isVisible: false, 
    item: null 
  });
  const [moveModal, setMoveModal] = useState({ 
    isVisible: false, 
    items: [] 
  });
  const [clipboard, setClipboard] = useState({ 
    item: null, 
    action: null 
  });
  const [nextId, setNextId] = useState(1000);

  const allItems = [...fileSystemData.folders, ...fileSystemData.files];

  // Load items from current directory
  useEffect(() => {
    if (!isSearchMode) {
      const items = getItemsInPath(currentPath);
      setCurrentItems(items);
    }
  }, [currentPath, isSearchMode]);

  // Function to retrieve items from a given path
  const getItemsInPath = (path) => {
    const mockData = [...fileSystemData.folders, ...fileSystemData.files];
    
    if (path === '/') {
      return mockData;
    }
    
    const pathParts = path.split('/').filter(part => part !== '');
    let currentLevel = mockData;
    
    for (const part of pathParts) {
      const folder = currentLevel.find(item => 
        item.type === 'folder' && item.name === part
      );
      if (folder && folder.children) {
        currentLevel = folder.children;
      } else {
        return [];
      }
    }
    
    return currentLevel;
  };

  // Navigate to a folder
  const navigateToFolder = (folderName) => {
    const newPath = currentPath === '/' ? `/${folderName}` : `${currentPath}/${folderName}`;
    setCurrentPath(newPath);
    setPathHistory([...pathHistory, newPath]);
    setSelectedItems([]);
  };

  // Navigate to parent directory
  const navigateUp = () => {
    if (currentPath !== '/') {
      const pathParts = currentPath.split('/').filter(part => part !== '');
      pathParts.pop();
      const newPath = pathParts.length === 0 ? '/' : '/' + pathParts.join('/');
      setCurrentPath(newPath);
      setPathHistory([...pathHistory, newPath]);
      setSelectedItems([]);
    }
  };

  // Navigate to a specific path
  const navigateToPath = (path) => {
    setCurrentPath(path);
    setSelectedItems([]);
    setIsSearchMode(false);
  };

  // Handle search results
  const handleSearchResult = (results) => {
    setSearchResults(results);
    setIsSearchMode(results.length > 0);
    if (results.length > 0) {
      setCurrentItems(results);
    }
  };

  // Navigate to a file from search results
  const navigateToFile = (fileResult) => {
    const targetPath = fileResult.parentPath;
    setCurrentPath(targetPath);
    setIsSearchMode(false);
    
    setTimeout(() => {
      const items = getItemsInPath(targetPath);
      const fileItem = items.find(item => item.name === fileResult.name);
      if (fileItem) {
        setSelectedItems([fileItem.id]);
        
        if (fileItem.type === 'file') {
          openFile(fileItem);
        }
      }
    }, 100);
  };

  // Handle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  // Open a file
  const openFile = (file) => {
    console.log('Opening file:', file.name);
    alert(`Opening file: ${file.name}`);
  };

  // Generate breadcrumb navigation
  const generateBreadcrumb = () => {
    if (currentPath === '/') return ['Home'];
    
    const parts = currentPath.split('/').filter(part => part !== '');
    return ['Home', ...parts];
  };

  // Get current directory statistics
  const getDirectoryStats = () => {
    const itemsToCount = isSearchMode ? searchResults : currentItems;
    const folders = itemsToCount.filter(item => item.type === 'folder').length;
    const files = itemsToCount.filter(item => item.type === 'file').length;
    const totalSize = itemsToCount
      .filter(item => item.type === 'file')
      .reduce((sum, file) => sum + (file.size || 0), 0);
    
    return { folders, files, totalSize };
  };

  // File Management Functions
  const updateFileSystem = (updater) => {
    setFileSystemData(prevData => {
      const newData = updater(prevData);
      return newData;
    });
  };

  const removeItemFromTree = (items, itemId) => {
    return items.filter(item => {
      if (item.id === itemId) {
        return false;
      }
      if (item.type === 'folder' && item.children) {
        item.children = removeItemFromTree(item.children, itemId);
      }
      return true;
    });
  };

  const addItemToPath = (items, targetPath, newItem) => {
    if (targetPath === '/') {
      return [...items, newItem];
    }

    return items.map(item => {
      if (item.type === 'folder') {
        const itemPath = `/${item.name}`;
        if (targetPath === itemPath) {
          return {
            ...item,
            children: [...(item.children || []), newItem]
          };
        } else if (targetPath.startsWith(itemPath + '/') && item.children) {
          return {
            ...item,
            children: addItemToPath(item.children, targetPath.replace(itemPath, ''), newItem)
          };
        }
      }
      return item;
    });
  };

  const renameItemInTree = (items, itemId, newName) => {
    return items.map(item => {
      if (item.id === itemId) {
        return { ...item, name: newName, modifiedDate: new Date() };
      }
      if (item.type === 'folder' && item.children) {
        return {
          ...item,
          children: renameItemInTree(item.children, itemId, newName)
        };
      }
      return item;
    });
  };

  // Context Menu Handlers
  const handleContextMenu = (e, item = null) => {
    e.preventDefault();
    setContextMenu({
      isVisible: true,
      position: { x: e.clientX, y: e.clientY },
      item
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, item: null });
  };

  // Rename functionality
  const handleRename = (item) => {
    setRenameModal({ isVisible: true, item });
  };

  const handleRenameConfirm = (item, newName) => {
    updateFileSystem(data => ({
      folders: renameItemInTree(data.folders, item.id, newName),
      files: renameItemInTree(data.files, item.id, newName)
    }));
  };

  // Move functionality
  const handleMove = (items) => {
    setMoveModal({ isVisible: true, items: Array.isArray(items) ? items : [items] });
  };

  const handleMoveConfirm = (items, targetPath) => {
    updateFileSystem(data => {
      let newFolders = [...data.folders];
      let newFiles = [...data.files];

      items.forEach(item => {
        newFolders = removeItemFromTree(newFolders, item.id);
        newFiles = removeItemFromTree(newFiles, item.id);

        const updatedItem = { ...item, modifiedDate: new Date() };
        newFolders = addItemToPath(newFolders, targetPath, updatedItem);
      });

      return { folders: newFolders, files: newFiles };
    });
  };

  // Create folder functionality
  const handleCreateFolder = () => {
    const newFolder = {
      id: nextId,
      name: `New Folder`,
      type: 'folder',
      createdDate: new Date(),
      modifiedDate: new Date(),
      children: []
    };

    updateFileSystem(data => {
      const newFolders = addItemToPath(data.folders, currentPath, newFolder);
      return { ...data, folders: newFolders };
    });

    setNextId(nextId + 1);
    
    setTimeout(() => {
      setRenameModal({ isVisible: true, item: newFolder });
    }, 100);
  };

  // Copy/Cut/Paste functionality
  const handleCopy = (item) => {
    setClipboard({ item, action: 'copy' });
  };

  const handleCut = (item) => {
    setClipboard({ item, action: 'cut' });
  };

  const handlePaste = () => {
    if (!clipboard.item) return;

    if (clipboard.action === 'cut') {
      handleMoveConfirm([clipboard.item], currentPath);
      setClipboard({ item: null, action: null });
    } else if (clipboard.action === 'copy') {
      const newItem = {
        ...clipboard.item,
        id: nextId,
        name: `Copy of ${clipboard.item.name}`,
        createdDate: new Date(),
        modifiedDate: new Date()
      };

      updateFileSystem(data => {
        const newFolders = addItemToPath(data.folders, currentPath, newItem);
        return { ...data, folders: newFolders };
      });

      setNextId(nextId + 1);
    }
  };

  const stats = getDirectoryStats();

  return (
    <div className="app">
      <div className="app-header">
        <h1>📁 File Explorer</h1>
        
        <SearchBar 
          onSearchResult={handleSearchResult}
          onNavigateToFile={navigateToFile}
          allItems={allItems}
        />
        
        <div className="header-navigation">
          <div className="breadcrumb">
            {!isSearchMode && generateBreadcrumb().map((crumb, index) => (
              <span key={index}>
                <button 
                  className="breadcrumb-item"
                  onClick={() => {
                    if (index === 0) {
                      navigateToPath('/');
                    } else {
                      const pathParts = generateBreadcrumb().slice(1, index);
                      const path = pathParts.length === 0 ? '/' : '/' + pathParts.join('/');
                      navigateToPath(path);
                    }
                  }}
                >
                  {crumb}
                </button>
                {index < generateBreadcrumb().length - 1 && <span> / </span>}
              </span>
            ))}
            {isSearchMode && (
              <span className="search-mode-indicator">
                🔍 Search Results ({searchResults.length} items)
              </span>
            )}
          </div>
          <div className="view-controls">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              🔲
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              📋
            </button>
          </div>
        </div>
      </div>

      <div className="app-body">
        <Sidebar 
          currentPath={currentPath}
          onNavigate={navigateToPath}
          stats={stats}
        />
        
        <div className="main-content">
          <div className="toolbar">
            <div className="toolbar-left">
              {!isSearchMode && (
                <button 
                  onClick={navigateUp} 
                  disabled={currentPath === '/'}
                  className="nav-button"
                >
                  ⬆️ Up
                </button>
              )}
              {isSearchMode && (
                <button 
                  onClick={() => {
                    setIsSearchMode(false);
                    setSearchResults([]);
                    const items = getItemsInPath(currentPath);
                    setCurrentItems(items);
                  }}
                  className="nav-button"
                >
                  ❌ Clear Search
                </button>
              )}
              {selectedItems.length > 0 && (
                <span className="selection-info">
                  {selectedItems.length} item(s) selected
                  <button onClick={clearSelection} className="clear-selection">
                    ✖️
                  </button>
                </span>
              )}
            </div>
            <div className="toolbar-right">
              <span className="stats-info">
                📁 {stats.folders} folders • 📄 {stats.files} files
                {isSearchMode && <span className="search-indicator"> • 🔍 Search Mode</span>}
              </span>
            </div>
          </div>

          <div className={`content-area ${viewMode}`} onContextMenu={(e) => handleContextMenu(e)}>
            {viewMode === 'grid' ? (
              <div className="folder-grid">
                {currentItems.map(item => (
                  <FolderCard
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onSelect={() => toggleItemSelection(item.id)}
                    onOpen={item.type === 'folder' ? 
                      () => {
                        if (isSearchMode) {
                          const folderPath = item.parentPath ? `${item.parentPath}/${item.name}` : `/${item.name}`;
                          navigateToPath(folderPath);
                        } else {
                          navigateToFolder(item.name);
                        }
                      } : 
                      () => openFile(item)
                    }
                    onContextMenu={(e) => handleContextMenu(e, item)}
                  />
                ))}
              </div>
            ) : (
              <FileList
                items={currentItems}
                selectedItems={selectedItems}
                onItemSelect={toggleItemSelection}
                onItemOpen={(item) => {
                  if (item.type === 'folder') {
                    if (isSearchMode) {
                      const folderPath = item.parentPath ? `${item.parentPath}/${item.name}` : `/${item.name}`;
                      navigateToPath(folderPath);
                    } else {
                      navigateToFolder(item.name);
                    }
                  } else {
                    openFile(item);
                  }
                }}
                onContextMenu={handleContextMenu}
                isSearchMode={isSearchMode}
              />
            )}
            
            {currentItems.length === 0 && (
              <div className="empty-folder">
                {isSearchMode ? (
                  <p>🔍 No search results found</p>
                ) : (
                  <p>📂 This folder is empty</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ContextMenu
        isVisible={contextMenu.isVisible}
        position={contextMenu.position}
        item={contextMenu.item}
        onClose={handleCloseContextMenu}
        onRename={handleRename}
        onMove={handleMove}
        onCreateFolder={handleCreateFolder}
        onCopy={handleCopy}
        onCut={handleCut}
        onPaste={handlePaste}
        clipboardItem={clipboard.item}
      />

      <RenameModal
        isVisible={renameModal.isVisible}
        item={renameModal.item}
        onClose={() => setRenameModal({ isVisible: false, item: null })}
        onConfirm={handleRenameConfirm}
      />

      <MoveModal
        isVisible={moveModal.isVisible}
        items={moveModal.items}
        allFolders={fileSystemData.folders}
        currentPath={currentPath}
        onClose={() => setMoveModal({ isVisible: false, items: [] })}
        onConfirm={handleMoveConfirm}
      />
    </div>
  );
}

export default App;