
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { ApiCallPost } from '../Modules/CoreModules/ApiCall';
import Loading from '../Modules/UiModules/Core/Loading/Loading';
import Toast from "../Modules/UiModules/Core/Toast/Toast";

const Logout = () => {
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const logout = async (e) => {

        try {
            setLoading(true)
            const result = await ApiCallPost('/auth/logout', {
                "refreshToken": localStorage.getItem('refreshToken')
            });
            if (result.status === 204) {
                console.log('====================================');
                console.log(result);
                console.log('====================================');
                Toast("Logged Off Successfully", "success");
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('loggedIn')
                localStorage.removeItem('email')
                localStorage.removeItem('role')
                localStorage.removeItem('id')
                localStorage.removeItem('name')
                localStorage.removeItem('user')
                setLoading(false)
                history.push('/login');
            }

        } catch (error) {
            setLoading(false)

            console.log(error);
        }
      

    }
    useEffect(() => {

        logout();
    }, [history]);

    return (

        <>


            {loading && <div style={{ marginTop: "220px" }}><Loading /></div>}

        </>

    );

}

export default Logout;
