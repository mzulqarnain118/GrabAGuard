import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../UiModules/Core/Toast/Toast';

const ApiCaller = ({ endpoint, method, payload }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const baseUrl = "http://localhost:3000/v1";; // your base URL
  const fetchData = () => {
    const token = localStorage.getItem('token');
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`
    };

    axios({
      method,
      url: `${baseUrl}/${endpoint}`,
      data: payload,
      headers,
    }).then(res => setResponse(res.data))
      .catch((error) => {
        setError({ info: error?.response?.data, code: error?.response?.data?.code, message: error?.response?.data?.message });
        // console.clear()
        // console.log('====================================11111111111111111111111');
        // console.error(error?.response?.data?.message)
        // console.log('====================================111111111111111111111111');
        if (error?.response?.data?.code === 401) {
          Toast("Your session has expired", "success")
          localStorage.removeItem("loggedIn")
          localStorage.removeItem("token")
          window.location = '/login';
        }
        else if (error?.response?.data?.code === 403)
          Toast("This Role is restricted to access to this request.","error")
        else if (error?.response?.data?.code === 422)
          Toast("Record not found","error")
        else if (error?.response?.data?.code === 409)
          Toast(error?.response?.data?.message, "error")
        else if (error?.response?.data?.code === 404)
          Toast(error?.response?.data?.message, "error")
        else if (error?.response?.data?.code === 400)
          Toast(error?.response?.data?.message, "error")
        else
          Toast(error?.response?.data?.message, "error")
      })
  }


  useEffect(() => {
    fetchData();
  }, [baseUrl, endpoint, method, payload]);

  console.log('====================================');
  console.log(response, error);
  console.log('====================================');
  return { response, error };
};

export default ApiCaller;
