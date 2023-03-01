import React from 'react';
import { styled } from '@mui/material/styles';
// import Chip from '@mui/material/Chip';
// import Paper from '@mui/material/Paper';
// import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Button, } from "@mui/material";
// import guidelines from "../../Guidelines/Guidelines.js";
import styles from "./Upload.module.css";
import UploadIcon from '@mui/icons-material/Upload';

const Input = styled('input')({
    display: 'none',
});
export default function ChipsArray() {
    const [files, setFiles] = React.useState(null);

    let displayName = "Select Files";
    if (files) {
        console.log(files);
        displayName = "";
        for (let i = 0; i < files.length; i++) {
            displayName += files[i].name;
            if (i !== files.length - 1)
                displayName += ", ";
        }
    }

    const fileChangeHandler = (e) => {
        console.log(e.target.files);
        setFiles(e.target.files);
        // console.log(files);
    }

    const fileUploadHandler = (e) => {
        // console.log(e.target);
    }


    return (<>
        <div className={`col-lg-4 col-md-6 col-sm-12 col-12  pb-3 ${styles.padding__top} align-self-center`}>

            <label className={styles.label} htmlFor="contained-button-file">
                <Input fullWidth accept="*" id="contained-button-file" multiple type="file" onChange={fileChangeHandler} />
                <Button fullWidth variant="outlined" component="span" startIcon={<UploadIcon />} onClick={fileUploadHandler}>
                    {displayName}
                </Button>
            </label>

        </div>
    </>
    );
}
