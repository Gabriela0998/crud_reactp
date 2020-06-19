import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Create from "./userAction/CreateUser";
import User from "./userComponent/User";
import Retrieve from "./userAction/RetrieveUser";

function App() {
  
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">
            Тест 
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link"> Потребители </Link>
            </li>
            <li className="nav-item">
              <Link to={"/create"} className="nav-link"> Създай потребител </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={Retrieve} />
            <Route exact path="/create" component={Create} />
            <Route path="/users/:id" component={User} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;