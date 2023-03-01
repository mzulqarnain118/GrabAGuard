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

        {/* <Card> */}

        <div className={`container mb-4`} style={{ backgroundColor: 'white', minHeight: '700px' }}>
            <div className="row justify-content-center">

                <div className="col-lg-5 col-md-7" style={{ backgroundColor: 'white' }}>
                    <div className={`card border-0 mb-0  `} style={{ background: 'white' }}>
                        <div className={`card-body px-lg-5 py-lg-5 `} style={{ backgroundColor: "white", boxShadow: '0px 10px 10px 8px rgba(0, 0, 0, 0.2)', marginTop: '2rem' }}>

                            <Typography className={style.heading} variant="body2">
                                <strong>Add User</strong>
                            </Typography>


                            <form onSubmit={AddUser}>
                                <div className="form-floating mb-3 mt-2">
                                    <Select fullWidth
                                        required
                                        name="user_roles"
                                        label="User Roles"
                                        value={values.role}
                                        // disabled={enable}
                                        onChange={(e) => { setValues((old) => ({ ...old, role: e.target.value })) }}
                                        options={roles}


                                    />
                                </div>


                                <div className="form-floating mb-3 mt-2">
                                    {/* <FormControl null fullWidth variant="standard">
                                        <InputLabel htmlFor="formatted-text-mask-input"> Username*</InputLabel>
                                        <Input fullWidth
                                            id="formatted-text-mask-input"
                                            value={values.UserName}
                                            onChange={(e) => handleChange('UserName', e)}
                                            required

                                        />
                                        {values.curerror ? <FormHelperText>{values.curhelper}</FormHelperText> : null}
                                    </FormControl> */}

                                    <Autocomplete
                                        // multiple
                                        filterOptions={filterOptions}
                                        options={employees}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option.title + " " + option.id}

                                        inputRef={values.UserName}
                                        autoHighlight
                                        // onChange={(event, item) => {
                                        //     setValues(item);
                                        // }}
                                        onChange={(event, item) => {
                                            setValues((old) => ({ ...old, UserName: item?.cnic }))
                                        }}
                                        // style={{ width: 350 }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select Employee from GCU" placeholder="User" variant="standard" />
                                        )}
                                    />

                                </div>



                                <div className="form-floating mb-3 mt-2">


                                    <FormControl null fullWidth variant="standard">
                                        <InputLabel htmlFor="formatted-text-mask-input"> Password*</InputLabel>
                                        <Input fullWidth
                                            id="formatted-text-mask-input"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={(e) => handleChange('password', e)}
                                            required
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => handleClickShowPassword(values.showPassword)}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }

                                        />
                                        {values.usererror ? <FormHelperText>{values.passhelper}</FormHelperText> : null}
                                    </FormControl>

                                </div>


                                <div className="form-floating mb-3 mt-2">


                                    <FormControl null fullWidth variant="standard">
                                        <InputLabel htmlFor="formatted-text-mask-input">Confirm Password*</InputLabel>
                                        <Input fullWidth
                                            id="formatted-text-mask-input"

                                            type={values.showPassword2 ? 'text' : 'password'}
                                            value={values.confirmpass}
                                            onChange={(e) => handleChange('confirmpass', e)}
                                            required
                                            inputProps={{
                                                autocomplete: 'new-password',
                                                form: {
                                                    autocomplete: 'off',
                                                },
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => handleClickShowPassword2(values.showPassword2)}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }


                                        />
                                        {values.passerror ? <FormHelperText>{values.passhelper}</FormHelperText> : null}
                                    </FormControl>

                                </div>
                                <Stack direction="row" >
                                    <Button type="submit" disabled={disable} fullWidth className={` mb-3`} style={{
                                        backgroundColor: '#872b26',
                                        color: 'white'

                                    }} margin="dense" variant="contained" label="Add User"  >Add User</Button>
                                </Stack>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* </Card> */}

    </>

    );



};
export default AddUser;