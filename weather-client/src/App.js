import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { Toaster } from "react-hot-toast";
import Header from "./components/common/Header";
function App() {
  const checkUserLogin = () => {
    let routes = "";
    routes = (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    );
    return routes;
  };
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Header />
        {checkUserLogin()}
      </Router>
    </div>
  );
}

export default App;
