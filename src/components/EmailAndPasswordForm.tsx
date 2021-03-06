import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { sendEmailVerification, signIn, signUp } from '../libs/Authenticaton';
import ErrorMessage from './ErrorMessage';
import { SnackbarContext } from '../contexts/SnackbarContext';
import PasswordTextField from './PasswordTextField';

type Props = {
  isSignUpMode?: boolean;
};

type FormFields = {
  email: string;
  password: string;
};

const useStyles = makeStyles({
  input: {
    marginBottom: 16,
  },
});

const passwordMinLength = 6;

const EmailAndPasswordForm: React.FC<Props> = ({ isSignUpMode = false }) => {
  const classes = useStyles();
  const { setSnackbarMessage } = useContext(SnackbarContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    } as FormFields,
  });

  /**
   * ボタン押下時の処理
   *
   * @param formFields 入力内容
   */
  const submit = async (formFields: FormFields) => {
    const { email, password } = formFields;
    // 送信前にここでもバリデーションをしておく
    if (!email || !password) {
      setErrorMessage('メールアドレスとパスワードを入力してください。');
      return;
    } else if (password.length < passwordMinLength) {
      setErrorMessage(`パスワードは${passwordMinLength}以上にしてください。`);
      return;
    }

    try {
      if (isSignUpMode) {
        const userCredential = await signUp(email, password);

        // 新規登録時に認証メールを送信する
        if (userCredential.user) {
          await sendEmailVerification(userCredential.user);
          setSnackbarMessage('認証メールが送信されました。');
        }
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <form onSubmit={handleSubmit(submit)}>
        <Controller
          control={control}
          name='email'
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              className={classes.input}
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
        <Controller
          control={control}
          name='password'
          rules={{ required: true, minLength: passwordMinLength }}
          render={({ field: { onChange, value } }) => (
            <PasswordTextField
              className={classes.input}
              value={value}
              onChange={onChange}
              helperText={`${passwordMinLength}文字以上の半角英数字記号`}
            />
          )}
        />
        <Box width='100%' textAlign='center'>
          <Button
            type='submit'
            variant='outlined'
            size='medium'
            color='primary'
            startIcon={<CheckIcon />}
            disabled={Boolean(errors.email) || Boolean(errors.password) || isSubmitting}
          >
            {isSignUpMode ? '登録' : 'ログイン'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EmailAndPasswordForm;
