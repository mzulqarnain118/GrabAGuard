import React, { useEffect, useState } from 'react'
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import PreviousExperienceForm from './PreviousExperienceForm';
import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
const PreviousExperienceTable = (props) => {

    const emp_id = props.id
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [tableUpdated, setTable] = useState(0);

    useEffect(() => {

        const getData = async () => {

            var result = await ApiCallPost('/get_emp_previous_experiences', { emp_id: emp_id });
            if (result.error) {
                Toast(result.text, "error");
            } else {
                setData(result.data);
            }
        }
        getData();

    }, [tableUpdated]);


    const [openPopup, setopenPopup] = useState(false);
    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
    }

    const [Data, setData] = useState([]);
    const [row, setRow] = useState({});
    props.setData(Data);

    const columns = [

        { title: "Previous Exp ID", editable: () => false, field: 'prev_exp_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, hidden: true },
        { title: "Experience Post", editable: () => false, field: 'exp_post_desc', type: 'sting', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Experience Institute", editable: () => false, field: 'exp_inst_desc', type: 'sting', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Experience Institute Type", editable: () => false, field: 'inst_type_desc', type: 'sting', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Experience Job Type", editable: () => false, field: 'exp_job_type_desc', type: 'sting', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Salary Scale", editable: () => false, field: 'exp_salary_scale', type: 'sting', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Exp Start Date", editable: () => true, field: 'exp_start_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Exp End Date", editable: () => true, field: 'exp_end_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Leaving Purpose", editable: () => true, field: 'exp_leaving_purpose', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entered By", editable: () => true, field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entry Date/Time", editable: () => true, field: 'entry_datetime', type: 'date', render: (row) => DateTimeGetter(new Date(row.entry_datetime)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

    ];

    const onDelete = async (row) => {
        const data = {
            prev_exp_id: row.prev_exp_id
        }
        var result = await ApiCallPost("/delete_emp_prev_experience", data);
        if (result.error) {
            Toast(result.text, "error");
        } else {
            setTable(old => old + 1);
            Toast('Data Deleted Successfully!', 'success')
        }

    };
    return (<>
        <form>
            <Stack>


                <Popup title='Add Employee PreviousExperience' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <PreviousExperienceForm id={emp_id} data={Data} setTable={setTable} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
                    {updation ? <PreviousExperienceForm id={emp_id} data={row} setTable={setTable} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}
                </Popup>
                <MatTable
                    actionsAtStart={true}
                    title="Employee PreviousExperience"
                    columns={columns}
                    data={Data}
                    onDelete={onDelete}
                    // onUpdate={update}
                    customAdd={() => { setAddition(true); setopenPopup(true); }}
                    onRowClick={(event, rowData) => {
                        console.log(event.target, rowData);
                        setRow(rowData);
                        setUpdation(true);
                        setopenPopup(true)
                    }} />

            </Stack>

        </form>
    </>);
}

export default PreviousExperienceTable;