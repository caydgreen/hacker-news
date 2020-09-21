import Comment from '../Comment/Comment';
import styles from './CommentsList.module.css';

const CommentsList = ({ items }) => (
  <div className={styles.CommentsList}>
    {items.map((comment) => (
      <Comment
        key={comment.id}
        id={comment.id}
        text={comment.text}
        author={comment.by}
        timestamp={comment.time}
      />
    ))}
  </div>
);

export default CommentsList;
