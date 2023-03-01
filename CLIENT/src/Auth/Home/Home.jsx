
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Log from '../../Modules/CoreModules/Log';
import Loading from '../../Modules/UiModules/Core/Loading/Loading';

const Home = () => {

    Log("Home");
    const history = useHistory();

    useEffect(() => {
        const auth = async () => {
            // const result = await Authenticate();
            // if (result)
                window.location.href = '/main';
        }
        auth();
    }, [history]);

    return (

        <>

            <Loading />

        </>

    );

}

export default Home;
