import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CardActions, CardContent, Typography } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '../components/Header';
import EmailAndPasswordForm from '../components/EmailAndPasswordForm';
import { auth } from '../libs/Firebase';
import SignedInUserContent from '../components/SignedInUserContent';

const FrontPage: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Header title='ようこそ！' />

      {/* ログイン済か否かで表示内容を切り替える */}
      {user ? (
        <SignedInUserContent />
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
              <Typography color='textSecondary' align='center' component='p' variant='body2'>
                パスワードをお忘れですか？ <Link to='/forgot-password'>パスワード再設定はこちら</Link>
              </Typography>
            </Box>
          </CardActions>
        </>
      )}
    </>
  );
};

export default FrontPage;
