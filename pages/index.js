import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Page.module.css';

import firebase from '../utilities/base';
import fetchy from '../utilities/fetchy';
import hackerNews from '../constants/hackerNews';

import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hacker News</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://github.com/HackerNews/API">Hacker News</a>
        </h1>

        <div className={styles.grid}>
          <a href="/newStories" className={styles.card}>
            <h3>New Stories &rarr;</h3>
          </a>

          <a href="/topStories" className={styles.card}>
            <h3>Top Stories &rarr;</h3>
          </a>

          <a
            href="/bestStories"
            className={styles.card}
          >
            <h3>Best Stories &rarr;</h3>
          </a>

          <a
            href="/showStories"
            className={styles.card}
          >
            <h3>Show Stories &rarr;</h3>
          </a>

          <a
            href="/askStories"
            className={styles.card}
          >
            <h3>Ask Stories &rarr;</h3>
          </a>

          <a
            href="/jobStories"
            className={styles.card}
          >
            <h3>Job Stories &rarr;</h3>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
