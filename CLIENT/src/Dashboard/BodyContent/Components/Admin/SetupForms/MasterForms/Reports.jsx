import React, { useState, useEffect } from 'react';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Loading from '../../../../../../Modules/UiModules/Core/Loading/Loading';

const Reports = () => {
    const { response, error } = ApiCallGet('/bugs');
console.log(response?.[0]);
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
            {!response?<Loading/>: <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>
                <MatTable title="Reports" columns={columns} style={{ margin: '1rem' }}
                    data={response}
                     />
            </div>}
        </>);


}

export default Reports;