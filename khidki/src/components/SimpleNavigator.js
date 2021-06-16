import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
 import Login from "./Login"
 import Search from './Search';
import Homepage from "./Homepage";

export default function App() {
  return (
    <Router>
      <div>       
        <Switch>
          <Route exact path="/login" component={Login}>           
          </Route>
          <Route exact path="/" component={Homepage}>            
          </Route>
          <Route exact path="/search/:id" component={Search}>
           
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

