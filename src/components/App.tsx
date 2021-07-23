import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Box, Card, CircularProgress } from '@material-ui/core';
import Layout from './Layout';
import FrontPage from '../pages/FrontPage';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';
import { auth } from '../libs/Firebase';

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
          <Card>
            <Switch>
              {/* フロント */}
              <Route exact path='/' component={FrontPage} />

              {/* 新規登録 */}
              <Route exact path='/sign-up' render={() => (user ? <Redirect to='/' /> : <SignUpPage />)} />

              {/* ページが見つからない */}
              <Route component={NotFoundPage} />
            </Switch>
          </Card>
        )}
      </Layout>
    </BrowserRouter>
  );
};

export default App;
