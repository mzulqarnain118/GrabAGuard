import React, { useEffect, useState } from 'react'
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import ReimbursementForm from './ReimbursementForm';
import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';
const ReimbursementTable = (props) => {
    const emp_id = props.id
    const [openPopup, setopenPopup] = useState(false);
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [Data, setData] = useState([]);
    const [tableUpdated, setTableUpdated] = useState(0);
    const [row, setRow] = useState({});
    const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();

    useEffect(() => {
        const fetchData = async () => {
            var result = await ApiCallPost('/get_employee_reimbursements', { emp_id: emp_id });
            if (result.error) {
                Toast(result.text, "error");
            } else {
                setData(result.data);
            }

        }
        fetchData();
    }, [tableUpdated]);

    const columns = [

        { title: "Hospital", editable: () => false, field: 'hospital_name', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Reimburse Type", field: 'reimb_type_desc', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Reimburse Relation Type", editable: () => true, field: 'reimb_rel_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Amount", editable: () => true, field: 'embr_amount', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Date", editable: () => true, field: 'embr_date', type: 'string', render: (row) => CurdateFormated(new Date(row.embr_date)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entered By", editable: () => true, field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entry Date/Time", editable: () => true, field: 'entry_datetime', type: 'string', render: (row) => DateTimeGetter(new Date(row.entry_datetime)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

    ];

    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
    }

    const onDelete = async (row) => {
        var result = await ApiCallPost("/delete_emp_reimbursement", { reimb_id: row.reimb_id });

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


                <Popup title='Add Employee Reimbursement' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <ReimbursementForm setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} id={emp_id} /> : null}
                    {updation ? <ReimbursementForm data={row} setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} id={emp_id} /> : null}

                </Popup>
                <MatTable
                    onDelete={onDelete}
                    actionsAtStart={true}
                    title="Employee Reimbursement"
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

export default ReimbursementTable;