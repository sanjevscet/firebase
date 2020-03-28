import React from "react";
import "./App.css";
import "./custom.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CreateLink from "./Components/Link/CreateLink";
import Login from "./Components/Auth/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import SearchLinks from "./Components/Link/SearchLinks";
import LinkList from "./Components/Link/LinkList";
import LinkDetail from "./Components/Link/LinkDetail";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div class="route-container">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route path="/create" component={CreateLink} />
            <Route path="/login" component={Login} />
            <Route path="/forgot" component={ForgotPassword} />
            <Route path="/search" component={SearchLinks} />
            <Route path="/top" component={LinkList} />
            <Route path="/new/:page" component={LinkList} />
            <Route path="/link/:linkId" component={LinkDetail} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
