import React, { useState, useEffect } from 'react'
import { ApiCallGet, ApiCallGetDownloadFile } from '../../../../../Modules/CoreModules/ApiCall';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import Card from "../../../../../Modules/UiModules/Core/Card";
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
const columns = [
    {
        title: "Download",
        render: (row) => <button onClick={async () => await ApiCallGetDownloadFile(`/downloadfile/ ${row.file_id}`, row.file_name)}><GetAppOutlinedIcon fontSize="large" /> </button>,
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
        field: "type_desc",
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
    }, {
        title: "Entry Date",
        field: "entry_datetime",
        type: "string",
        cellStyle: { textAlign: "center" },
        headerStyle: { textAlign: "center" },
    },


];

const AllFiles = () => {
    const [fileRecords, setfileRecords] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            let Files = await ApiCallGet('/getfilerecords');
            setfileRecords(Files.data)
            console.log(Files)
        };
        fetchData();

    }, [])
    return (
        <Card>
            <div className="row">

                <div className="col">
                    <MatTable title="All General Files" columns={columns} data={fileRecords} />
                </div>
            </div>
        </Card>
    )
}

export default AllFiles;