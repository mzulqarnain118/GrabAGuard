import React, { useEffect, useState } from 'react';
import { ApiCallGet } from '../../../../../Modules/CoreModules/ApiCall';
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import Select from '../../../../../Modules/UiModules/Control/Select';
import HomePage from './HomePage';

const EmployeeCount = (props) => {

    const [record, setrecord] = useState([]);


    const columns = [

        {
            title: "Description",
            editable: () => true,
            field: "desc",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Count",
            field: "value",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },



    ]



    useEffect(() => {


        const fetchData = async () => {



            setrecord(props.data);
            console.log(record, "hhhhhhhhhhh");


        }
        fetchData();


    }, []);
    let Data = [
        { desc: 'Additional Charge Employees', value: record.additional_charge_employees },
        { desc: 'Employees on leave', value: record.emp_on_leave },
        { desc: 'Permanent Employees', value: record.gcu_permanent_emp },
        { desc: 'Trasferred Employees', value: record.gov_trasferred_emp },
        { desc: 'ipfp Employees', value: record.ipfp_emp },
        { desc: 'Married Employees', value: record.married_employees },
        { desc: 'PHD Employees', value: record.phd_employees },
        { desc: 'Temporary Employees', value: record.temporary_emp },
        { desc: 'Tenure Track Employees', value: record.tenure_track_emp },
        { desc: 'Foreign Employees', value: record.foreign_employees },
    ]


    return (
        <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>



            <MatTable title="Employees Count" columns={columns} style={{ margin: '1rem' }}
                data={Data}

            />


        </div>
    );
}


export default EmployeeCount;
