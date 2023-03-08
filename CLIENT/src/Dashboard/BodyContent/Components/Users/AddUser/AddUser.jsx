import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import style from "../PasswordSettings/Newpassword.module.css"
import FormHelperText from '@mui/material/FormHelperText';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Select from '../../../../../Modules/UiModules/Control/Select';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import listformatter from '../../../../../Modules/Utility/ListFormatter';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import Card from '../../../../../Modules/UiModules/Core/Card';
// import Autocomplete from '../../../../../Modules/UiModules/Control/Autocomplete';
import { createFilterOptions, Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import QualificationTable from '../../EmployeeFix/UpdateEmployee/Qualification/QulaificationTable';
const AddUser = (props) => {

    const [roles, setRoles] = useState([])
    const [disable, setDisable] = useState(false)
    const [employees, setEmployees] = useState([]);
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        showPassword2: false,
        UserID: false,
        UserName: null,
        confirmpass: '',
        usererror: false,
        userhelper: null,
        curerror: false,
        curhelper: null,
        passerror: false,
        passhelper: null,
        role: ''
    });
    console.log(values)




    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 100
    });

    useEffect(() => {

        const fetchData = async () => {

            const result3 = await ApiCallGet('/getEmpGeneralDataFile');//getEmpGeneralDataFile
            let arr = []
            result3.data.map((val) => {
                arr.push({ id: val.emp_id, title: val.emp_name, cnic: val.nic })
            })
            console.log('Emps from backend: ', arr)
            setEmployees(arr)

            let results = await ApiCallGet('/get_user_roles')
            if (results.error) {
                Toast("Can't fetch data", "error");
            }
            else {
                console.log('results ', results.data)
                setRoles(results.data)
                let arr = []
                const newData1 = await listformatter(results.data, 'role_id', 'role_desc');
                console.log(props.user.role)
                if (props?.user.role === 'HRM_ADM') {
                    console.log('abc')
                    newData1?.map((val) => {
                        return (!(val.id === 'ADM' || val.id === 'ORIC_ADM' || val.id === 'ORIC_CP') ?
                            arr.push(val)
                            : null)
                    })
                } else if (props?.user.role === 'ORIC_ADM') {
                    newData1?.map((val) => {
                        return ((val.id === 'ORIC_ADM' || val.id === 'ORIC_CP') ?
                            arr.push(val)
                            : null)
                    })
                }
                else {
                    arr = newData1
                }
                // arr = newData1

                console.log('new data', arr)
                setRoles(arr);
            }
        }

        fetchData();

    }, [])

    const handleChange = (prop, event) => {

        let cerror = values.confirmpass;
        let perror = values.passerror;
        let cuerror = values.curerror

        if (prop === 'confirmpass') {
            cerror = false;
        }

        if (prop === 'password') {
            perror = false;
        }


        if (prop === 'UserName') {
            perror = false;
        }

        setValues({
            ...values, [prop]: event.target.value, usererror: cerror, passerror: perror, curerror: cuerror
        });
    };



    const handleClickShowPassword = (prevPasswordState) => {
        setValues({
            ...values,
            showPassword: !prevPasswordState,

        });
    };

    const handleClickShowPassword2 = (prevPasswordState2) => {
        setValues({
            ...values,

            showPassword2: !prevPasswordState2
        });
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const AddUser = async (e) => {

        console.log('username', values)
        e.preventDefault();
        setDisable(true)
        if (!values.confirmpass) {
            setValues({ ...values, usererror: true, userhelper: 'Invalid Password' });
            return;
        }
        else if (!values.password) {
            setValues({ ...values, passerror: true, passhelper: 'Invalid Password' });
            return;
        }

        if (values.password === values.confirmpass) {
            console.log('Matched')
        }
        else {
            console.log('Not matched')
            Toast('password not matched', 'error')
            setDisable(false)
            return;
        }



        const result = await ApiCallPost('/add_new_user', { user: values.UserName, password: values.password, role: values.role });
        console.log(result);
        if (result.error) {
            setValues({ ...values, usererror: true, userhelper: 'Invalid Confirm Password', passerror: true, passhelper: 'Invalid Password' });
            Toast(" Can't add user", "error");
        }
        else if (result.data.status === 1) {
            Toast("User already exists", "error");
        } else if (result.data.status === 2) {
            Toast("Only admin can add user", "error");
        } else if (result.data.status === 3) {
            Toast("Employee doesn't exists", "error");
        } else {
            Toast("User added Successfully", "success");
        }

        setDisable(false)




    }
    return (<>
<QualificationTable/>
    </>

    );



};
export default AddUser;

