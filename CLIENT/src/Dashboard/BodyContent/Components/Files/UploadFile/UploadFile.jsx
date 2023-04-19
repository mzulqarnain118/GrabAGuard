import React, { useState, useRef } from 'react';
import { Card, CardContent, Stack, TextField, Button } from '@mui/material';
import guidelines from "../../../../../Modules/Guidelines/Guidelines";
import TextArea from "../../../../../Modules/UiModules/Core/TextArea";
import FileUploader from '../../../../../Modules/FileUploader/FileUploader';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';

const UploadComponent = (props) => {


    return (
        <CardContent>
            <Formheading label="Upload File" />
            <UploadFile fileType={props.fileType} orderType={props.orderType} id={props.id} desig_serial={props.desig_serial} setTableUpdate={props.setTableUpdate} setOpenPopup={props.setOpenPopup} setopenPopup={(props.handlePopup) ? props.handlePopup : props.setopenPopup} label={props.label} submitAction={props.submitAction} />
        </CardContent >
    );

}

const UploadFile = ({ type, accept, setTableUpdated }) => {

    console.log(type);
    const fileDescriptionRef = useRef('');
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e) => {
        if (files.length == 0) {
            Toast("Please Upload atleast one file!!", "error")
            return;
        }
        try {
            let formData = new FormData();
            formData.append("userId", localStorage.getItem('id'));
            formData.append("type", type ?? fileDescriptionRef.current.value);
            formData.append("file", files[0].file);
            try {
                const result = await ApiCallPost('/files', formData);
                console.log('Result: ', result)
                if (result.status === 201) {
                    Toast("Form Submitted Successfully", "success");
                    setTableUpdated(old => old + 1);

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
                    {!type && <div className='col-6 col-lg-6 col-md-12 col-sm-12'>
                            <TextArea
                                required
                                label="Description" name="description"
                                inputRef={fileDescriptionRef}
                            />
                        </div>}

                    {type?<div className="col-12 pl-4 pr-4 pt-1 pb-2">
                            <FileUploader files={files} setFiles={setFiles} label='Upload File'
                                accept={accept ?? "image/*,.pdf"} limit={1}
                        /></div>
                        :<div className="col-6 col-lg-6 col-md-12 col-sm-12 pl-4 pr-4 pt-1 pb-2">
                            <FileUploader files={files} setFiles={setFiles} label='Upload File'
                                accept={accept ?? "image/*,.pdf"} limit={1}
                            /></div>}

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