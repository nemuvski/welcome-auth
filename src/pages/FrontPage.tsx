import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CardActions, CardContent, Typography } from '@material-ui/core';
import Header from '../components/Header';
import EmailAndPasswordForm from '../components/EmailAndPasswordForm';

const FrontPage: React.FC = () => {
  return (
    <>
      <Header title='ようこそ！' />
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
  );
};

export default FrontPage;
