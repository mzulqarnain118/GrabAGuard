import React,{useEffect, useState} from 'react';
import { Button, Stack } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { UploadFile } from '../../../Files/UploadFile/UploadFile';
import {
  ApiCallGet,
} from "../../../../../../Modules/CoreModules/ApiCall";

const ImageDisplay = () => {
  const location = useLocation();
  const history = useHistory();
  const id = location.state.id;
      const [tableUpdated, setTableUpdated] = useState(0);
  const [loading, setLoading] = React.useState(false);
      const { response, error } = ApiCallGet(`/files/${id}`, {
        getUpdatedData: tableUpdated,
      });

useEffect(() => {
  console.log(response, "ImageDisplay");
}, [response]);
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {response?.map((image) => (
        <div
          key={image.updatedAt}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="col-12 col-lg-12 col-md-12 col-sm-12">
            <UploadFile
              type={image.type}
              userId={image.userId}
              setLoading={setLoading}
              isExists={image._id}
              setTableUpdated={setTableUpdated}
            />
          </div>
          <div className="col-12 col-lg-12 col-md-12 col-sm-12">
            <img
              src={image.url}
              alt={image.type}
              style={{ height: "auto", width: "1000px" }}
            />
          </div>
        </div>
      ))}
      <div
        className={`${guidelines.inputclass}`}
        style={{ marginBottom: "100px" }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            history.goBack();
            // setOpen(false);
          }}
        >
          BACK
        </Button>
      </div>
    </div>
  );
};

export default ImageDisplay;
