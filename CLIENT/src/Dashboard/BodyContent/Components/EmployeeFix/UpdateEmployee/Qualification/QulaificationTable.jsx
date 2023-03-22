import React, { useEffect, useState } from 'react'
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { ApiCallPost, ApiCallGet, ApiCallDelete } from '../../../../../../Modules/CoreModules/ApiCall';
import QualificationForm from './QualificationForm';
import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';
import MaterialReactTable from 'material-react-table';
import { Button } from '@mui/material';
import { FaDownload } from 'react-icons/fa';
const QualificationTable = (props) => {

    const emp_id = props.id

    const [updation, setUpdation] = useState(false);
    const [user, setUser] = useState(false);

    const [addition, setAddition] = useState(false);

    const [tableUpdated, setTableUpdated] = useState(0);

    
    const { response, error } = ApiCallGet('/users', { getUpdatedData: tableUpdated });
    console.log('====================================');
    console.log(response, "IN COMPONENT");
    console.log('====================================');
    const [tableData, setTableData] = useState([]);


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
            title: "First Name",
            field: "firstName",
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
            title: "Type",
            field: "address",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },hidden:user
        },
        {
            title: "Status",
            field: "status",
            type: "text",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Active",
            field: "active",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Warning",
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
            type: 'date',
            dateSetting: { locale: "en-GB" },
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

    ]
  

    const onDelete = React.useCallback(

        async (row) => {
            try {
                const response = await ApiCallDelete(`/users/${row?.id}`);
                
                if (response.status === 204) {
                    console.log(response, "result")
                    setTableUpdated(old => old + 1);
                    Toast('Data Deleted', 'success')                   
                }
            } catch (error) {
                console.log(error, "error")
                // setLoading(false);
                Toast(error.message, "error");

            }
        },
        []
    );
    useEffect(() => {
        console.log("table updated",response?.results);
    }, [tableUpdated]);
    const handleSaveRow = async ({ exitEditingMode, row, values }) => {
        //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
        tableData[row.index] = values;
        //send/receive api updates here
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode
    };
    return (<>
        <form>
            <Stack sx={{display:"block"}}>
                <Popup title='All Users' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <QualificationForm  setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
                    {updation ? <QualificationForm  data={row} setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}
                </Popup>
                <Button variant="contained" onClick={() => setUser(!user)}
                > 
                    {user?"Guard":"Hirer"}</Button>
                <MatTable
                    actionsAtStart={true}
                    title="Employee Qualification"
                    columns={columns}
                    data={tableData.length !== 0 ? tableData : response?.results}
                    onDelete={onDelete}
                    // onUpdate={update}
                    // customAdd={() => { setAddition(true); setopenPopup(true); }}
                    onRowClick={(event, rowData) => {
                        console.log(event.target, rowData);
                        setRow(rowData);
                        setUpdation(true);
                        setopenPopup(true);
                    }}
                    // editingMode="modal" //default
                    // enableEditing
                    // onEditingRowSave={handleSaveRow}
                />

            </Stack>

        </form>
    </>);
}

export default QualificationTable;