import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';
import ExamplePageOne from '../Example/index';
import Legend from '../Legend/index';

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
        <Route path="/pages/one" component={ExamplePageOne} />
        <Route path="/legend" component={Legend} />
        <Route path="/projects" component={ExamplePageOne} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
