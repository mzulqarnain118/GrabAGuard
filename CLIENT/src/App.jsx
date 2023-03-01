import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Loading from "./Modules/UiModules/Core/Loading/Loading";
import "./App.css";
import axios from 'axios';
import Log from './Modules/CoreModules/Log';
import Logout from "./Auth/Logout";
import ContainerToast from "./Modules/UiModules/Core/Toast/ContainerToast";
import PageNotFound from "./Auth/PageNotFound/PageNotFound";

const Home = React.lazy(() => import('./Auth/Home/Home'));
const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));
const Login = React.lazy(() => import('./Auth/Login/Login'));



const App = () => {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  // const [loggedIn, updateStatus] = useState(localStorage.getItem("loggedIn"));
  // axios.interceptors.response.use(function (response) {
  //   return response;
  // }, function (error) {
  //   if (401 === error.response.status) {
  //     toast.success("Your session has expired")
  //     window.location = '/login';
  //   } else {
  //     return Promise.reject(error);
  //   }
  // });

  return (
    <>
      <Switch>
        <React.Suspense fallback={<Loading />}>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/page" component={() => <PageNotFound />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/logout" component={() => <Logout />} />
          <Route path="/main" component={() => <Dashboard />} />
        </React.Suspense>
      </Switch>
      <ContainerToast />
    </>
  );
};

export default App;