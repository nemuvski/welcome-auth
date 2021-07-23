import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/Firebase';
import { Button, makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { sendEmailVerification } from '../libs/Authenticaton';
import ErrorMessage from './ErrorMessage';
import { Alert } from '@material-ui/lab';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles({
  root: {
    marginBottom: 24,
  },
});

const NoticeEmailVerification: React.FC = () => {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  // メールアドレスが認証済の場合は非表示
  if (!user || user.emailVerified) return null;

  const handleClickSendEmail = async () => {
    try {
      await sendEmailVerification(user);
      setErrorMessage(undefined);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Alert
        className={classes.root}
        severity='info'
        icon={<VerifiedUserIcon color='inherit' />}
        action={
          <Button size='small' color='inherit' startIcon={<SendIcon />} onClick={handleClickSendEmail}>
            認証メール送信
          </Button>
        }
      >
        メールアドレスの認証をしてください。
      </Alert>
    </>
  );
};

export default NoticeEmailVerification;
