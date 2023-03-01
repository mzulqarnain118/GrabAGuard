import React from 'react'
import { Autocomplete as MuiAutocomplete, TextField, Popper } from '@mui/material';

export default function Autocomplete(props) {

    const { name, label, value, setValues, options } = props;
    const defaultProps = {
        options: options,
        getOptionLabel: (option) => option.title,
    };


    const [valueField, setValueField] = React.useState(null);

    if (value && !valueField && options.length > 0) {
        const val = options.find((op) => op.id === value);
        setValueField(val);
    }

    React.useEffect(() => {
        if (value && options.length > 0) {
            const val = options.find((op) => op.id === value);
            setValueField(val);
        }
        if (!value && valueField) {
            setValueField(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const PopperMy = function (props) {
        return (<Popper {...props} style={{ width: 'fitContent' }} placement='bottom-start' />)
    }
    // console.log(valueField)
    return (
        <MuiAutocomplete
            {...defaultProps}
            {...props}
            PopperComponent={PopperMy}
            value={valueField}
            label={`${label}${props.required ? `*` : ``}`}
            name={name}
            fullWidth
            disableClearable={props?.required ? true : false}
            disabled={props.disabled}
            required={props?.required ?? false}
            onChange={(event, newValue) => {
                setValueField(newValue);
                if (setValues) {
                    setValues((old) => ({ ...old, [name]: newValue?.id ?? null }));
                }
                if (props.change) {
                    props.change(newValue?.id ?? null);
                }
            }}
            renderInput={(params) => (
                <TextField {...params} {...props} fullWidth label={label} variant="standard" />
            )}
        />
    )
};