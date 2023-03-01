import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import UploadComponent from './UploadFile/UploadFile';
import AllFiles from './AllFiles/AllFiles';
import Loading from '../../../../Modules/UiModules/Core/Loading/Loading';



const Files = () => {
  const match = useRouteMatch();

  return (
    <>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/upload`} />} />
        <Route exact path={`${match.url}/upload`} component={UploadComponent} />
        <Route exact path={`${match.url}/all-files`} component={AllFiles} />

      </Switch>
      </React.Suspense>
    </>
  );

}

export default Files;