import React from 'react';
import { Button, Stack } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import { useLocation, Link, useHistory } from 'react-router-dom';
const ImageDisplay = () => {
  const location = useLocation();
  const history = useHistory();
  const data = location.state.data;
  console.log(data, "ImageDisplay")
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",height:"100vh",overflowY:"scroll"}}>
      <div className={`${guidelines.inputclass}`}>
      {data?.map((image) => (
        <img src={image.url} alt={image.type} key={image._id} />
      ))}
     
    </div>
      <div className={`${guidelines.inputclass}`}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
          size="large"
          onClick={() => history.goBack()}
          >
            BACK
          </Button>

      </div>
    </div>
  );
};

export default ImageDisplay;
