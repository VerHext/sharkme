import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./app/features/counter/Counter";
import * as user from "./app/redux/modules/user";
import Layout from "./app/views/Layout";
import Loader from "react-loader-spinner";
import "./App.css";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  Router,
  RouteComponentProps,
  Switch,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import IUser from "./app/models/IUser";
import { useSelector, useDispatch } from "react-redux";
import * as userRedux from "./app/redux/modules/user";
import * as boxRedux from "./app/redux/modules/box";
import PageNotFound from "./app/views/NotFound";
import Profile from "./app/views/Profile";
import Welcome from "./app/views/Welcome";
import Box from "./app/views/Box";
import CardList from "./app/views/Card/CardList";

export default function App(props: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    //get current user
    dispatch(userRedux.getApi());
    dispatch(boxRedux.getAllBoxes());
  });

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path={"/app/profile"}
            exact={true}
            render={renderLayout({ content: <Profile /> })}
          />
          <Route
            path={"/app/box"}
            exact={true}
            render={renderLayout({ content: <Box /> })}
          />
          <Route
            path={"/app/box/:id"}
            exact={true}
            render={renderLayout({ content: <CardList /> })}
          />
          <Route
            path={"/"}
            exact={true}
            render={renderLayout({ content: <Welcome /> })}
          />
          <Route render={renderLayout({ content: <PageNotFound /> })} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
function renderLayout(props: any) {
  return () => <Layout {...props} />;
}
