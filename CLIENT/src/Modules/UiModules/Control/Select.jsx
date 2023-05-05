import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, TextField } from '@mui/material';

export default function Select(props) {

    const { name, multiple, label, value, error = null, onChange, options } = props;

    return (
        <FormControl fullWidth variant="standard"
            {...(error && { error: true })}>
            <InputLabel>{`${label}${props.required ? ` *` : ``}`}</InputLabel>
            <MuiSelect
                value={value ?? " "}
                label={`${label}${props.required ? `*` : ``}`}
                name={name}
                multiple={multiple}
                onChange={onChange}
                disabled={props.disabled}
                required={props.required}
                fullWidth
                {...(error && { error: true, helperText: error })}
                renderInput={(params) => (
                    <TextField {...params} {...props} fullWidth label={label} variant="standard" />
                )}
            >
                {props.required ? null : <MenuItem value="">None</MenuItem>}

                {props.children ? props.children : null}
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
