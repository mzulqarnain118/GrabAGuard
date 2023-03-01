import React from 'react'
import { useRouteMatch, Redirect } from "react-router-dom";
import Reporting from './Reports';

import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';

const Reports = () => {
    const match = useRouteMatch();

    return (
        <AnimatedSwitch atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper w-100 h-100"

        >
            <AnimatedRoute exact path={`${match.url}`} render={() => <Redirect exact from={`${match.url}`} to={`${match.url}/all-advertisements`} />}
            />
            <AnimatedRoute exact path={`${match.url}/reporting`} component={Reporting} />

        </AnimatedSwitch>
    )
}

export default Reports;
