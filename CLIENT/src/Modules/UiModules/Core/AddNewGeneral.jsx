import React, { useEffect, useState } from 'react';
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import Popup from './Popup';
import AddIcon from '@mui/icons-material/Add';

const AddNewGeneral = (props) => {
    const [openPopup1, setopenPopup1] = useState(false);
    const handlePopup = (value) => {
        if (props.setUpdated)
            props.setUpdated(old => old + 1);
        setopenPopup1(value);
    }

    return (
        <>

            <Tooltip title={`Add New ${props.label}`} >
                <IconButton sx={{ marginTop: '1rem !important' }} color="success" aria-label="add" onClick={() => setopenPopup1(true)}>

                    < AddIcon />
                </IconButton>
            </Tooltip>
            <Popup title={`Add New ${props.label}`} openPopup={openPopup1} setOpenPopup={handlePopup} >
                {props.children}
            </Popup>
        </>
    );
}

export default AddNewGeneral;