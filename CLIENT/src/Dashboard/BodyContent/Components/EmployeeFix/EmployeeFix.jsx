import React from 'react'
import { AnimatedSwitch } from 'react-router-transition';
import { useRouteMatch, Route, Redirect, Switch } from "react-router-dom";
import Loading from '../../../../Modules/UiModules/Core/Loading/Loading';
const AllEmployees = React.lazy(() => import('./AllEmployees/AllEmployees'));
const FixEmployeeDesignation = React.lazy(() => import('./FixEmployeeDesignation/FixEmployeeDesignation'));
const UpdateEmployee = React.lazy(() => import('./UpdateEmployee/UpdateEmployee'))
const AddEmployee = React.lazy(() => import('./AddEmployee/AddEmployee'))

const EmployeeFix = (props) => {
    const match = useRouteMatch();
    return (
        <React.Suspense fallback={<Loading />}>
            {/* <AnimatedSwitch atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 1 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper w-100 h-100"

        >
            <Route exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/all-employees`} />}/>
            <Route exact path={`${match.url}/all-employees`} component={AllEmployees} />
            <Route exact path={`${match.url}/fix-employee-desig`} component={FixEmployeeDesignation} />

        </AnimatedSwitch> */}
            <Switch>
                <Route exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/all-employees`} />} />
                <Route exact path={`${match.url}/all-employees`} render={() => <AllEmployees user={props.user} />} />
                {/* <Route exact path={`${match.url}/add-emplyee`} component={AddEmployee} /> */}
                {(props.user?.role !== 'DVO'|| props.user?.role !== 'ORIC_ADM') && <Route exact path={`${match.url}/fix-employee-desig`} component={FixEmployeeDesignation} />}
                {(props.user?.role !== 'DVO'|| props.user?.role !== 'ORIC_ADM') && <Route exact path={`${match.url}/update-employee/:id`} component={UpdateEmployee} />}
            </Switch>
        </React.Suspense>
    )
}

export default EmployeeFix;
