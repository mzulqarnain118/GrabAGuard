import React, { useState } from 'react'


export function useForm(initialFValues) {


    const [values, setValues] = useState(initialFValues);

    const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();


    const handleChange = (e, format) => {
        const { name, value } = e.target;

        console.log(name, value);

        setValues({
            ...values,
            [name]: (format === true) ? CurdateFormated(new Date(value)) : value
        })
    }



    return {
        values,
        setValues,
        handleChange
    };
}


export function Form(props) {
    const { ...other } = props;
    return (
        <form {...other}>
            {props.children}
        </form>
    )
}

