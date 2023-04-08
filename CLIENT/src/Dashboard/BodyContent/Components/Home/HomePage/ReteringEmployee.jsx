import React, { useEffect, useState } from 'react';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import HomePage from './HomePage';
import { useHistory } from "react-router-dom"

const ReteringEmployee = ({data}) => {
    const columns = [

        {
            title: "Hirer",
            editable: () => true,
            field: "id",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Guard",
            field: "name",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Duartion",
            field: "email",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Time",
            field: "email",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: " Amount",
            field: "role",
            type: "string",
            dateSetting: { locale: "en-GB" },
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

    ]
    

    const history = useHistory();
    const handleClick = (emp_id) => {
        history.push({ pathname: `/main/employee-fix/update-employee/${emp_id}` });
    }

    return (
        <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>



            <MatTable title="Active Jobs" columns={columns} style={{ margin: '1rem' }}
                data={data}
                bodyHeight="75.5vh" />


        </div>
    );
}


export default ReteringEmployee;
