import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CardActions, CardContent, Typography } from '@material-ui/core';
import Header from '../components/Header';
import EmailAndPasswordForm from '../components/EmailAndPasswordForm';

const SignUpPage: React.FC = () => {
  return (
    <>
      <Header title='新規登録' />
      <CardContent>
        <EmailAndPasswordForm isSignUpMode={true} />
      </CardContent>
      <CardActions>
        <Box width='100%'>
          <Typography color='textSecondary' align='center' component='p' variant='body2'>
            アカウントはすでにお持ちですか？ <Link to='/'>ログインはこちら</Link>
          </Typography>
        </Box>
      </CardActions>
    </>
  );
};

export default SignUpPage;
