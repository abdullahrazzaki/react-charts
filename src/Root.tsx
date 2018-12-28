import React, { Component } from "react";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./configureStore";
import { Provider } from "react-redux";
import App from "./components/App";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
