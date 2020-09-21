import Button from '../Button/Button';

import styles from './Pagination.module.css';

const Pagination = ({
  currentLimit, offset, total, updateOffset, updateStoriesPerPage,
}) => (
  <div className={styles.paginationOptions}>
    <Button
      onClick={() => updateOffset(offset - currentLimit)}
      disabled={!(offset > 0)}
    >
      &larr;
    </Button>
    <div className={styles.perPage}>
      <div className={styles.prompt}>
        Stories per page
      </div>
      <div className={styles.pageLimit}>
        <Button
          active={currentLimit === 10}
          onClick={() => updateStoriesPerPage(10)}
        >
          10
        </Button>
        <Button
          active={currentLimit === 25}
          onClick={() => updateStoriesPerPage(25)}
        >
          25
        </Button>
        <Button
          active={currentLimit === 50}
          onClick={() => updateStoriesPerPage(50)}
        >
          50
        </Button>
      </div>
    </div>
    <Button
      onClick={() => updateOffset(offset + currentLimit)}
      disabled={!(total > offset + currentLimit)}
    >
      &rarr;
    </Button>
  </div>
);

export default Pagination;
