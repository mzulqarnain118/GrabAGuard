import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import Loading from '../../../../Modules/UiModules/Core/Loading/Loading';
import AllReporting from './AllReporting';


const Reports = () => {
    const match = useRouteMatch();

    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/reporting`} />} />
                    <Route exact path={`${match.url}/reporting`} component={AllReporting} />
                </Switch>
            </React.Suspense>
        </>
    );

}

export default Reports;