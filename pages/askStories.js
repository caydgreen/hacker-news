import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import Loader from 'react-loader-spinner';
import styles from '../styles/Page.module.css';

import fetchy from '../utilities/fetchy';
import hackerNews from '../constants/hackerNews';
import firebase from '../utilities/base';

import Footer from '../components/Footer/Footer';
import StoryList from '../components/StoryList/StoryList';
import StorySearch from '../components/StorySearch/StorySearch';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';

export default function askStories() {
  const [storiesList, setStoriesList] = useState([]);
  const [storiesPerPage, updateStoriesPerPage] = useState(10);
  const [offset, updateOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, updateSortBy] = useState();

  const fetchAskStories = () => {
    fetchy(
      {
        endpoint: '/askstories',
      },
      (response) => {
        // only return the paginated amount with offset
        setTotal(response.length);
        const storyIds = response.slice(offset, offset + storiesPerPage).map((story) => fetchStory(story));
        const results = Promise.all(storyIds);
        results.then((data) => {
          setStoriesList(data);
          setIsLoading(false);
        });
      },
    );
  };

  const fetchStory = (id, index) =>
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
    fetchAskStories();
  }, [offset, storiesPerPage]);

  useEffect(() => {
    if (sortBy === 'title') {
      const sortedStories = [...storiesList].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
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
        timeout={8000}
        className={styles.loader}
      />
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Ask Stories</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.headerControls} />
        <a href="/" className={styles.back}>
          Back to menu
        </a>
        <StorySearch items={storiesList} />
        <h1 className={styles.title}>
          Ask Stories
        </h1>
        <div className={styles.sortOpts}>
          <Button onClick={() => updateSortBy('score')}> Score </Button>
          <Button onClick={() => updateSortBy('title')}> Title </Button>
          <Button onClick={() => updateSortBy('time')}> Date </Button>
        </div>
        <StoryList items={storiesList} />
        <Pagination
          currentLimit={storiesPerPage}
          offset={offset}
          total={total}
          updateOffset={updateOffset}
          updateStoriesPerPage={updateStoriesPerPage}
        />
      </main>
      <Footer />
    </div>
  );
}
