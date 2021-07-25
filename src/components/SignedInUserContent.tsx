import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CardContent, makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { signOut } from '../libs/Authenticaton';
import NoticeEmailVerification from './NoticeEmailVerification';

const useStyles = makeStyles({
  input: {
    marginBottom: 16,
  },
});

const SignedInUserContent: React.FC = () => {
  const classes = useStyles();

  /**
   * ログアウトボタン押下時の処理
   */
  const handleClickSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CardContent>
      <NoticeEmailVerification />

      <Button
        className={classes.input}
        variant='outlined'
        size='medium'
        startIcon={<HowToVoteIcon />}
        component={Link}
        to='/cancel'
        fullWidth
      >
        退会手続き
      </Button>
      <Button variant='outlined' size='medium' onClick={handleClickSignOut} startIcon={<ExitToAppIcon />} fullWidth>
        ログアウト
      </Button>
    </CardContent>
  );
};

export default SignedInUserContent;
