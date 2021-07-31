import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, CardContent, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/Firebase';
import ErrorMessage from '../components/ErrorMessage';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { Controller, useForm } from 'react-hook-form';
import PasswordTextField from '../components/PasswordTextField';
import { changePassword } from '../libs/Authenticaton';

type FormFields = {
  currentPassword: string;
  newPassword: string;
};

const useStyles = makeStyles({
  input: {
    marginBottom: 16,
  },
});

const ChangePasswordPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useAuthState(auth);
  const { setSnackbarMessage } = useContext(SnackbarContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    } as FormFields,
  });

  // Userオブジェクトがない場合は非表示
  if (!user) return null;

  const submit = async (formFields: FormFields) => {
    const { currentPassword, newPassword } = formFields;
    if (!currentPassword || !newPassword) {
      setErrorMessage('現在のパスワードとを入力してください。');
      return;
    }

    try {
      await changePassword(user, currentPassword, newPassword);
      setSnackbarMessage('パスワードを変更しました。');
      history.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Header title='パスワード変更' />

      <CardContent>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Box textAlign='center' marginBottom='16px'>
          現在のパスワードと新しいパスワードを入力してください。
        </Box>

        <form onSubmit={handleSubmit(submit)}>
          <Controller
            control={control}
            name='currentPassword'
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <PasswordTextField className={classes.input} label='現在のパスワード' onChange={onChange} value={value} />
            )}
          />
          <Controller
            control={control}
            name='newPassword'
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <PasswordTextField label='新しいパスワード' onChange={onChange} value={value} />
            )}
          />
          <Box width='100%' display='flex' alignItems='center' justifyContent='space-evenly' marginTop='16px'>
            <Button variant='outlined' size='medium' component={Link} to='/' disabled={isSubmitting}>
              戻る
            </Button>
            <Button
              disabled={Boolean(errors.currentPassword) || Boolean(errors.newPassword) || isSubmitting}
              type='submit'
              variant='outlined'
              size='medium'
              color='primary'
            >
              変更
            </Button>
          </Box>
        </form>
      </CardContent>
    </>
  );
};

export default ChangePasswordPage;
