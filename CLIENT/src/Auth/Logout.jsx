
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { ApiCallGet } from '../Modules/CoreModules/ApiCall';
import Loading from '../Modules/UiModules/Core/Loading/Loading';

const Logout = () => {

    const history = useHistory();

    useEffect(() => {
        const logout = async () => {
            const result = await ApiCallGet('/logout');
            if (result.error) {
                history.push('/error');
            } else if(result.status === 201) { history.push('/login-oric')
               } else{
            history.push('/');
       } }
        logout();
    }, [history]);

    return (

        <>

            <Loading />

        </>

    );

}

export default Logout;
