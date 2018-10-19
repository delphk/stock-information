import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Titles from "./components/title/Titles";
import Home from "./components/home/Home";
import Historical from "./components/historical/Historical";

class App extends Component {
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-5 title-container">
                  <Titles />
                </div>
                <div className="col-sm-7 form-container">
                  <Router>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/historical" component={Historical} />
                    </Switch>
                  </Router>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
