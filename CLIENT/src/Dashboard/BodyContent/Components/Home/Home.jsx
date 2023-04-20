import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { AnimatedRoute, AnimatedSwitch } from 'react-router-transition';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';
import HomePage from './HomePage/HomePage';
import Loading from '../../../../Modules/UiModules/Core/Loading/Loading';
import AddNewPassword from '../Users/PasswordSettings/AddNewPassword';
import TwoFactorAuthentication from '../../../../Auth/Login/TwoFactorAuthentication';

const Home = (props) => {
    const match = useRouteMatch();

    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <AnimatedSwitch atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper w-100 h-100"

                >
                    <AnimatedRoute exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/dashboard`} />} />
                    <AnimatedRoute exact path={`${match.url}/dashboard`} render={() => <HomePage user={props.user} />} />
                    <AnimatedRoute exact path={`${match.url}/enable-2fa`} render={() => <TwoFactorAuthentication />} />
                    <AnimatedRoute exact path={`${match.url}/personal-profile`} component={EmployeeDetails} />
                    <AnimatedRoute exact path={`${match.url}/new-password`} component={AddNewPassword} />
                </AnimatedSwitch>
            </React.Suspense>
        </>
    )
}

export default Home
