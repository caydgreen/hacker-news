import React from 'react';
import Link from 'next/link';
import styles from '../styles/Page.module.css';

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>
        <a href="https://github.com/HackerNews/API">Hacker News API</a>
      </h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <Link href="/newStories">
            <h3>New Stories &rarr;</h3>
          </Link>
        </div>

        <div className={styles.card}>
          <Link href="/topStories">
            <h3>Top Stories &rarr;</h3>
          </Link>
        </div>

        <div className={styles.card}>
          <Link
            href="/bestStories"
          >
            <h3>Best Stories &rarr;</h3>
          </Link>
        </div>

        <div className={styles.card}>
          <Link
            href="/showStories"
          >
            <h3>Show Stories &rarr;</h3>
          </Link>
        </div>

        <div className={styles.card}>
          <Link
            href="/askStories"
          >
            <h3>Ask Stories &rarr;</h3>
          </Link>
        </div>

        <div className={styles.card}>
          <Link
            href="/jobStories"
            className={styles.card}
          >
            <h3>Job Stories &rarr;</h3>
          </Link>
        </div>

      </div>
    </>
  );
}
