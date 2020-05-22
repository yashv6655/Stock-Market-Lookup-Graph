import React from "react";
import { Stock } from "./Stock";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LearnMorePage from "./LearnMorePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Stock />
          </div>
        </Route>
        <Route path="/learnmore">
          <LearnMorePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
