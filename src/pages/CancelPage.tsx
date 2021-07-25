import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardContent, IconButton, InputAdornment, TextField } from '@material-ui/core';
import Header from '../components/Header';
import { cancelUser, signIn } from '../libs/Authenticaton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/Firebase';
import ErrorMessage from '../components/ErrorMessage';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { Controller, useForm } from 'react-hook-form';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

type FormFields = {
  password: string;
};

const CancelPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { setSnackbarMessage } = useContext(SnackbarContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
    } as FormFields,
  });

  // Userオブジェクトがない場合は非表示
  if (!user) return null;

  const submit = async (formFields: FormFields) => {
    const { password } = formFields;
    if (!password) {
      setErrorMessage('パスワードを入力してください。');
    }

    try {
      if (user.email) {
        await signIn(user.email, password);
        await cancelUser(user);
        setSnackbarMessage('退会手続きが完了しました。ご利用いただきありがとうございました。');
      } else {
        setErrorMessage('処理が中断されました。再度ログインして試してください。');
      }
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
          <br />
          パスワードを入力してください。
        </Box>

        <form onSubmit={handleSubmit(submit)}>
          <Controller
            control={control}
            name='password'
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant='outlined'
                label='パスワード'
                type={showPassword ? 'text' : 'password'}
                size='small'
                value={value}
                onChange={onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
              />
            )}
          />

          <Box width='100%' display='flex' alignItems='center' justifyContent='space-evenly' marginTop='16px'>
            <Button variant='outlined' size='medium' color='primary' component={Link} to='/'>
              戻る
            </Button>
            <Button
              disabled={Boolean(errors.password)}
              type='submit'
              variant='outlined'
              size='medium'
              color='secondary'
            >
              削除
            </Button>
          </Box>
        </form>
      </CardContent>
    </>
  );
};

export default CancelPage;
