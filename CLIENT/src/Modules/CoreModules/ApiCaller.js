import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../UiModules/Core/Toast/Toast';

const ApiCaller = ({ endpoint, method, payload }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const getError = (error) => {
    if (error.response) {
      let status = error?.response?.data?.code
      if (status === 401) {
        Toast("Your session has expired", "success")
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("token")
        window.location = '/login';
      }
      else if (status === 403)
        Toast("This Role is restricted to access to this request.", "error")
      else if (status === 500)
        Toast("Internal Server Error", "error")
      else if (status === 422)
        Toast("Cannot Process Please Try Again", "error")
      else if (status === 405)
        Toast("Not Found", "error")
      else if (status === 406)
        Toast("Already Exist", "error")
      else if (status === 404)
        Toast("API Not Found", "error")
      else if (status === 444)
        Toast("Invalid Data", "error")
      else if (status === 430)
        Toast(error.response.data, "error")
      else
        Toast("Unkown Error", "error")
    } else
      Toast("No Internet Connection", "error")

  }
  const token = localStorage.getItem('token');
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`
  };
  const fetchData = () => {
    setLoading(true);
    axios({
      method,
      url: `${baseUrl}/${endpoint}`,
      data: payload,
      headers,
    }).then(res => setResponse(res.data))
      .catch((error) => {
        setError({ info: error?.response?.data, code: error?.response?.data?.code, message: error?.response?.data?.message });
        getError(error)
      }).finally(() => setLoading(false));
  }


  useEffect(() => {
    fetchData();
  }, [baseUrl, endpoint, method, payload]);
  console.log(`%cresponse=${response},error=${error},endpoint=${endpoint},method=${method},payload=${payload}`, 'background: red; color: white; font-size: 20px;margin: 30px;');
  console.log('%cResponse: %o\n%cError:  %o\n%cpayload:  %o\n%cendpoint:  %o\n%cmethod:',
    'background: red; color: white; font-size: 20px;', response,
    'background: red; color: white; font-size: 20px;', error,
    'background: blue; color: white; font-size: 20px;', payload, 'background: blue; color: white; font-size: 20px;', endpoint, 'background: blue; color: white; font-size: 20px;', method);


  return { response, error, loading };
};

export default ApiCaller;

