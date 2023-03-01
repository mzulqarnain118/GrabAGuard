import React from 'react';
import TextField from '@mui/material/TextField';
export default function DateTimePicker(props) {
    const { name, label, id, type, value, defaultValue, error = null, onChange, ...other } = props;

    return (

        <TextField
            id={id}
            fullWidth variant="standard"
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            sx={{ width: 250 }}
            InputLabelProps={{
                shrink: true,
            }}
            {...other}
            {...(error && { error: true, helperText: error })}
        />

    );
}