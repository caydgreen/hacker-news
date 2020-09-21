import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from '../../styles/Page.module.css';

export default class Page extends Component {
  render() {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          <div>
            {this.props.children}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}
