import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import styles from '../../styles/Page.module.css';

import fetchy from '../../utilities/fetchy';
import hackerNews from '../../constants/hackerNews';
import firebase from '../../utilities/base';
import Loader from 'react-loader-spinner';

import Footer from '../Footer/Footer';
import StoryList from '../StoryList/StoryList';
import Pagination from '../Pagination/Pagination';

const StoryInterface = (query) => {
  const [storiesList, setStoriesList] = useState([]);
  const [storiesPerPage, updateStoriesPerPage] = useState(10);
  const [offset, updateOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const storyTitle = () => {
    return query.charAt(0).toUpperCase() + query.slice(1);
  };

  const fetchStories = () => {
    fetchy(
      {
        endpoint: `/${query}stories`,
      },
      (response) => {
        // only return the paginated amount with offset
        setTotal(response.length);
        let storyIds = response.slice(offset, offset + storiesPerPage).map(story => fetchStory(story));
        let results = Promise.all(storyIds);
        results.then(data => {
          setStoriesList(data);
          setIsLoading(false);
        }
        );
      }
    );
  };

  const fetchStory = (id, index) => {
    // TODO: use fetchy
    return new Promise(resolve => {
      firebase.fetch(`/${hackerNews.DB_VERSION}/item/${id}`, {
        then(data) {
          let item = data;
          resolve(item);
        }
      });
    });
  };

  useEffect(() => {
    fetchStories();
  }, [offset, storiesPerPage]);

  if (isLoading){
    return (
      <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={8000}
         className={styles.loader}
      />
    )
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>{storyTitle} Stories</title>
        </Head>
        <main className={styles.main}>
          <a href='/' className={styles.back}>
            Back to menu
          </a>
          <h1 className={styles.title}>
            <a href="https://github.com/HackerNews/API">{storyTitle} Stories</a>
          </h1>
            <Pagination
              currentLimit={storiesPerPage}
              offset={offset}
              total={total}
              updateOffset={updateOffset}
              updateStoriesPerPage={updateStoriesPerPage}/>
            <StoryList items={storiesList} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default StoryInterface;
