import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import firebase from '../../utilities/base';
import hackerNews from '../../constants/hackerNews';
import Button from '../Button/Button';
import CommentsList from '../CommentsList/CommentsList';

import styles from './StoryCard.module.css';

const StoryCard = ({
  id, title, author, url, timestamp, comments,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const commentCount = comments ? comments.length : 0;

  const toggleComments = (ids) => {
    if (!showComments) {
      fetchComments(ids);
    }
    setShowComments(!showComments);
  };

  const fetchComments = (commentIds) => {
    setCommentsLoading(true);
    // Get last five comments
    const latestComments = commentIds.slice(0, 5).map((id) => fetchComment(id));
    const results = Promise.all(latestComments);
    results.then((data) => {
      setCommentsList(data);
      setCommentsLoading(false);
      setShowComments(!showComments);
    });
  };

  const fetchComment = (id) =>
    // TODO: use fetchy
    new Promise((resolve) => {
      firebase.fetch(`/${hackerNews.DB_VERSION}/item/${id}`, {
        then(data) {
          const item = data;
          resolve(item);
        },
        // TODO: handle error
      });
    });
  return (
    <div className={styles.card}>
      <a
        rel="noreferrer noopener"
        href={url}
        target="_blank"
        className={styles.title}
      >
        <h2>
          {title}
        </h2>
      </a>
      <div className={styles.info}>
        <div className={styles.author}>
          by:
          {' '}
          {author}
        </div>
        <div className={styles.timestamp}>
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </div>
      {commentCount >= 1 && (
        <Button
          className={styles.commentButton}
          onClick={() => toggleComments(comments)}
        >
          {showComments ? 'Collapse Comments' : `Comments (${commentCount})`}
        </Button>
      )}
      {commentsLoading && (
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={40}
        width={40}
        className={styles.loader}
      />
      )}
      {showComments && (
        <CommentsList items={commentsList} />
      )}
    </div>
  );
};

export default StoryCard;
