import React from 'react';
import { CardHeader, makeStyles } from '@material-ui/core';

type Props = {
  title: string;
};

const useStyles = makeStyles({
  root: {
    marginBottom: 8,
    backgroundColor: '#3f51b5',
    color: '#fff',
    textAlign: 'center',
    fontSize: '1.25rem',
  },
});

const Header: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  return <CardHeader title={title} className={classes.root} disableTypography />;
};

export default Header;
