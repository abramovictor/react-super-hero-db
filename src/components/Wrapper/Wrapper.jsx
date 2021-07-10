import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    border: `1px solid ${theme.palette.divider}`,
    background: 'transparent',
  },
}));

export const Wrapper = props => {
  const { children } = props;

  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper} variant={'elevation'}>
      {children}
    </Paper>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Wrapper.displayName = 'Wrapper';
}
