import React, { useEffect, useState } from 'react';
import MatTable from "../../../../../../Modules/MaterialTable/MaterialTable";
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import SubDepartments from "./SubDepartments";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { Alert } from '@mui/material';


const SubDepartmentTable = (props) => {

    const [record, setrecord] = React.useState([]);

    const [openPopup, setopenPopup] = useState(false);
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [row, setRow] = useState({});


    const [tableUpdated, setTableUpdated] = useState(0);


    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
    }


    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
    }


    const columns = [

        {
            title: "Department",
            editable: () => false,
            field: "dept_name",
            type: "numeric",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },


        {
            title: "Sub Department",
            editable: () => true,
            field: "sub_dept_name",
            type: "numeric",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },


        {
            title: "Entered By",
            field: "emp_name",
            type: "text",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: " Entery Time ",
            field: "entry_datetime",
            type: "date",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },



    ]

    useEffect(async () => {



        const result1 = await ApiCallGet('/subdepartmenttable');
        console.log(result1);
        setrecord(result1.data);




    }, [tableUpdated]);

    return (<>


        <Alert severity="info" className='mb-5'>
            Click on a SubDepartment to update it <br />
            Click on + button to add new SubDepartment
        </Alert>

        <Popup title=' Sub Department' openPopup={openPopup} setOpenPopup={handlePopup} >
            {addition ? <SubDepartments data={record} setTableUpdated={setTableUpdated} setOpenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
            {updation ? <SubDepartments data={row} setTableUpdated={setTableUpdated} setOpenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}
        </Popup>
        <MatTable
            actionsAtStart={true}
            title="All Sub Departments"
            columns={columns}
            data={record}
            Options={options}
            customAdd={() => { setAddition(true); setopenPopup(true); }}
            onRowClick={(event, rowData) => {
                console.log(event.target, rowData);
                setRow(rowData);
                console.log("hjsikskj", row.data);
                setUpdation(true);
                setopenPopup(true)
            }}

        />


    </>);

}

export default SubDepartmentTable;