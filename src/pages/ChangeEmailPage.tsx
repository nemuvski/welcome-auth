import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import Header from '../components/Header';
import { changeEmail } from '../libs/Authenticaton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/Firebase';
import ErrorMessage from '../components/ErrorMessage';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { Controller, useForm } from 'react-hook-form';
import PasswordTextField from '../components/PasswordTextField';

type FormFields = {
  newEmail: string;
  password: string;
};

const useStyles = makeStyles({
  input: {
    marginBottom: 16,
  },
});

const ChangeEmailPage: React.FC = () => {
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
      newEmail: '',
      password: '',
    } as FormFields,
  });

  // Userオブジェクトがない場合は非表示
  if (!user) return null;

  const submit = async (formFields: FormFields) => {
    const { newEmail, password } = formFields;
    if (!password) {
      setErrorMessage('新しいメールアドレスとパスワードを入力してください。');
      return;
    } else if (user.email === newEmail) {
      setErrorMessage('前のメールアドレスと同じです。');
      return;
    }

    try {
      if (user.email) {
        await changeEmail(user, newEmail, password);
        setSnackbarMessage('メールアドレスを変更しました。再度メールアドレスの認証が必要です。');
        history.push('/');
      } else {
        setErrorMessage('処理が中断されました。再度ログインして試してください。');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Header title='メールアドレス変更' />

      <CardContent>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Box textAlign='center' marginBottom='16px'>
          新しいメールアドレスを入力してください。
        </Box>
        <Box textAlign='center' marginBottom='16px'>
          <Typography variant='body2' color='textSecondary'>
            現在のメールアドレス: {user.email}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(submit)}>
          <Controller
            control={control}
            name='newEmail'
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                className={classes.input}
                variant='outlined'
                label='新しいメールアドレス'
                type='email'
                size='small'
                value={value}
                onChange={onChange}
                fullWidth
                required
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <PasswordTextField helperText='変更にはパスワードが必要です。' onChange={onChange} value={value} />
            )}
          />
          <Box width='100%' display='flex' alignItems='center' justifyContent='space-evenly' marginTop='16px'>
            <Button variant='outlined' size='medium' component={Link} to='/' disabled={isSubmitting}>
              戻る
            </Button>
            <Button
              disabled={Boolean(errors.newEmail) || Boolean(errors.password) || isSubmitting}
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

export default ChangeEmailPage;
