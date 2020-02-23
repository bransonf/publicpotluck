import React from "react";
import { connect } from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const PrivateRouteUI = ({
  isAuth,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export const PrivateRoute = connect(
  mapStateToProps
)(PrivateRouteUI)
