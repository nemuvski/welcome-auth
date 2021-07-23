import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '../components/Header';
import EmailAndPasswordForm from '../components/EmailAndPasswordForm';
import { auth } from '../libs/Firebase';
import { signOut } from '../libs/Authenticaton';

const FrontPage: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleClickSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title='ようこそ！' />

      {/* ログイン済か否かで表示内容を切り替える */}
      {user ? (
        <CardContent>
          <Button
            variant='outlined'
            color='secondary'
            size='medium'
            onClick={handleClickSignOut}
            startIcon={<ExitToAppIcon />}
            fullWidth
          >
            ログアウト
          </Button>
        </CardContent>
      ) : (
        <>
          <CardContent>
            <EmailAndPasswordForm />
          </CardContent>
          <CardActions>
            <Box width='100%'>
              <Typography color='textSecondary' align='center' component='p' variant='body2'>
                アカウントはお持ちですか？ <Link to='/sign-up'>新規登録はこちら</Link>
              </Typography>
            </Box>
          </CardActions>
        </>
      )}
    </>
  );
};

export default FrontPage;
