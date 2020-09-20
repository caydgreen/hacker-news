import Rebase from 're-base';
import firebase from 'firebase';
import hackerNews from '../constants/hackerNews';

// There is a bug with firebase and next.js reinitializing
// so I have added a hack to always create a new app
const firebaseApp = firebase.initializeApp(
  { databaseURL: hackerNews.DATABASE_URL },
    `hackernews${Date.now()}`
  );

const base = Rebase.createClass(firebaseApp.database())

export default base;
