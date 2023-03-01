import React, { useEffect, useState } from 'react';
import { ApiCallGet, ApiCallGetDownloadFile, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import Card from '../../../../../../Modules/UiModules/Core/Card';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import UploadComponent from '../../../Files/UploadFile/UploadFile';
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
const Files = (props) => {
    const [fileRecords, setfileRecords] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const screenData = {
                emp_id: props.id, desig_serial: null
            }
            let Files = await ApiCallPost('/get_emp_files', screenData);
            if (Files.data.length === 1 && Files.data[0].file_id === null)
                setfileRecords([]);
            else
                setfileRecords([...Files.data])
        };
        fetchData();

    }, [])
    const columns = [
        {

            title: "Download",
            render: (row) => <button onClick={async () => (row.file_id) ? await ApiCallGetDownloadFile(`/downloadfile/ ${row.file_id}`, row.file_name) : null}><GetAppOutlinedIcon fontSize="large" /> </button>,
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "File ID",
            editable: () => false,
            field: "file_id", hidden: true,
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "File NO/Order NO",
            editable: () => false,
            field: "file_no",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "File Name",
            field: "file_name",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "File Type",
            field: "file_type_desc",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "Order Type",
            field: "order_type_desc",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "File Subject/Title",
            field: "file_subject",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "File Date",
            field: "file_date",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },

        {
            title: "File Description",
            field: "file_desc",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "File Keywords",
            field: "keywords",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "Uploaded By",
            field: "emp_name",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "Entry Date",
            field: "entry_datetime",
            type: "string",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },

    ];

    return (<>
        <Card>
            <div className="row">
                <Popup title=' ' openPopup={openPopup} setOpenPopup={setOpenPopup}>
                    <UploadComponent id={props.id} />
                </Popup>
                <div className="col">
                    <MatTable title="Employee Files" columns={columns} data={fileRecords}
                        customAdd={() => { setOpenPopup(true); }}
                    />
                </div>
            </div>
        </Card>
    </>);
}

export default Files;