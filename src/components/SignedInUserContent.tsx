import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, CardContent } from '@material-ui/core';
import { signOut } from '../libs/Authenticaton';
import { auth } from '../libs/Firebase';

const SignedInUserContent: React.FC = () => {
  const [user] = useAuthState(auth);
  if (!user) return null;

  /**
   * ログアウトボタン押下時の処理
   */
  const handleClickSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CardContent>
      <Button
        variant='outlined'
        color='secondary'
        size='medium'
        onClick={handleClickSignOut}
        startIcon={<ExitToAppIcon />}
        fullWidth
      >
        ログアウト
      </Button>
    </CardContent>
  );
};

export default SignedInUserContent;
