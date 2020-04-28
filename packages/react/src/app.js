import React, { useEffect, Suspense } from "react";
import { Loading } from 'zarm';
import { Router, Switch, Route } from "react-router";
import { withRouter } from "react-router";
import { getHistory } from './history';

import './app.less';

import Index from './pages/index';
const Disease = React.lazy(() => import(/* webpackChunkName: "healthnotify/disease" */'./pages/healthnotify/disease'));
const Confirm = React.lazy(() => import(/* webpackChunkName: "healthnotify/confirm" */'./pages/healthnotify/confirm'));
const Detail = React.lazy(() => import(/* webpackChunkName: "healthnotify/detail" */'./pages/healthnotify/detail'));
const Result = React.lazy(() => import(/* webpackChunkName: "healthnotify/result" */'./pages/healthnotify/result'));

export default function App({ baseUrl }) {
  console.log('[H5] App rendering...')
  return (
    <Router history={getHistory(baseUrl)}>
      <Suspense fallback={<ImportLoading />}>
        <Switch>
          <Route exact path="/" component={withRouter(Index)} />
          <Route path="/healthnotify/disease" component={withRouter(Disease)} />
          <Route path="/healthnotify/confirm" component={withRouter(Confirm)} />
          <Route path="/healthnotify/detail" component={withRouter(Detail)} />
          <Route path="/healthnotify/result" component={withRouter(Result)} />
        </Switch>
      </Suspense>
    </Router>
  )
}

function ImportLoading() {
  useEffect(() => {
    Loading.show();
    return () => { Loading.hide() }
  }, []);
  return null;
};
