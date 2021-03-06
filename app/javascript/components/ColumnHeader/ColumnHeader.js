import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

import useStyles from './useStyles';

const ColumnHeader = ({ column, onLoadMore }) => {
  const styles = useStyles();

  const {
    id,
    title,
    cards,
    meta: { totalCount, currentPage },
  } = column;

  const count = cards.length;

  const handleLoadMore = () => onLoadMore(id, currentPage + 1);

  function SmartButton() {
    if (count == totalCount) {
      return <div></div>;
    } else {
      return (
        <IconButton aria-label="Load more" onClick={() => handleLoadMore()}>
          <SystemUpdateAltIcon fontSize="small" />
        </IconButton>
      );
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <b>{title}</b> ({count}/{totalCount || '…'})
      </div>
      <div className={styles.actions}>
        <SmartButton />
      </div>
    </div>
  );
};

ColumnHeader.propTypes = {
  column: PropTypes.shape().isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ColumnHeader;
