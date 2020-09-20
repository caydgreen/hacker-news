import React, { useState, useEffect } from 'react';
import StoryCard from '../StoryCard/StoryCard';
import styles from './StoryList.module.css';

const StoryList = ({items}) => {
  return (
    <>
    <div className={styles.storyList}>
      {items.map(story => (
        <StoryCard
          key={story.id}
          id={story.id}
          title={story.title}
          author={story.by}
          url={story.url}
          timestamp={story.time}
          comments={story.kids}>
        </StoryCard>
      ))}
    </div>
    </>
  );
};

export default StoryList;
