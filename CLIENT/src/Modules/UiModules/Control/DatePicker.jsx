import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MuiDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';

const DatePicker = (props) => {

    const { name, label, value, error = null, onChange, ...other } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <MuiDatePicker
                label={label}
                // @ts-ignore
                name={name}
                value={value}
                // inputFormat="dd/MM/yyyy"
                
                //This format is displayed on frontend
                inputFormat={props.inputFormat || "dd/MM/yyyy"}
                //inputFormat="E yyyy-MM-dd HH:MM:SS O "
                onChange={date => onChange(convertToDefEventPara(name, date))}
                views={props.views || ['year', 'month', 'day']}
                
                
                //This format is sent to the backend
                format="YYYY-MM-DD"

                renderInput={(params) => <TextField {...params}  {...other} {...(error && { error: true, helperText: error })} />}
            />

        </LocalizationProvider>
    )
}

export default DatePicker;

