import React from "react";
import { Router, Switch, Route,Redirect } from "react-router-dom";
import { PrivateRoute } from './app/_privateRoutes';
import LoginPage from './app/pages/LoginPage';
import RegisterPage from './app/pages/RegisterPage';
import DashboardPage from "./app/pages/DashboardPage";
import { history } from './app/_helpers';

function App() {
  React.useEffect(() => {
      history.listen((location, action) => {
          console.log('location',location,'action',action)
      });
  }, []);
  return (
    <Router history={history}>
      <Switch>
          <PrivateRoute exact path="/" component={DashboardPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
