import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Layout from './Layout';
import FrontPage from '../pages/FrontPage';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {/* フロント */}
          <Route exact path='/' component={FrontPage} />

          {/* 新規登録 */}
          <Route exact path='/sign-up' component={SignUpPage} />

          {/* ページが見つからない */}
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
