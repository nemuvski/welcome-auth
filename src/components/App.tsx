import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Box, Card, CircularProgress } from '@material-ui/core';
import Layout from './Layout';
import FrontPage from '../pages/FrontPage';
import SignUpPage from '../pages/SignUpPage';
import CancelPage from '../pages/CancelPage';
import NotFoundPage from '../pages/NotFoundPage';
import { auth } from '../libs/Firebase';
import { SnackbarProvider } from '../contexts/SnackbarContext';

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
