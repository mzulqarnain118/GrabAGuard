import React, { useEffect, useState } from 'react'
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import StudySchemeForm from './StudySchemeForm';
import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';
const StudySchemeTable = (props) => {
    const emp_id = props.id
    const [openPopup, setopenPopup] = useState(false);
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [Data, setData] = useState([]);
    const [tableUpdated, setTableUpdated] = useState(0);
    const [row, setRow] = useState({});
    props.setData(Data);

    useEffect(() => {
        const fetchData = async () => {
            var result = await ApiCallPost('/get_emp_study_schemes', { emp_id: emp_id });
            if (result.error) {
                Toast(result.text, "error");
            } else {
                setData(result.data);
                // Toast('Data Fetched Successfully!', 'success')
            }
        }
        fetchData();
    }, [tableUpdated]);

    const columns = [
        { title: "StudySheme ID", editable: () => false, field: 'study_scheme_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, hidden: true },
        { title: "StudySheme Desc", editable: () => false, field: 'scheme_desc', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Country", editable: () => false, field: 'country_name', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Start Date", editable: () => false, field: 'start_date', dateSetting: { locale: "en-GB" }, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "End Date", editable: () => false, field: 'end_date', dateSetting: { locale: "en-GB" }, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entered By", editable: () => true, field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entry Date/Time", editable: () => true, field: 'entry_datetime', type: 'date', render: (row) => DateTimeGetter(new Date(row.entry_datetime)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    ];

    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
    }

    const onDelete = async (row) => {
        var result = await ApiCallPost("/delete_emp_study_scheme", { study_scheme_id: row.study_scheme_id });
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
                <Popup title='Add Employee StudyScheme' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <StudySchemeForm setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} id={emp_id} /> : null}
                    {updation ? <StudySchemeForm data={row} setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} id={emp_id} /> : null}
                </Popup>
                <MatTable
                    onDelete={onDelete}
                    actionsAtStart={true}
                    title="Employee StudyScheme"
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

export default StudySchemeTable;