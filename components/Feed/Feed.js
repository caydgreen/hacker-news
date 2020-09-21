import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import styles from '../../styles/Page.module.css';

import fetchy from '../../utilities/fetchy';
import hackerNews from '../../constants/hackerNews';
import firebase from '../../utilities/base';

import StoryList from '../StoryList/StoryList';
import StorySearch from '../StorySearch/StorySearch';
import Pagination from '../Pagination/Pagination';
import Button from '../Button/Button';

const Feed = ({ query }) => {
  const [storiesList, setStoriesList] = useState([]);
  const [storiesPerPage, updateStoriesPerPage] = useState(10);
  const [offset, updateOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, updateSortBy] = useState('');

  const fetchNewStories = () => {
    const storyType = query.toLowerCase();

    fetchy(
      {
        endpoint: `/${storyType}stories`,
      },
      (response) => {
        // only return the paginated amount with offset
        setTotal(response.length);
        const storyIds = response
          .slice(offset, offset + storiesPerPage)
          .map((story) => fetchStory(story));
        const results = Promise.all(storyIds);
        results.then((data) => {
          setStoriesList(data);
          setIsLoading(false);
        });
      },
    );
  };

  const fetchStory = (id) =>
    // TODO: use fetchy
    new Promise((resolve) => {
      firebase.fetch(`/${hackerNews.DB_VERSION}/item/${id}`, {
        then(data) {
          const item = data;
          resolve(item);
        },
      });
    });

  useEffect(() => {
    const sortSetting = localStorage.getItem('sort-setting');
    const perPageSetting = localStorage.getItem('stories-setting');
    updateSortBy(sortSetting);
    updateStoriesPerPage(perPageSetting);
  }, []);

  useEffect(() => {
    // Set local storage for refresh
    localStorage.setItem('sort-setting', sortBy);
    localStorage.setItem('stories-setting', storiesPerPage);
  }, [sortBy, storiesPerPage]);

  useEffect(() => {
    fetchNewStories();
  }, [offset, storiesPerPage]);

  useEffect(() => {
    if (sortBy === 'title') {
      const sortedStories = [...storiesList]
        .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      setStoriesList(sortedStories);
    } else {
      const sortedStories = [...storiesList].sort((a, b) => b[sortBy] - a[sortBy]);
      setStoriesList(sortedStories);
    }
  }, [sortBy, offset, storiesPerPage]);

  if (isLoading) {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        className={styles.loader}
      />
    );
  }
  return (
    <div className={styles.feed}>
      <StorySearch items={storiesList} />
      <h1 className={styles.title}>
        {query}
        {' '}
        Stories
      </h1>
      <div className={styles.sortOpts}>
        <Button
          active={sortBy === 'score'}
          onClick={() => updateSortBy('score')}
        >
          {' '}
          Score
        </Button>
        <Button
          active={sortBy === 'title'}
          onClick={() => updateSortBy('title')}
        >
          {' '}
          Title
        </Button>
        <Button
          active={sortBy === 'time'}
          onClick={() => updateSortBy('time')}
        >
          {' '}
          Date
        </Button>
      </div>
      <StoryList items={storiesList} />
      <Pagination
        currentLimit={storiesPerPage}
        offset={offset}
        total={total}
        updateOffset={updateOffset}
        updateStoriesPerPage={updateStoriesPerPage}
      />
    </div>
  );
};

export default Feed;
