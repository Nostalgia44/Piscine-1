import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearchResult, onNavigateToFile, allItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recursive search function
  const searchInItems = (items, term, currentPath = '') => {
    const results = [];
    
    for (const item of items) {
      const itemPath = currentPath ? `${currentPath}/${item.name}` : item.name;
      
      // Check if item name matches search term
      if (item.name.toLowerCase().includes(term.toLowerCase())) {
        results.push({
          ...item,
          path: itemPath,
          parentPath: currentPath || '/'
        });
      }
      
      // Search in children if it's a folder
      if (item.type === 'folder' && item.children) {
        const childResults = searchInItems(item.children, term, itemPath);
        results.push(...childResults);
      }
    }
    
    return results;
  };

  // Perform search
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay for better UX
    const searchTimeout = setTimeout(() => {
      const results = searchInItems(allItems, searchTerm.trim());
      setSearchResults(results.slice(0, 20)); // Limit to 20 results
      setShowResults(true);
      setIsSearching(false);
      
      // Notify parent component about search results
      if (onSearchResult) {
        onSearchResult(results);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm, allItems, onSearchResult]);

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchTerm('');
    if (onNavigateToFile) {
      onNavigateToFile(result);
    }
  };

  const getFileIcon = (item) => {
    if (item.type === 'folder') return '📁';
    
    const extension = item.name.split('.').pop().toLowerCase();
    const iconMap = {
      'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️',
      'mp4': '🎥', 'avi': '🎥', 'mov': '🎥',
      'mp3': '🎵', 'wav': '🎵', 'flac': '🎵',
      'pdf': '📄', 'doc': '📝', 'docx': '📝', 'txt': '📃',
      'xls': '📊', 'xlsx': '📊', 'csv': '📊',
      'zip': '🗜️', 'rar': '🗜️',
      'exe': '⚙️', 'msi': '⚙️',
      'js': '💻', 'jsx': '💻', 'ts': '💻', 'html': '🌐', 'css': '🎨'
    };
    
    return iconMap[extension] || '📄';
  };

  const formatFileSize = (size) => {
    if (!size) return '';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    
    return parseFloat((size / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        React.createElement('mark', { key: index, className: 'search-highlight' }, part) : 
        part
    );
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
    if (onSearchResult) {
      onSearchResult([]);
    }
  };

  return React.createElement('div', { className: 'search-container', ref: searchRef },
    React.createElement('div', { className: 'search-input-container' },
      React.createElement('span', { className: 'search-icon' }, '🔍'),
      React.createElement('input', {
        type: 'text',
        className: 'search-input',
        placeholder: 'Search files and folders...',
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        onFocus: () => searchTerm.length >= 2 && setShowResults(true)
      }),
      searchTerm && React.createElement('button', {
        className: 'search-clear',
        onClick: clearSearch,
        title: 'Clear search'
      }, '✖️'),
      isSearching && React.createElement('span', { className: 'search-loading' }, '⏳')
    ),

    showResults && React.createElement('div', { className: 'search-results', ref: resultsRef },
      React.createElement('div', { className: 'search-results-header' },
        React.createElement('span', null, `Search Results (${searchResults.length})`)
      ),
      
      React.createElement('div', { className: 'search-results-body' },
        searchResults.length > 0 ? (
          searchResults.map((result, index) =>
            React.createElement('div', {
              key: `${result.path}-${index}`,
              className: 'search-result-item',
              onClick: () => handleResultClick(result)
            },
              React.createElement('div', { className: 'result-main' },
                React.createElement('span', { className: 'result-icon' }, getFileIcon(result)),
                React.createElement('div', { className: 'result-info' },
                  React.createElement('div', { className: 'result-name' },
                    highlightMatch(result.name, searchTerm)
                  ),
                  React.createElement('div', { className: 'result-path' },
                    '📍 ', result.parentPath === '/' ? 'Root' : result.parentPath
                  )
                )
              ),
              React.createElement('div', { className: 'result-meta' },
                result.type === 'file' && result.size && React.createElement('span', { className: 'result-size' }, formatFileSize(result.size)),
                React.createElement('span', { className: 'result-type' },
                  result.type === 'folder' ? 'Folder' : 'File'
                )
              )
            )
          )
        ) : (
          React.createElement('div', { className: 'search-no-results' },
            React.createElement('span', null, `📭 No results found for "${searchTerm}"`),
            React.createElement('p', null, 'Try different keywords or check your spelling')
          )
        )
      ),

      searchResults.length >= 20 && React.createElement('div', { className: 'search-results-footer' },
        React.createElement('span', null, 'Showing first 20 results. Refine your search for more specific results.')
      )
    )
  );
};

export default SearchBar;