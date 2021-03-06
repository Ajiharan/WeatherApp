import "./App.css";
import React, { useLayoutEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";

import { selectUid, setUserLoginDetails } from "./redux/user/UserSlice";
import Home from "./components/user/Home";
import useStorage from "./components/hooks/useStorage";

function App() {
  const { getItem } = useStorage();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const item = getItem("userToken");
    if (item) {
      dispatch(setUserLoginDetails(JSON.parse(item)));
    }
  }, []);
  const userid = useSelector(selectUid);
  const checkUserLogin = () => {
    let routes = "";

    if (userid) {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Redirect to="/" />
        </Switch>
      );
    }

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
