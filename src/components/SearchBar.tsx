import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (query.length > 2) {
        setIsLoading(true);
        try {
          const response = await fetch('/api/suggest-prompt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ initialQuery: query }),
          });
          const data = await response.json();
          setSuggestions(data.questionVariations.map((v: any) => v.question));
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
        setIsLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 500); // Debounce delay

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your research topic"
          className="search-input"
        />
        <button className="search-button">
          <span className="arrow-icon">→</span>
        </button>
      </div>
      
      {isLoading && (
        <div className="suggestions-loading">
          Loading suggestions...
        </div>
      )}

      {suggestions.length > 0 && !isLoading && (
        <div className="suggestions-container">
          <div className="suggestions-header">
            Suggested research questions:
          </div>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => setQuery(suggestion)}
            >
              <span className="suggestion-icon">💡</span>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 