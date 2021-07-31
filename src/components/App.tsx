import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
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
              <Switch>
                {/* フロント */}
                <Route exact path='/' component={FrontPage} />

                {/* 新規登録 */}
                <Route exact path='/sign-up' render={() => (user ? <Redirect to='/' /> : <SignUpPage />)} />

                {/* パスワード再設定 */}
                <Route
                  exact
                  path='/forgot-password'
                  render={() => (user ? <Redirect to='/' /> : <ForgotPasswordPage />)}
                />

                {/* メールアドレス変更 */}
                <Route
                  exact
                  path='/change-email'
                  render={() => (user && user.emailVerified ? <ChangeEmailPage /> : <Redirect to='/' />)}
                />

                {/* パスワード変更 */}
                <Route
                  exact
                  path='/change-password'
                  render={() => (user && user.emailVerified ? <ChangePasswordPage /> : <Redirect to='/' />)}
                />

                {/* 退会手続き */}
                <Route exact path='/cancel' render={() => (user ? <CancelPage /> : <Redirect to='/' />)} />

                {/* ページが見つからない */}
                <Route component={NotFoundPage} />
              </Switch>
            </Card>
          </SnackbarProvider>
        )}
      </Layout>
    </BrowserRouter>
  );
};

export default App;
