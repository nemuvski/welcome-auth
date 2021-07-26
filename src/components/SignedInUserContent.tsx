import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CardContent, makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import EditIcon from '@material-ui/icons/Edit';
import { signOut } from '../libs/Authenticaton';
import NoticeEmailVerification from './NoticeEmailVerification';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/Firebase';

const useStyles = makeStyles({
  input: {
    marginBottom: 16,
  },
});

const SignedInUserContent: React.FC = () => {
  const classes = useStyles();
  const [user] = useAuthState(auth);

  // Userオブジェクトがない場合は非表示
  if (!user) return null;

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
        startIcon={<EditIcon />}
        component={Link}
        to='/change-email'
        disabled={!user.emailVerified}
        fullWidth
      >
        メールアドレス変更
      </Button>
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
