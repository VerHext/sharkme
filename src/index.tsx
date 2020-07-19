import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/redux/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { keycloakClient } from "./app/utils";
import "bootstrap/dist/css/bootstrap.min.css";

const login = async () => {
  const token = await keycloakClient.login();
  if (token) {
    StartApp();
  } else {
    ReactDOM.render(
      <React.StrictMode></React.StrictMode>,
      document.getElementById("root")
    );
  }
};

const StartApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

login();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
