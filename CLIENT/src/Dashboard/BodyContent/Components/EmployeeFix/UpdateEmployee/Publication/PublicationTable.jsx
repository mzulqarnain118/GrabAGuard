import React, { useEffect, useState } from 'react'
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Card from "../../../../../../Modules/UiModules/Core/Card"
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Button, CardContent, Typography, TextField, Divider, Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import AddIcon from '@material-ui/icons/Add';
import { ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import PublicationForm from './PublicationForm';

const PublicationTable = (props) => {
    const emp_id = props.id
    const [openPopup, setopenPopup] = useState(false);
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [Data, setData] = useState([]);
    const [tableUpdated, setTableUpdated] = useState(0);
    const [row, setRow] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            var result = await ApiCallPost('/get_emp_publications', { emp_id: emp_id });
            if (result.error) {
                Toast(result.text, "error");
            } else {
                setData(result.data);
            }
        }
        fetchData();
    }, [tableUpdated]);

    const columns = [

        // { title: "Publication ID", editable: () => false, field: 'publication_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Publication Desc", editable: () => false, field: 'publication_desc', type: 'sting', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Publication Jounal", editable: () => true, field: 'publication_jounal', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Publication Year", editable: () => true, field: 'publish_year', type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entered By", editable: () => true, field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entry Date/Time", editable: () => true, field: 'entry_datetime', type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    ];

    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
    }

    const onDelete = async (row) => {
        var result = await ApiCallPost("/delete_emp_publication", { publication_id: row.publication_id });
        setData((olddata) => {
            return olddata.filter((r) => r.publication_id !== row.publication_id);
        });
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
                <Popup title='Add Employee Publication' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <PublicationForm setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} id={emp_id} /> : null}
                    {updation ? <PublicationForm data={row} setTableUpdated={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} id={emp_id} /> : null}

                </Popup>
                <MatTable
                    onDelete={onDelete}
                    actionsAtStart={true}
                    title="Employee Publication"
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

export default PublicationTable;