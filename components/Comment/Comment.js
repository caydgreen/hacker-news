import styles from './Comment.module.css';

const Comment = ({
  id, text, author, timestamp,
}) => (
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
      {/* Replace this with a library to strip tags */}
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  </div>
);

export default Comment;
