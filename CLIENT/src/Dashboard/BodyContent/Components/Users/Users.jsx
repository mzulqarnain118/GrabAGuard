import React from 'react'
import { useRouteMatch, Redirect } from "react-router-dom";
import AddNewPassword from './PasswordSettings/AddNewPassword';
import ResetPassword from './PasswordSettings/ResetPassword';
import AddUser from './AddUser/AddUser';
// import Employee from './Employee/Employee';
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
import Loading from '../../../../Modules/UiModules/Core/Loading/Loading';
import { ApiCallGet } from '../../../../Modules/CoreModules/ApiCall';
import QualificationTable from '../EmployeeFix/UpdateEmployee/Qualification/QulaificationTable';
import axios from 'axios';
import UpdateEmployee from '../EmployeeFix/UpdateEmployee/UpdateEmployee';
import ImageDisplay from '../EmployeeFix/UpdateEmployee/Qualification/DisplayDocs';

const Users = () => {
    const match = useRouteMatch();
    const user = { role: localStorage.getItem("role") };

    // axios.interceptors.response.use(function (response) {
    //     return response;
    // }, function (error) {
    //     if (401 === error.response.status) {
    //         toast.success("Your session has expired", {
    //             position: 'top-center'
    //         });
    //         window.location = '/login';
    //     } else {
    //         return Promise.reject(error);
    //     }
    // });
    return (
        <React.Suspense fallback={<Loading />}>
            {/* console.log("users by oric ") */}
            {["user", "hirer", "guard", "admin"].includes(user?.role) && <AnimatedSwitch atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper w-100 h-100"

            >
                <AnimatedRoute exact path={`${match.url}/`} component={QualificationTable} />
                <AnimatedRoute exact path={`${match.url}/showDocs`} component={ImageDisplay} />
                <AnimatedRoute exact path={`${match.url}/reset-paswsword`} component={ResetPassword} />
                <AnimatedRoute exact path={`${match.url}/change_password`} component={QualificationTable} />
                <AnimatedRoute exact path={`${match.url}/add-users`} render={() => <AddUser user={user} />} />

            </AnimatedSwitch>}


            {(user.role === 'ORIC_ADM') && <AnimatedSwitch atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper w-100 h-100"

            >

                <AnimatedRoute exact path={`${match.url}/change_password`} render={() => <AddNewPassword user={user} />} />
                <AnimatedRoute exact path={`${match.url}/add-users`} render={() => <AddUser user={user} />} />

            </AnimatedSwitch>}
            
            {(user.role === 'ORIC_CP') && <AnimatedSwitch atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper w-100 h-100"

            >

                <AnimatedRoute exact path={`${match.url}/change_password`} render={() => <AddNewPassword user={user} />} />
                {/* <AnimatedRoute exact path={`${match.url}/add-users`} render={() => <AddUser user={user} />} /> */}

            </AnimatedSwitch>}
        </React.Suspense>
    )
}

export default Users;