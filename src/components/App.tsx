import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { Box, Card, CircularProgress } from '@material-ui/core';
import Layout from './Layout';
import FrontPage from '../pages/FrontPage';
import SignUpPage from '../pages/SignUpPage';
import ChangeEmailPage from '../pages/ChangeEmailPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import CancelPage from '../pages/CancelPage';
import NotFoundPage from '../pages/NotFoundPage';
import { auth } from '../libs/Firebase';
import { SnackbarProvider } from '../contexts/SnackbarContext';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

const App: React.FC = () => {
  const [user, initializing] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Layout>
        {initializing ? (
          <Box textAlign='center'>
            <CircularProgress />
          </Box>
        ) : (
          <SnackbarProvider>
            <Card>
              <Routes>
                {/* フロント */}
                <Route path='/' element={<FrontPage />} />

                {/* 新規登録 */}
                <Route path='/sign-up' element={user ? <Navigate replace to='/' /> : <SignUpPage />} />

                {/* パスワード再設定 */}
                <Route path='/forgot-password' element={user ? <Navigate replace to='/' /> : <ForgotPasswordPage />} />

                {/* メールアドレス変更 */}
                <Route
                  path='/change-email'
                  element={user && user.emailVerified ? <ChangeEmailPage /> : <Navigate replace to='/' />}
                />

                {/* パスワード変更 */}
                <Route
                  path='/change-password'
                  element={user && user.emailVerified ? <ChangePasswordPage /> : <Navigate replace to='/' />}
                />

                {/* 退会手続き */}
                <Route path='/cancel' element={user ? <CancelPage /> : <Navigate replace to='/' />} />

                {/* ページが見つからない */}
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </Card>
          </SnackbarProvider>
        )}
      </Layout>
    </BrowserRouter>
  );
};

export default App;
