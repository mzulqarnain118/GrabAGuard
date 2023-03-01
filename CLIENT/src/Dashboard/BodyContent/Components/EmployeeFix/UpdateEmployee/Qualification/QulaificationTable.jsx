import React, { useEffect, useState } from 'react'
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { ApiCallPost, ApiCallGet } from '../../../../../../Modules/CoreModules/ApiCall';
import QualificationForm from './QualificationForm';
import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';
import ApiCaller from '../../../../../../Modules/CoreModules/ApiCaller';
const QualificationTable = (props) => {

    const emp_id = props.id

    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);

    const [tableUpdated, setTableUpdated] = useState(0);

    const { response, error } = ApiCaller({ endpoint: 'users', method: 'get' });
    console.log('====================================');
    console.log(response, "IN COMPONENT");
    console.log('====================================');


    const [openPopup, setopenPopup] = useState(false);

    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
    }


    const [row, setRow] = useState({});
    const columns = [

        {
            title: "ID",
            editable: () => true,
            field: "id",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Name",
            field: "name",
            type: "string",
            editable: () => false,
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
            title: "Address",
            field: "address",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Phone",
            field: "phone",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: " Registration Date ",
            field: "createdAt",
            type: 'date', render: (row) => DateTimeGetter(new Date(row.entry_datetime)), 
            dateSetting: { locale: "en-GB" },
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

    ]
  
    const onDelete = async (row) => {

        const data = {
            qualif_id: row.qualif_id
        }

        var result = await ApiCallPost("/delete_emp_qualification", data);
        if (result.error) {
            Toast(result.text, "error");
        } else {
            setTableUpdated(old => old + 1);
            Toast('Data Deleted', 'success')
        }

    };

    return (<>
        <form>
            <Stack>
                <Popup title='All Users' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <QualificationForm id={emp_id} setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
                    {updation ? <QualificationForm id={emp_id} data={row} setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}
                </Popup>
                <MatTable
                    actionsAtStart={true}
                    title="Employee Qualification"
                    columns={columns}
                    data={response?.results}
                    onDelete={onDelete}
                    // onUpdate={update}
                    customAdd={() => { setAddition(true); setopenPopup(true); }}
                    onRowClick={(event, rowData) => {
                        console.log(event.target, rowData);
                        setRow(rowData);
                        setUpdation(true);
                        setopenPopup(true);
                    }}

                />

            </Stack>

        </form>
    </>);
}

export default QualificationTable;