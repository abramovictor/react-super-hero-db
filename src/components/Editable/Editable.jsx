import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { InputBase } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'block',
    width: '100%',
  },
});

export const Editable = props => {
  const { contentEditable, value, onChange } = props;
  const styles = useStyles();

  const handleChange = event => {
    onChange(event.target.value ? event.target.value : '');
  };

  return (
    <InputBase
      readOnly={!contentEditable}
      value={value}
      className={styles.root}
      onChange={handleChange}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  Editable.displayName = 'Editable';
}
