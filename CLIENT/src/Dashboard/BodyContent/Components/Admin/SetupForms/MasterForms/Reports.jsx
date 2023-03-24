import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const Reports = () => {
    const { response, error } = ApiCallGet('/bugs');
console.log(response);
    const [values, setvalues] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);


    const columns = [


        {
            title: "Description",
            editable: () => true,
            field: "description",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Email",
            field: "email",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Picture",
            field: "url",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "left" },
        },

    ]




    return (

        <>

            <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>

                <MatTable title="Reports" columns={columns} style={{ margin: '1rem' }}
                    data={response[0]}
                     />


            </div>
        </>);


}

export default Reports;