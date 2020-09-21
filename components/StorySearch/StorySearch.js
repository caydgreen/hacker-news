import React, { useState, useEffect } from 'react';
import styles from './StorySearch.module.css';

const StorySearch = ({ items }) => {
  const [searchTerm, updateSearchTerm] = useState();
  const [searchResults, updateSearchResults] = useState([]);
  const handleInputChange = (event) => {
    updateSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const results = items
      .filter((story) => story.title.toLowerCase().match(`\\b${searchTerm}`));

    updateSearchResults(results);
  }, [searchTerm]);

  return (
    <div className={styles.storySearch}>
      <input
        type="search"
        placeholder="Search stories..."
        className={styles.seatchBar}
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchResults.length >= 1 && searchTerm !== '' && (
        <div className={styles.results}>
          {searchResults.map((story) => (
            <div className={styles.result}>
              <a href={story.url} key={story.id}>
                {story.title.length <= 10 ? story.title : `${story.title.slice(0, 15)}...`}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorySearch;
