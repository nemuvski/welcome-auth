import React from 'react';
import { Card, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: 16,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
    padding: 0,
  },
});

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.contentWrapper}>{children}</Card>
    </div>
  );
};

export default Layout;
