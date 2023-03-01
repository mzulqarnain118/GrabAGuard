import React from 'react'
import { useRouteMatch, Redirect } from "react-router-dom";
import AllAdvertisements from './AllAdvertisements/AllAdvertisements';
//import Advertisement from './Advertisement/Advertisement';
import Employee from './Employee/Employee';
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
import Loading from '../../../../Modules/UiModules/Core/Loading/Loading';

const Forms = () => {
    const match = useRouteMatch();

    return (
        <React.Suspense fallback={<Loading />}>
            <AnimatedSwitch atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper w-100 h-100"

            >
                {/* <AnimatedRoute exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/all-advertisements`} />}
                /> */}
                {/* <AnimatedRoute exact path={`${match.url}/all-advertisements`} component={AllAdvertisements} /> */}
                {/* <AnimatedRoute exact path={`${match.url}/advertisement`} component={Advertisement} /> */}
                <AnimatedRoute exact path={`${match.url}/employee`} component={Employee} />

            </AnimatedSwitch>
        </React.Suspense>
    )
}

export default Forms;
