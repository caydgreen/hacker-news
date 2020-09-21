import Link from 'next/link';
import Head from 'next/head';
import styles from './Header.module.css';

const Header = () => (
  <>
    <Head>
      <title>Hacker News</title>
    </Head>
    <div className={styles.menuHeader}>
      <div className={styles.back}>
        <Link href="/">
          Hacker News
        </Link>
      </div>
    </div>
  </>
);

export default Header;
