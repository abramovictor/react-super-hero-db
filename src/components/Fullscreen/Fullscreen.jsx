import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.modal,
  },
  inner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export const Fullscreen = props => {
  const { children } = props;
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Fullscreen.displayName = 'Fullscreen';
}
