import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { PrivateRoute } from './utils/PrivateRoute'
// Could also import all of these from 'index.js' in /screens
import { Login, Signup } from './screens/Auth'
import { Home } from './screens/Home'
import { Discover } from './screens/Discover'
import { Create } from './screens/Create'
import { Profile } from './screens/Profile'
import { EventDetail } from './screens/EventDetail';

const PageNotFound = () => (
  <div>
    <p>Page Not Found!</p>
    <Link to="/">Go Back</Link>
  </div>
)

function AppRoutes({
  isAuth,
}) {

  if(isAuth) {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          {/* make '/' after auth is setup */}
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/discover" component={Discover} />
          <PrivateRoute exact path="/create" component={Create} />
          <PrivateRoute exact path="/profile/:profileId" component={Profile} />
          <Route exact path="/events/:eventId" component={EventDetail} />
          {/* <Route path="/" component={PageNotFound} /> */}
          <Route path="/" render={() => {
            return <Redirect to="/" />
          }} />
        </Switch>
      </BrowserRouter>
    )
  }
  
  return (
    <BrowserRouter>
      <Switch>
        {/* todo: change after auth */}
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {/* <Route path="/" component={PageNotFound} /> */}
        <Route path="/" render={() => {
          return <Redirect to="/" />
        }} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

const App = connect(
  mapStateToProps,
)(AppRoutes)

export default App;
