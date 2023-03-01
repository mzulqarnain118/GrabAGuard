import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import AddUser from './AddUser/AddUser';
import SetupForms from './SetupForms/SetupForms';
import ChangePermissions from './ChangePermissins/ChangePermissions';
import Loading from '../../../../Modules/UiModules/Core/Loading/Loading';

const AdminSettings = () => {
  const match = useRouteMatch();

  return (
    <>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/setup-forms`} />} />
        <Route exact path={`${match.url}/add-user`} component={AddUser} />
        <Route exact path={`${match.url}/change-permissions`} component={ChangePermissions} />
        <Route exact path={`${match.url}/setup-forms`} component={SetupForms} />
      </Switch>
      </React.Suspense>
    </>
  );

}

export default AdminSettings;