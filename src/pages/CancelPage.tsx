import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardContent } from '@material-ui/core';
import Header from '../components/Header';
import { cancelUser } from '../libs/Authenticaton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/Firebase';
import ErrorMessage from '../components/ErrorMessage';
import { SnackbarContext } from '../contexts/SnackbarContext';

const CancelPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { setSnackbarMessage } = useContext(SnackbarContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  if (!user) return null;

  const handleClickYes = async () => {
    try {
      await cancelUser(user);
      setSnackbarMessage('退会手続きが完了しました。ご利用いただきありがとうございました。');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Header title='退会手続き' />

      <CardContent>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Box textAlign='center' marginBottom='16px'>
          アカウントを削除しますか？
        </Box>
        <Box width='100%' display='flex' alignItems='center' justifyContent='space-evenly'>
          <Button variant='outlined' size='medium' color='primary' component={Link} to='/'>
            いいえ
          </Button>
          <Button variant='outlined' size='medium' color='secondary' onClick={handleClickYes}>
            はい
          </Button>
        </Box>
      </CardContent>
    </>
  );
};

export default CancelPage;
