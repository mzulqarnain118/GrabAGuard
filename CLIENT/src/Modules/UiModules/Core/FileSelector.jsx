import React, { useState, useEffect } from 'react';
import Select from '../Control/Select';
//import Popup from './Popup';
//import guidelines from '../../Guidelines/Guidelines';
//import AddIcon from '@mui/icons-material/Add';
import UploadComponent, { UploadFile } from '../../../Dashboard/BodyContent/Components/Files/UploadFile/UploadFile';
import { ApiCallPost } from '../../CoreModules/ApiCall';
//import { Tooltip } from '@mui/material';
import AddNewGeneral from './AddNewGeneral';
import Toast from './Toast/Toast';
//import OrderType from '../../../Dashboard/BodyContent/Components/Admin/SetupForms/MasterForms/OrderType';

const FileSelector = (props) => {
    const [openPopup2, setopenPopup2] = useState(false);
    const [record, setRecord] = React.useState([]);
    const [openPopup1, setopenPopup1] = useState(false);
    const [updated, setUpdated] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            var result = await ApiCallPost('/get_file_select', { file_type: props.fileType, order_type: props.orderType ?? 0 });
            if (result.error) {
                Toast('Data Could Not be Fetched', 'error')
            }
            else {
                let settedResult = result.data.map((item) => {
                    return { id: item.file_id, title: item.file_no }
                });
                setRecord(settedResult);
                console.log(record);
            }


        }
        fetchData();

    }, [updated]);

    console.log(props)
    return (


        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Select fullWidth

                name="fileSelect"
                label="Select File No."
                value={props.fileSelect}
                onChange={(e) => {
                    (props.setfileSelect(e.target.value));
                    props.setFile(record.filter((row) => row.id === e.target.value))
                }}
                options={record}

            />
            <AddNewGeneral label='File' setUpdated={setUpdated}><UploadComponent fileType={props.fileType} orderType={props.orderType} /></AddNewGeneral>

            {/* <Tooltip title={`Add New ${props.label}`}>
                    <IconButton sx={{ marginTop: '1rem !important' }} color="success" aria-label="add" onClick={() => setopenPopup2(true)}>
                        < AddIcon />
                    </IconButton>
                </Tooltip>

                <Popup title='Upload File' openPopup={openPopup2} setOpenPopup={setopenPopup2} >
                    <UploadFile fileType={props.fileType} />
                </Popup> */}
        </div>






    )
}
export default FileSelector;