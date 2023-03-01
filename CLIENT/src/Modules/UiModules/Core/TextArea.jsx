import React from 'react';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
import { TextField } from "@mui/material";

export default function MaxHeightTextarea(props) {
    return (
        <div className="row pl-4 pr-4 pt-1 pb-2">
            <TextField id="outlined-basic" label={props.label} variant="outlined"
                multiline={true}
                rows={props.rows ?? 5}
                fullWidth
                required={props.required || false}
                name={props.name}
                value={props.setValue}   //state 
                onChange={props.onChange}
                {...props}
            //set state

            />


        </div>

    );
}
