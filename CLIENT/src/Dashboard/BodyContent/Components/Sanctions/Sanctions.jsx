import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import ViewSanctions from './ViewSanctions/ViewSanctions';
import Loading from '../../../../Modules/UiModules/Core/Loading/Loading';
import AddSanctions from './AddSanctions/AddSanctions';
// import DesignationSanction from './ViewSanctions/DesignationSanction';


const Sanctions = () => {
  const match = useRouteMatch();

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/view-sanctions`} />} />
          <Route exact path={`${match.url}/view-sanctions`} component={ViewSanctions} />
          <Route exact path={`${match.url}/add-sanctions`} component={AddSanctions} />
          {/* <Route exact path={`${match.url}/view-sanctions2`} component={DesignationSanction} /> */}

        </Switch>
      </React.Suspense>
    </>
  );

}

export default Sanctions;