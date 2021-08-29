import React, { useContext, useState } from 'react';
import { Box, Button, CardContent, TextField } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';
import { sendPasswordResetEmail } from '../libs/Authenticaton';
import { SnackbarContext } from '../contexts/SnackbarContext';

type FormFields = {
  email: string;
};

const ForgotPasswordPage: React.FC = () => {
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
      email: '',
    } as FormFields,
  });

  const submit = async (formFields: FormFields) => {
    const { email } = formFields;
    if (!email) {
      setErrorMessage('メールアドレスを入力してください。');
      return;
    }

    try {
      await sendPasswordResetEmail(email);
      setSnackbarMessage('パスワード再設定の案内メールが送信されました。');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Header title='パスワードをお忘れですか？' />

      <CardContent>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Box textAlign='center' marginBottom='16px'>
          パスワードを再設定するアカウントのメールアドレスを入力後
          <br />
          送信ボタンを押してください。
        </Box>
        <Box textAlign='center' marginBottom='16px'>
          メールアドレス宛にパスワード再設定の案内メールが送信されます。
        </Box>

        <form onSubmit={handleSubmit(submit)}>
          <Controller
            control={control}
            name='email'
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant='outlined'
                label='メールアドレス'
                type='email'
                size='small'
                value={value}
                onChange={onChange}
                fullWidth
                required
              />
            )}
          />
          <Box width='100%' display='flex' alignItems='center' justifyContent='space-evenly' marginTop='16px'>
            <Button variant='outlined' size='medium' component={Link} to='/' disabled={isSubmitting}>
              戻る
            </Button>
            <Button
              disabled={Boolean(errors.email) || isSubmitting}
              type='submit'
              variant='outlined'
              size='medium'
              color='primary'
            >
              送信
            </Button>
          </Box>
        </form>
      </CardContent>
    </>
  );
};

export default ForgotPasswordPage;
