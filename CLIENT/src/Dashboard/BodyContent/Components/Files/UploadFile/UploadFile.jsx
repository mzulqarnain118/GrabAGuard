import React, { useState, useRef } from 'react';
import { Card, CardContent, Stack, TextField, Button } from '@mui/material';
import guidelines from "../../../../../Modules/Guidelines/Guidelines";
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import TextArea from "../../../../../Modules/UiModules/Core/TextArea";
import FileUploader from '../../../../../Modules/FileUploader/FileUploader';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import { useForm, Form } from '../../../../../Modules/UiModules/Control/useForm';
import Select from '../../../../../Modules/UiModules/Control/Select';
// import selectFormat from "../../../../../Modules/Utility/SelectFormatter";
import listformatter from '../../../../../Modules/Utility/ListFormatter';
import styles from "./UploadFile.module.css";
// import { MenuItem } from '@mui/material';
import { Autocomplete, createFilterOptions } from '@mui/material';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';
import Controls from '../../../../../Modules/UiModules/Control/Controls';

const UploadComponent = (props) => {


    return (
        <CardContent>
            <Formheading label="Upload File" />
            <UploadFile fileType={props.fileType} orderType={props.orderType} id={props.id} desig_serial={props.desig_serial} setTableUpdate={props.setTableUpdate} setOpenPopup={props.setOpenPopup} setopenPopup={(props.handlePopup) ? props.handlePopup : props.setopenPopup} label={props.label} submitAction={props.submitAction} />
        </CardContent >
    );

}

const UploadFile = (props) => {

    console.log(props);

    const fileIdRef = useRef('');
    const fileDescriptionRef = useRef('');
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e) => {
        if (files.length == 0) {
            Toast("Please Upload atleast one file!!", "error")
            return;
        }
        try {

            let formData = new FormData();
            formData.append("fileNo", fileIdRef.current.value);
            formData.append("fileDescription", fileDescriptionRef.current.value);
            formData.append("file", files[0].file, files[0].file.name);
            console.log(formData);
            debugger
            try {
                const result = await ApiCallPost('/insertfile', formData);
                console.log('Result: ', result)
                if (result.status === 200) {
                    console.log(result.data);
                    if (props.setopenPopup) {
                        props.setopenPopup(false);
                    }
                    Toast("Form Submitted Successfully", "success");
                }
                else
                    Toast("Could Not Upload File", "error");

            } catch (error) {
                Toast("Something went wrong", "error");
            }

        } catch (error) {
            Toast("Something went wrong", "error");
        }

    }

    return (
        <>
                <Stack>
                       
                    <div className='row align-items-center'>
                        <div className='col-6 col-lg-6 col-md-12 col-sm-12'>
                            <TextArea
                                required
                                label="Description" name="description"
                                inputRef={fileDescriptionRef}
                            />
                        </div>

                        <div className="col-6 col-lg-6 col-md-12 col-sm-12 pl-4 pr-4 pt-1 pb-2">
                            <FileUploader files={files} setFiles={setFiles} label='Upload File'
                                accept="image/*,.pdf" limit={1}
                            />

                        </div>
                    </div>
                    <Button variant="contained" style={{
                        float: 'right', backgroundColor: '#872b26', alignItems: 'right', marginTop: '1rem'
                        , fontSize: '0.9rem', letterSpacing: '0.05rem'
                    }}
                        onClick={() => handleSubmit()}
                    > Upload</Button>
                </Stack >
        </>
    );


}

export { UploadFile };
export default UploadComponent;