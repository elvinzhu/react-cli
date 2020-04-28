import React, { useEffect, Suspense } from 'react'
import { Router, Switch, Route } from 'react-router'
import { withRouter } from 'react-router'
import { getHistory } from './history'
import PageLoading from './components/PageLoading'

import './app.less'

import Index from './pages/index'
// const OtherPage = React.lazy(() =>
//   import(
//     /* webpackChunkName: "OtherPage" */ './pages/OtherPage'
//   )
// )

export default function App({ baseUrl }) {
  return (
    <Router history={getHistory(baseUrl)}>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route exact path="/" component={withRouter(Index)} />
          {/* <Route path="/otherpage" component={withRouter(OtherPage)} /> */}
        </Switch>
      </Suspense>
    </Router>
  )
}
