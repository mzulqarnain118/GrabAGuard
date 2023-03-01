import React from 'react'
import { TextField } from "@mui/material";

export default function Input(props) {

    const { name, label, value, defaultValue, error = null, onChange, ...other } = props;
    return (
        <TextField
            fullWidth variant="standard"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            onWheel={(e) => {
                if (props?.inputProps?.type === 'number')
                    e.target.blur()
            }}
            defaultValue={defaultValue}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}