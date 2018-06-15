import React, { Component } from "react";
import Folders from "../components/Folders.js";
import MailList from "../components/MailList.js";
import Mail from "../components/Mail.js";
import logo from "./../img/logo.svg";
import ComposeMail from "../components/ComposeMail.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { mySaga, myInbox } from "../sagas/saga.js";
import reducer from "./../reducers";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    const sagaMiddleware = createSagaMiddleware();
    let store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(mySaga);
    sagaMiddleware.run(myInbox);
  
    return (
      <Provider>
        <Router>
          <div>
            <div className="topnav">
              <span>Mail Client Using </span>
              <img className="logo" src={logo} />
            </div>
            <div>
              <Route
                name="composemail"
                path="/composemail"
                render={() => <ComposeMail store={store} />}
              />
            </div>
            <div className="container">
              <div className="col-lg-2 col-sm-2 col-xs-2  sidenav">
                <Folders store={store} />
              </div>
              <div>
                <Route exact path="/" render={() => <Redirect to="/inbox" />} />
                <Route
                  path="/inbox"
                  render={() => <MailList display="inbox" store={store} />}
                />
                <Route
                  path="/sent"
                  render={() => <MailList display="sent" store={store} />}
                />
                <Route
                  path="/draft"
                  render={() => <MailList display="draft" store={store} />}
                />
                <Route
                  path="/trash"
                  render={() => <MailList display="trash" store={store} />}
                />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;