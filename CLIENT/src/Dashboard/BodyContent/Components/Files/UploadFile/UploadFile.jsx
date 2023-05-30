import React, { useState, useRef } from 'react';
import { Card, CardContent, Stack, TextField, Button } from '@mui/material';
import guidelines from "../../../../../Modules/Guidelines/Guidelines";
import TextArea from "../../../../../Modules/UiModules/Core/TextArea";
import FileUploader from '../../../../../Modules/FileUploader/FileUploader';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { ApiCallGet, ApiCallPatch, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';

const UploadComponent = (props) => {


    return (
        <CardContent>
            <Formheading label="Upload File" />
            <UploadFile fileType={props.fileType} orderType={props.orderType} id={props.id} desig_serial={props.desig_serial} setTableUpdate={props.setTableUpdate} setOpenPopup={props.setOpenPopup} setopenPopup={(props.handlePopup) ? props.handlePopup : props.setopenPopup} label={props.label} submitAction={props.submitAction} />
        </CardContent >
    );

}

const UploadFile = ({
  type,
  accept,
  userId,
  setLoading,
  isExists,
  setTableUpdated,
}) => {
  const fileDescriptionRef = useRef("");
  const [files, setFiles] = useState([]);
  const handleSubmit = async (e) => {
    if (files.length == 0) {
      Toast("Please Upload atleast one file!!", "error");
      return;
    }
    try {
      setLoading(true);
      let formData = new FormData();
      const id = localStorage.getItem("id");
      formData.append("userId", userId ?? id);
      formData.append("type", type ?? fileDescriptionRef.current.value);
      formData.append("file", files[0].file);
      let result;
      if (isExists) {
        result = await ApiCallPatch(`/files/${isExists}`, formData);
      } else {
        result = await ApiCallPost("/files", formData);
      }
        if (result.status === 201 || result.status === 200) {
                console.log("Result->uploadFile: ", result, result.status);
        Toast("File Uploaded Successfully", "success");
        setTableUpdated((old) => old + 1);
        setLoading(false);
      } else {Toast("Could Not Upload File", "error");
      setLoading(false);}
    } catch (error) {
      Toast("Something went wrong", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <Stack>
        <div className="row align-items-center">
          {!type && (
            <div className="col-12 col-lg-12 col-md-12 col-sm-12">
              <TextArea
                required
                label="Description"
                name="description"
                inputRef={fileDescriptionRef}
              />
            </div>
          )}

          {type ? (
            <div className="col-12 col-lg-12 col-md-12 pl-4 pr-4 pt-1 pb-2">
              <FileUploader
                files={files}
                setFiles={setFiles}
                label="Upload File"
                accept={accept ?? "image/*,.pdf"}
                limit={1}
              />
            </div>
          ) : (
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-4 pr-4 pt-1 pb-2">
              <FileUploader
                files={files}
                setFiles={setFiles}
                label="Upload File"
                accept={accept ?? "image/*,.pdf"}
                limit={1}
              />
            </div>
          )}
        </div>
        <Button
          variant="contained"
          style={{
            float: "right",
            backgroundColor: "#872b26",
            alignItems: "right",
            marginTop: "1rem",
            fontSize: "0.9rem",
            letterSpacing: "0.05rem",
          }}
          onClick={() => handleSubmit()}
        >
          {" "}
          Upload
        </Button>
      </Stack>
    </>
  );
};

export { UploadFile };
export default UploadComponent;