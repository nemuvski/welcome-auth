import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, CardContent } from '@material-ui/core';
import { signOut } from '../libs/Authenticaton';
import NoticeEmailVerification from './NoticeEmailVerification';

const SignedInUserContent: React.FC = () => {
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
      <NoticeEmailVerification />

      <Button variant='outlined' size='medium' onClick={handleClickSignOut} startIcon={<ExitToAppIcon />} fullWidth>
        ログアウト
      </Button>
    </CardContent>
  );
};

export default SignedInUserContent;
