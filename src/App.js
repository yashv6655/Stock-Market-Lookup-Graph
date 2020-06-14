import React from "react";
import { Stock } from "./Stock";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LearnMorePage from "./Pages/LearnMorePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./App.css";
import BudgetCalculator from "./components/ExpenseCalculator/BudgetCalculator";
import CalculatorDisplay from "./components/ExpenseCalculator/CalculatorDisplay";

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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/calculator">
          <CalculatorDisplay />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
