import React, { useEffect, useState } from 'react'
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import DepartmentTab from './DepartmentTab';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Alert } from '@mui/material';

const DepartmentTabTable = (props) => {
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
            title: "Department Code",
            editable: () => true,
            field: "dept_code",
            type: "numeric",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },


        {
            title: "Department Name",
            editable: () => true,
            field: "dept_name",
            type: "numeric",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Department Nature",
            editable: () => true,
            field: "nat_desc",
            type: "numeric",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "Department type",
            editable: () => true,
            field: "type_name",
            type: "numeric",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Department category",
            editable: () => true,
            type: "numeric",
            field: "cat_desc",
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


        var result = await ApiCallGet('/getdepartment');
        console.log(result);
        setrecord(result.data);


    }, [tableUpdated]);







    return (
        <>



            <div className='col-12'>
                <Alert severity="info" className='mb-5'>
                    Click on a department to update it <br />
                    Click on + button to add new department
                </Alert>

                {/* <Popup title='ADD department' openPopup={openPopup} setOpenPopup={setopenPopup} >
                    {addition ? <DepartmentTab data={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
                    {updation ? <DepartmentTab data={row} setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}
                </Popup> */}


                <Popup title='ADD department' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <DepartmentTab data={record} setTable={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
                    {updation ? <DepartmentTab data={row} setTable={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}
                </Popup>
                <MatTable
                    actionsAtStart={true}
                    title="All Departments"
                    columns={columns}
                    data={record}
                    Options={options}
                    // onDelete={onDelete}
                    // onUpdate={update}
                    customAdd={() => { setAddition(true); setopenPopup(true); }}
                    onRowClick={(event, rowData) => {
                        console.log(event.target, rowData);
                        setRow(rowData);
                        setUpdation(true);
                        setopenPopup(true)
                    }}

                />
            </div>


        </>);




}


export default DepartmentTabTable;