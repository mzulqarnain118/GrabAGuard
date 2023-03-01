import React, { useState, useEffect } from "react";
import { TextField, Button } from '@mui/material';
import guidelines from "../../../../../../Modules/Guidelines/Guidelines";
import { ApiCallGet, ApiCallGetDownloadFile, ApiCallPost } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from "../../../../../../Modules/UiModules/Core/Toast/Toast";
import MatTable from "../../../../../../Modules/MaterialTable/MaterialTable";
import Popup from "../../../../../../Modules/UiModules/Core/Popup";
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import UploadFile from "../../../Files/UploadFile/UploadFile";
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import UploadComponent from '../../../Files/UploadFile/UploadFile';
import { Form } from '../../../../../../Modules/UiModules/Control/useForm';


const OrderDetailTable = (props) => {
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [tableUpdate, setTableUpdate] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const emp_id = props.id
    const sr = props.sr

    const [record, setrecord] = React.useState([]);
    const [openPopup, setopenPopup] = useState(false);
    const [row, setRow] = useState({});
    const [fileSelect, setfileSelect] = React.useState('');
    const [file, setFile] = React.useState([]);
    const [filerecord, setFileRecord] = React.useState([]);


    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);

    }

    const columns = [

        {
            title: "Download",
            render: (row) => <button onClick={async () => await ApiCallGetDownloadFile(`/downloadfile/${row.file_id}`, row.file_name)}><GetAppOutlinedIcon fontSize="large" /> </button>,
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "File ID /Order No",
            field: "file_no",
            type: "text",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "File Name",
            field: "file_name",
            type: "text",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "File Type",
            editable: () => true,
            field: "file_type_desc",
            type: "text",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Order Type",
            editable: () => true,
            field: "order_type_desc",
            type: "text",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Subject/Title",
            field: "file_subject",
            type: "text",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "File Date",
            field: "file_date",
            type: "date",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "File Description",
            field: "file_desc",
            type: "text",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Uploaded By",
            field: "entered_by",
            type: "text",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },
        {
            title: "Entry Date",
            field: "entry_datetime",
            type: "date",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        }
    ]


    useEffect(() => {

        const fetchData = async () => {
            var result = await ApiCallPost('/get_emp_files', { emp_id: emp_id, desig_serial: sr });
            console.log(result, "data")
            if (result.error) {
                Toast(result.text, 'error')
            }
            else {
                console.log(result);
                setrecord(result.data);
            }
            result = await ApiCallPost('/get_file_select', { file_type: null, order_type: null });
            if (result.error) {
                Toast('Data Could Not be Fetched', 'error')
            }
            else {
                let settedResult = result.data.map((item, index) => {
                    return { id: item.file_id, title: item.file_no }
                });
                setFileRecord(settedResult);
                console.log('record', result.data);
            }

        }
        fetchData();


    }, [tableUpdate]);


    const linkFile = async (e) => {

        e.preventDefault();
        setDisabled(true);
        const result = await ApiCallPost('/link_file', { file_id: fileSelect, emp_id: emp_id, desig_id: sr });
        if (result.error) {
            Toast("Something is wrong or file already linked!", "error");
        } else {
            setrecord((old) => [...old, { file_id: result.data.file_id, file_no: result.data.file_no, file_name: result.data.file_name, file_type_desc: result.data.file_type_desc, order_type_desc: result.data.order_type_desc, file_subject: result.data.file_subject, file_date: result.data.file_date, file_desc: result.data.file_desc, entered_by: result.data.entered_by, entry_datetime: result.data.entry_datetime }]);
            Toast("File Linked Successfully!", "success");
        }
        setDisabled(false);
    }


    return (
        <>
            <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>

                <Popup title='DesigFiles' openPopup={openPopup} setOpenPopup={handlePopup} >
                    {addition ? <UploadFile id={emp_id} desig_serial={sr} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} /> : null}
                    {updation ? <UploadFile id={emp_id} desig_serial={sr} data={row} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}

                </Popup>
                <Form onSubmit={linkFile}>
                    <div className="row">
                        <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Controls.Select fullWidth

                                name="selection_file"
                                label="Select File No."
                                value={fileSelect}
                                onChange={(e) => {
                                    (setfileSelect(e.target.value));
                                }}
                                options={filerecord}
                                required

                            />
                        </div>
                        <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" disabled={disabled}
                                type='submit'
                            >Link File</Button>
                        </div>
                    </div>
                </Form>
                <MatTable title="Desig Files" columns={columns} style={{ margin: '1rem' }}
                    actionsAtStart={true}
                    customAdd={() => { setAddition(true); setopenPopup(true); }}
                    data={record}
                // onRowClick={(event, rowData) => {
                //     setRow(rowData);
                //     setUpdation(true);
                //     setopenPopup(true);
                // }}
                />
            </div>
        </>

    );
}
export default OrderDetailTable;