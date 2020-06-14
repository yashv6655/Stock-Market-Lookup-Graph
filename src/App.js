import React from "react";
import { Stock } from "./Stock";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LearnMorePage from "./Pages/LearnMorePage";
import "./App.css";
import BudgetCalculator from "./components/ExpenseCalculator/BudgetCalculator";
import CalculatorDisplay from "./components/ExpenseCalculator/CalculatorDisplay";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Stock />
          </div>
        </Route>
        <Route path="/learnmore">
          <LearnMorePage />
        </Route>
        <Route path="/calculator">
          <CalculatorDisplay />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
