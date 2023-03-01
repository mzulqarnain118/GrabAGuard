import React, { useState, useEffect } from 'react'
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { Alert } from '@mui/material';
import Scale from './Scale';

const ScaleType = () => {

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

    const columns = [


        {
            title: "Scale Code",
            editable: () => true,
            field: "scale_code",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Scale Number",
            editable: () => true,
            field: "scale_number",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Scale Type",
            editable: () => true,
            field: "scale_type_desc",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
            // lookup: scaletype,
        },

        {
            title: "Entered By",
            field: "emp_name",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: " Entery Time ",
            field: "entry_datetime",
            type: "date",
            editable: () => false,
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "left" },
        },

    ]


    useEffect(() => {

        const fetchData = async () => {

            try {
                var result = await ApiCallGet('/getscale');
                console.log(result);
                setrecord(result.data);

                // var result1 = await ApiCallGet('/Get_Scale_Type');
                // const newData = listformatter(result.data, 'scale_type_id', 'scale_type_desc');
                // set_scaletype(newData);





            }
            catch {
                alert("error");

            }

        }
        fetchData();

    }, [tableUpdated]);

    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
    }


    return (<>

        <div className='col-12'>
            <Alert severity="info" className='mb-5'>
                Click on a scale to update it <br />
                Click on + button to add new scale
            </Alert>

            <Popup title='ADD Scale' openPopup={openPopup} setOpenPopup={handlePopup} >
                {addition ? <Scale data={record} setTable={setTableUpdated} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
                {updation ? <Scale data={row} setTable={setTableUpdated} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}
            </Popup>
            <MatTable
                actionsAtStart={true}
                Options={options}
                title="All Scale"
                columns={columns}
                data={record}
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

export default ScaleType;