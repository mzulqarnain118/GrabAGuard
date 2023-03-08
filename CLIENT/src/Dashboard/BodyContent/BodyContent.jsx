import React from "react";
import NavBar from "../Navbar/Navbar";
import styles from "./BodyContent.module.css";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import Loading from "../../Modules/UiModules/Core/Loading/Loading";
import Card from "../../Modules/UiModules/Core/Card";
const Home = React.lazy(() => import("./Components/Home/Home"));
const AdminSettings = React.lazy(() => import("./Components/Admin/AdminSettings"));
const Users = React.lazy(() => import("./Components/Users/Users"));
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
      <NavBar styleClass={styles.sidebar} toggler={handleChange} user={user} collapsed={props.collapsed} handleCollapse={props.handleCollapse} toggled={props.toggled} handleToggleSidebar={props.handleToggleSidebar} />
      <div className={classes.join(" ").toString()}>
        <Card height="100%">
          <React.Suspense fallback={<Loading />}>
            {
              ["user", "hirer", "guard", "admin"].includes(user?.role) ? <Switch>
                <Route exact path={`${match.url}`} render={() => <Redirect from={`${match.url}`} to={`${match.url}/home`} />} />
                <Route path={`${match.url}/admin-settings`} component={AdminSettings} />
                <Route path={`${match.url}/home`} render={() => <Home user={user} />} />
                <Route path={`${match.url}/users`} component={Users} />
              </Switch> : null}
          </React.Suspense>
        </Card>
      </div>
    </div>
  );
};

export default BodyContent;
