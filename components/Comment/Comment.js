import styles from './Comment.module.css';

const Comment = ({id, text, author, timestamp }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.info}>
        <div className={styles.author}>
          {author}
        </div>
        <div className={styles.timestamp}>
          {new Date(timestamp).toUTCString()}
        </div>
      </div>
      <div className={styles.text}>
        {text}
      </div>
    </div>
  );
};

export default Comment;
