import React, { useEffect, useState } from 'react'
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Button, Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import AddIcon from '@material-ui/icons/Add';
import { ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import LeavesForm from './LeavesForm';
import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';

const LeavesTable = (props) => {
    const emp_id = props.id
    const [openPopup, setopenPopup] = useState(false);
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [tableUpdated, setTableUpdated] = useState(0);
    const [row, setRow] = useState({});
    const [Data, setData] = useState([]);
    props.setData(Data);

    useEffect(() => {
        const fetchData = async () => {
            var result = await ApiCallPost('/get_emp_leave', { emp_id: emp_id });
            if (result.error) {
                Toast(result.text, "error");
            } else {
                setData(result.data);
                console.log(result, "hhjsk")
            }
        }
        fetchData();
    }, [tableUpdated]);

    const columns = [
        { title: "Leave ID", hidden: true, editable: () => true, field: 'emp_leave_id', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Desig Serial No", hidden: true, editable: () => true, field: 'desig_serial_no', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Leave Type", editable: () => true, field: 'leave_type_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Pay Type", editable: () => true, field: 'pay_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Leave Order No", editable: () => true, field: 'leave_order_file', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Leave Order File", hidden: true, editable: () => false, field: 'order_file', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Leave Start Date", editable: () => true, field: 'leave_startdate', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Leave End Date", editable: () => true, field: 'leave_enddate', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Leave Remarks", editable: () => true, field: 'leave_remarks', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entered By", editable: () => true, field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entry Date/Time", editable: () => true, field: 'entry_datetime', type: 'date', render: (row) => DateTimeGetter(new Date(row.entry_datetime)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

    ];


    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
    }

    const onDelete = async (row) => {
        var result = await ApiCallPost("/delete_emp_leave", { emp_leave_id: row.emp_leave_id });
        console.log('Emp Leave Id is ', row.emp_leave_id)
        if (result.error) {
            Toast(result.text, "error");
        } else {
            setTableUpdated(old => old + 1);
            Toast('Data Deleted Successfully!', 'success')
        }
    };



    return (<>
        <form>
            <Stack>
                <Popup title='Add Employee Leave' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <LeavesForm setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} id={emp_id} /> : null}
                    {updation ? <LeavesForm data={row} setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} id={emp_id} /> : null}
                </Popup>
                <MatTable
                    onDelete={onDelete}
                    actionsAtStart={true}
                    title="Employee Leave"
                    columns={columns}
                    data={Data}
                    // onUpdate={update}
                    customAdd={() => { setAddition(true); setopenPopup(true); }}
                    onRowClick={(event, rowData) => {
                        console.log(event.target, rowData);
                        setRow(rowData);
                        setUpdation(true);
                        setopenPopup(true)
                    }}
                />

            </Stack>

        </form>
    </>);
}

export default LeavesTable;