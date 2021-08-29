import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardContent } from '@material-ui/core';
import Header from '../components/Header';
import { cancelUser } from '../libs/Authenticaton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/Firebase';
import ErrorMessage from '../components/ErrorMessage';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { Controller, useForm } from 'react-hook-form';
import PasswordTextField from '../components/PasswordTextField';

type FormFields = {
  password: string;
};

const CancelPage: React.FC = () => {
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
      password: '',
    } as FormFields,
  });

  // Userオブジェクトがない場合は非表示
  if (!user) return null;

  const submit = async (formFields: FormFields) => {
    const { password } = formFields;
    if (!password) {
      setErrorMessage('パスワードを入力してください。');
      return;
    }

    try {
      if (user.email) {
        await cancelUser(user, password);
        setSnackbarMessage('退会手続きが完了しました。ご利用いただきありがとうございました。');
      } else {
        setErrorMessage('処理が中断されました。再度ログインして試してください。');
      }
    } catch (error: any) {
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
            render={({ field: { onChange, value } }) => <PasswordTextField onChange={onChange} value={value} />}
          />
          <Box width='100%' display='flex' alignItems='center' justifyContent='space-evenly' marginTop='16px'>
            <Button variant='outlined' size='medium' component={Link} to='/' disabled={isSubmitting}>
              戻る
            </Button>
            <Button
              disabled={Boolean(errors.password) || isSubmitting}
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
