import React, { useEffect, useState } from 'react'
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Card from "../../../../../../Modules/UiModules/Core/Card"
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Button, CardContent, Typography, TextField, Divider, Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import AllAdvertisements from '../../../Forms/AllAdvertisements/AllAdvertisements';
import AddIcon from '@material-ui/icons/Add';
import { ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import ProfessionalTrainingForm from './ProfessionalTrainingForm';
import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';
const ProfessionalTrainingTable = (props) => {
    const emp_id = props.id
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [tableUpdated, setTable] = useState(0);

    useEffect(() => {

        const getData = async () => {

            var result = await ApiCallPost('/get_emp_professional_trainings', { emp_id: emp_id });
            if (result.error) {
                Toast(result.text, "error");
            } else {
                setData(result.data);
            }
        };
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
        { title: "Training ID", field: 'training_id', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => true, hidden: true },
        { title: "Course/Certificate Name", field: 'course_name', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => true },
        // { title: "Field Of Study", field: 'field_name', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => true },
        { title: "Training Institute", field: 'exp_inst_desc', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => true },
        { title: "Start Date", editable: () => false, field: 'start_date', dateSetting: { locale: "en-GB" }, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "End Date", editable: () => false, field: 'end_date', dateSetting: { locale: "en-GB" }, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entered By", editable: () => true, field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entry Date/Time", editable: () => true, field: 'entry_datetime', type: 'date', render: (row) => DateTimeGetter(new Date(row.entry_datetime)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Remarks", editable: () => true, field: 'remarks', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },



    ];
    const onDelete = async (row) => {
        const data = {
            training_id: row.training_id
        }

        var result = await ApiCallPost("/delete_emp_professional_training", data);
        if (result.error) {
            Toast(result.text, "error");
        } else {
            setTable(old => old + 1);
            Toast('Data Deleted', 'success')
        }


    };



    return (<>
        <form>
            <Stack>

                <Popup title='Add Employee ProfessionalTraining' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <ProfessionalTrainingForm id={emp_id} data={Data} setTable={setTable} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
                    {updation ? <ProfessionalTrainingForm id={emp_id} data={row} setTable={setTable} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}
                </Popup>

                <MatTable
                    actionsAtStart={true}
                    title="Employee Professional Training"
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

export default ProfessionalTrainingTable;