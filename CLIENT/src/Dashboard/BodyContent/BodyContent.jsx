import React from "react";
import NavBar from "../Navbar/Navbar";
// @ts-ignore
import styles from "./BodyContent.module.css";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import Loading from "../../Modules/UiModules/Core/Loading/Loading";
import Card from "../../Modules/UiModules/Core/Card";
import { ApiCallGet } from "../../Modules/CoreModules/ApiCall";
import Reports from "./Components/Reports/Reports";

const Home = React.lazy(() => import("./Components/Home/Home"));
const Forms = React.lazy(() => import("./Components/Forms/Forms"));
const Files = React.lazy(() => import("./Components/Files/Files"));
const EmployeeFix = React.lazy(() => import("./Components/EmployeeFix/EmployeeFix"));
const AdminSettings = React.lazy(() => import("./Components/Admin/AdminSettings"));
const Sanctions = React.lazy(() => import("./Components/Sanctions/Sanctions"));
const Users = React.lazy(() => import("./Components/Users/Users"));
// import ORIC from "./Components/ORIC/ORIC"
// import MasterForms from "./Components/Forms/MasterForms/MasterForms";
const BodyContent = (props) => {


  const match = useRouteMatch();
  const [sidebar, setSidebar] = React.useState(true);
  const user = {role:localStorage.getItem("role")};


  let classes = [styles.body__content];

  if (sidebar) {
    classes.push(styles.sidebar__expanded);
  }
  else {
    classes.push(styles.sidebar__collapsed);
  }

  const handleChange = (newProp) => {
    setSidebar(newProp);
  }


  return (
    <div className={`${props.styleClass} ${styles.body__content__wrapper}`}>
      <NavBar styleClass={styles.sidebar} toggler={handleChange} userlog={user} collapsed={props.collapsed} handleCollapse={props.handleCollapse} toggled={props.toggled} handleToggleSidebar={props.handleToggleSidebar} />
      <div className={classes.join(" ").toString()}>
        <Card height="100%">
          <React.Suspense fallback={<Loading />}>
            {
                user.role === 'user' ? <Switch>
                  <Route exact path={`${match.url}`} render={() => <Redirect from={`${match.url}`} to={`${match.url}/home`} />} />
                  {<Route path={`${match.url}/forms`} component={Forms} />}
                  <Route path={`${match.url}/employee-fix`} render={() => <EmployeeFix user={user} />} />
                  <Route path={`${match.url}/sanctions`} component={Sanctions} />
                  <Route path={`${match.url}/admin-settings`} component={AdminSettings} />
                  <Route path={`${match.url}/home`} render={() => <Home user={user} />} />
                  <Route path={`${match.url}/files`} component={Files} />
                  <Route path={`${match.url}/reports`} component={Reports} />
                  <Route path={`${match.url}/users`} component={Users} />

                </Switch> :
                  user.role === 'DVO' ? <Switch>
                    <Route exact path={`${match.url}`} render={() => <Redirect from={`${match.url}`} to={`${match.url}/home`} />} />
                    <Route path={`${match.url}/home`} render={() => <Home user={user} />} />
                    <Route path={`${match.url}/employee-fix`} render={() => <EmployeeFix user={user} />} />
                    <Route path={`${match.url}/reports`} component={Reports} />
                    <Route path={`${match.url}/users`} component={Users} />

                  </Switch> :
                    user.role === 'HRM_ADM' ? <Switch>
                      <Route exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/home`} />} />
                      <Route path={`${match.url}/home`} render={() => <Home user={user} />} />
                      {<Route path={`${match.url}/forms`} component={Forms} />}
                      <Route path={`${match.url}/files`} component={Files} />
                      <Route path={`${match.url}/employee-fix`} render={() => <EmployeeFix user={user} />} />
                      {/* <Route path={`${match.url}/establishment`} component={MasterForms} /> */}
                      <Route path={`${match.url}/admin-settings`} component={AdminSettings} />
                      <Route path={`${match.url}/sanctions`} component={Sanctions} />
                      <Route path={`${match.url}/reports`} component={Reports} />
                      <Route path={`${match.url}/users`} component={Users} />

                    </Switch>
                      :
                      <Switch >
                        <Route exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/home`} />} />
                        <Route path={`${match.url}/home`} render={() => <Home user={user} />} />
                        {<Route path={`${match.url}/forms`} component={Forms} />}
                        <Route path={`${match.url}/files`} component={Files} />
                        <Route path={`${match.url}/employee-fix`} render={() => <EmployeeFix user={user} />} />
                        {/* <Route path={`${match.url}/establishment`} component={MasterForms} /> */}
                        <Route path={`${match.url}/admin-settings`} component={AdminSettings} />
                        <Route path={`${match.url}/sanctions`} component={Sanctions} />
                        <Route path={`${match.url}/reports`} component={Reports} />
                        <Route path={`${match.url}/users`} component={Users} />

                      </Switch>
            }

          </React.Suspense>
        </Card>
      </div>
    </div>
  );
};

export default BodyContent;
