Jobimport React, { useState, useEffect } from 'react';
import Head from 'next/head';

import styles from '../styles/Page.module.css';

import fetchy from '../utilities/fetchy';
import hackerNews from '../constants/hackerNews';
import firebase from '../utilities/base';
import Loader from 'react-loader-spinner';

import Footer from '../components/Footer/Footer';
import StoryList from '../components/StoryList/StoryList';
import StorySearch from '../components/StorySearch/StorySearch';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';

export default function jobStories() {
  const [storiesList, setStoriesList] = useState([]);
  const [storiesPerPage, updateStoriesPerPage] = useState(10);
  const [offset, updateOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, updateSortBy] = useState();

  const fetchJobStories = () => {
    fetchy(
      {
        endpoint: `/jobstories`,
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
    fetchJobStories();
  }, [offset, storiesPerPage]);

  useEffect(() => {
    if (sortBy === 'title') {
      let sortedStories = [...storiesList].sort(function (a, b) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });
      setStoriesList(sortedStories);
    } else {
      let sortedStories = [...storiesList].sort((a, b) => {
        return b[sortBy] - a[sortBy];
      });
      setStoriesList(sortedStories);
    }

  }, [sortBy, offset, storiesPerPage]);


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
          <title>Job Stories</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.headerControls} />
          <a href='/' className={styles.back}>
            Back to menu
          </a>
          <StorySearch items={storiesList} />
          <h1 className={styles.title}>
            Job Stories
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
            updateStoriesPerPage={updateStoriesPerPage}/>
        </main>
        <Footer />
      </div>
    )
  }
}
