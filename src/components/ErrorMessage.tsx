import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    marginBottom: 24,
  },
});

const ErrorMessage: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Alert severity='error' className={classes.root}>
      {children}
    </Alert>
  );
};

export default ErrorMessage;
